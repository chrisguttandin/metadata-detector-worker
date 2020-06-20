let textDecoder: null | TextDecoder = null;

export const decode = (dataView: DataView) => {
    if ('TextDecoder' in self) {
        if (textDecoder === null) {
            textDecoder = new TextDecoder('utf-8');
        }

        return textDecoder.decode(dataView);
    }

    // @todo Add an expectation test to check if this fallback is still necessary.
    // String.fromCharCode() does normally expect numbers but it can also handle a typed array.
    return String.fromCharCode.apply(null, <number[]>(<any>new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength)));
};
