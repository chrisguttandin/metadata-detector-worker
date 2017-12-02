import { locate } from './helpers/locate';
import { strip } from './helpers/strip';
import { IBrokerEvent, IErrorResponse, ILocateResponse, IStripResponse } from './interfaces';

export * from './interfaces';
export * from './types';

addEventListener('message', ({ data }: IBrokerEvent) => {
    try {
        if (data.method === 'locate') {
            const { id, params: { arrayBuffer } } = data;

            const locations = locate(arrayBuffer);

            postMessage(<ILocateResponse> {
                error: null,
                id,
                result: { locations }
            });
        } else if (data.method === 'strip') {
            const { id, params: { arrayBuffer } } = data;

            const strippedArrayBuffer = strip(arrayBuffer);

            postMessage(<IStripResponse> {
                error: null,
                id,
                result: { arrayBuffer: strippedArrayBuffer }
            }, [ strippedArrayBuffer ]);
        }
    } catch (err) {
        postMessage(<IErrorResponse> {
            error: {
                message: err.message
            },
            id: data.id,
            result: null
        });
    }
});
