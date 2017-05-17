export interface IStripRequest {

    id: number;

    method: 'strip';

    params: {

        arrayBuffer: ArrayBuffer;

    };

}
