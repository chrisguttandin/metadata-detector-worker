import { concat } from './concat';
import { locate } from './locate';

export const strip = (arrayBuffer: ArrayBuffer) => {
    const locations = locate(arrayBuffer);

    let offset = 0;

    locations.forEach(([begin, end]) => {
        if (begin === offset) {
            arrayBuffer = arrayBuffer.slice(end, arrayBuffer.byteLength);
        } else if (end - offset === arrayBuffer.byteLength) {
            arrayBuffer = arrayBuffer.slice(0, begin - offset);
        } else {
            arrayBuffer = concat(arrayBuffer.slice(0, begin - offset), arrayBuffer.slice(end - offset, arrayBuffer.byteLength));
        }

        offset += end - begin;
    });

    return arrayBuffer;
};
