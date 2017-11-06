export const concat = (...arrayBuffers: ArrayBuffer[]) => {
    return <ArrayBuffer> arrayBuffers
        .reduce(({ array, offset }, arrayBuffer) => {
            array.set(new Uint8Array(arrayBuffer), offset);

            return { array, offset: offset + arrayBuffer.byteLength };
        }, {
            array: new Uint8Array(arrayBuffers
                .reduce((byteLength, arrayBuffer) => byteLength + arrayBuffer.byteLength, 0)),
            offset: 0
        })
        .array.buffer;
};
