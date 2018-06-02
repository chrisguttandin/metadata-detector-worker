// @todo Remove this declaration when it becomes available in the webworker lib.

interface TextDecodeOptions { // tslint:disable-line:interface-name

    stream?: boolean;

}

interface TextDecoderOptions { // tslint:disable-line:interface-name

    fatal?: boolean;

    ignoreBOM?: boolean;

}

interface TextDecoder { // tslint:disable-line:interface-name

    readonly encoding: string;

    readonly fatal: boolean;

    readonly ignoreBOM: boolean;

    decode (
        input?: ArrayBuffer |
            DataView |
            Float32Array |
            Float64Array |
            Int8Array |
            Int16Array |
            Int32Array |
            Uint8Array |
            Uint8ClampedArray |
            Uint16Array |
            Uint32Array |
            null,
        options?: TextDecodeOptions
    ): string;

}

declare var TextDecoder: {

    prototype: TextDecoder;

    new (label?: string, options?: TextDecoderOptions): TextDecoder;

};
