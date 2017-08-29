import { concat } from './concat';
import { locate } from './locate';

export const strip = (arrayBuffer: ArrayBuffer) => {
    const locations = locate(arrayBuffer);

    let offset = 0;
    let strippedArrayBuffer = arrayBuffer;

    locations.forEach(([begin, end]) => {
        if (begin === offset) {
            strippedArrayBuffer = strippedArrayBuffer.slice(end, strippedArrayBuffer.byteLength);
        } else if (end - offset === strippedArrayBuffer.byteLength) {
            strippedArrayBuffer = strippedArrayBuffer.slice(0, begin - offset);
        } else {
            strippedArrayBuffer = concat(
                strippedArrayBuffer.slice(0, begin - offset),
                strippedArrayBuffer.slice(end - offset, strippedArrayBuffer.byteLength)
            );
        }

        offset += end - begin;
    });

    return strippedArrayBuffer;
};
