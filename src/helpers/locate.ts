import { decode as decodeSynchsafe } from 'synchsafe';
import { decode as decodeString } from './decode';

export const locate = (arrayBuffer: ArrayBuffer) => {
    const locations: [ number, number ][] = [];

    let dataView = new DataView(arrayBuffer, 0, 4);

    if (decodeString(dataView) === 'fLaC') {
        let isLast = false;
        let length = 0;
        let offset = 4;

        while (!isLast) {
            offset += length;

            dataView = new DataView(arrayBuffer, offset, 4);

            isLast = ((dataView.getUint8(0) & 0x80) !== 0); // tslint:disable-line:no-bitwise
            length = ((dataView.getUint8(3) | (dataView.getUint8(2) << 8) | (dataView.getUint8(1) << 16)) + 4); // tslint:disable-line:max-line-length no-bitwise
        }

        locations.push([
            0,
            offset + length
        ]);
    }

    dataView = new DataView(arrayBuffer, 4, 4);

    if (decodeString(dataView) === 'ftyp') {
        let offset = 0;

        while (offset < arrayBuffer.byteLength) {
            dataView = new DataView(arrayBuffer, offset, 4);

            const length = dataView.getUint32(0);

            dataView = new DataView(arrayBuffer, offset + 4, 4);

            const atom = decodeString(dataView);

            if (atom === 'moov' || atom === 'wide') {
                locations.push([
                    offset,
                    offset + length
                ]);
            }

            offset += length;
        }
    }

    dataView = new DataView(arrayBuffer, 0, 3);

    if (decodeString(dataView) === 'ID3') {
        dataView = new DataView(arrayBuffer, 6, 4);

        locations.push([
            0,
            decodeSynchsafe(dataView.getUint32(0)) + 10
        ]);
    }

    dataView = new DataView(arrayBuffer, 0, 4);

    if (decodeString(dataView) === 'OggS') {
        let offset = 0;

        dataView = new DataView(arrayBuffer, 4, 1);

        const streamStructureVersion = dataView.getUint8(0);

        while (streamStructureVersion === 0 && offset < arrayBuffer.byteLength) {
            dataView = new DataView(arrayBuffer, offset + 5, 22);

            /* @todo Make sure the headerTypeFlag is not indicating that this is the first or last
             * page. If so the surrounding pages would need to get an updated headerTypeFlag when
             * stripping the metadata.
             * headerTypeFlag = dataView.getUint8(0);
             */
            const pageSegments = dataView.getUint8(21);

            dataView = new DataView(arrayBuffer, offset + 27, pageSegments + 1);

            let pageSize = 27 + pageSegments;

            for (let i = 0; i < pageSegments; i += 1) {
                pageSize += dataView.getUint8(i);
            }

            const firstByte = dataView.getUint8(pageSegments);

            if (firstByte === 3) {
                dataView = new DataView(arrayBuffer, offset + 27 + pageSegments + 1, 6);

                const identifier = decodeString(dataView);

                if (identifier === 'vorbis') {
                    locations.push([
                        offset,
                        offset + pageSize
                    ]);
                }
            }

            offset += pageSize;
        }
    }

    dataView = new DataView(arrayBuffer, arrayBuffer.byteLength - 128, 3);

    if (decodeString(dataView) === 'TAG') {
        locations.push([
            arrayBuffer.byteLength - 128,
            arrayBuffer.byteLength
        ]);
    }

    return locations;
};
