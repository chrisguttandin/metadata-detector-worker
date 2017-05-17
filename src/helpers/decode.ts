// @todo Remove this declaration when it becomes available in the dom lib.
let textDecoder: null | TextEncoding.TextDecoder = null;

export const decode = (dataView: DataView) => {
    if ('TextDecoder' in self) {
        if (textDecoder === null) {
            textDecoder = new TextDecoder('utf-8');
        }

        return textDecoder.decode(dataView);
    }

    // @todo Add an expectation test to check if this fallback is still necessary.
    return String.fromCharCode.apply(null, new Uint8Array(dataView.buffer, dataView.byteOffset, dataView.byteLength));
};
