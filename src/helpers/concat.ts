export const concat = (...arrayBuffers: ArrayBuffer[]) => {
    return arrayBuffers
        .reduce(({ array, offset }, arrayBuffer) => {
            array.set(new Uint8Array(arrayBuffer), offset);

            offset += arrayBuffer.byteLength;

            return { array, offset };
        }, {
            array: new Uint8Array(arrayBuffers
                .reduce((byteLength, arrayBuffer) => byteLength + arrayBuffer.byteLength, 0)),
            offset: 0
        })
        .array.buffer;
};
