export interface ILocateRequest {
    id: number;

    method: 'locate';

    params: {
        arrayBuffer: ArrayBuffer;
    };
}
