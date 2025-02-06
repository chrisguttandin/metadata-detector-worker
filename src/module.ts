import { TWorkerImplementation, createWorker } from 'worker-factory';
import { locate } from './helpers/locate';
import { strip } from './helpers/strip';
import { IMetadataDetectorWorkerCustomDefinition } from './interfaces';

/*
 * @todo Explicitly referencing the barrel file seems to be necessary when enabling the
 * isolatedModules compiler option.
 */
export * from './interfaces/index';

createWorker<IMetadataDetectorWorkerCustomDefinition>(self, <TWorkerImplementation<IMetadataDetectorWorkerCustomDefinition>>{
    locate: ({ arrayBuffer }) => {
        return { result: { locations: locate(arrayBuffer) } };
    },
    strip: ({ arrayBuffer }) => {
        const strippedArrayBuffer = strip(arrayBuffer);

        return { result: { arrayBuffer: strippedArrayBuffer }, transferables: [strippedArrayBuffer] };
    }
});
