import { IWorkerDefinition } from 'worker-factory';

export interface IMetadataDetectorWorkerCustomDefinition extends IWorkerDefinition {
    locate: {
        params: {
            arrayBuffer: ArrayBuffer;
        };

        response: {
            result: [number, number][];
        };

        transferables: ArrayBuffer[];
    };

    strip: {
        params: {
            arrayBuffer: ArrayBuffer;
        };

        response: {
            result: ArrayBuffer;

            transferables: ArrayBuffer[];
        };

        transferables: ArrayBuffer[];
    };
}
