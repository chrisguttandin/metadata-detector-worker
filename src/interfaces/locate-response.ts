export interface ILocateResponse {
    error: null;

    id: number;

    result: {
        locations: [number, number][];
    };
}
