import { IWorkerDefinition } from 'worker-factory';

export interface IMetadataDetectorWorkerCustomDefinition extends IWorkerDefinition {
    locate: {
        params: {
            arrayBuffer: ArrayBuffer;
        };

        response: {
            result: { locations: [number, number][] };
        };
    };

    strip: {
        params: {
            arrayBuffer: ArrayBuffer;
        };

        response: {
            result: {
                arrayBuffer: ArrayBuffer;
            };

            transferables: ArrayBuffer[];
        };
    };
}
