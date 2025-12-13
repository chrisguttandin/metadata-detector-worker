import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import lengthsData from '../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';
import locationsData from '../fixtures/locations-data.json';

describe('module', () => {
    let id;
    let worker;

    afterEach(() => worker.terminate());

    beforeEach(() => {
        id = 33;

        worker = new Worker(new URL('../../src/module', import.meta.url), { type: 'module' });
    });

    for (const [filename, locations] of locationsData) {
        describe('locate()', () => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should locate the metadata tags of the file', () => {
                const { promise, resolve } = Promise.withResolvers();

                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        id,
                        result: locations
                    });

                    resolve();
                });

                worker.postMessage({ id, method: 'locate', params: { arrayBuffer } }, [arrayBuffer]);

                return promise;
            });
        });
    }

    for (const [filename, byteLength] of lengthsData) {
        describe('strip()', () => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should strip the metadata tags from the file', () => {
                const { promise, resolve } = Promise.withResolvers();

                worker.addEventListener('message', ({ data }) => {
                    expect(byteLength).to.equal(data.result.byteLength);

                    expect(data).to.deep.equal({
                        id,
                        result: data.result
                    });

                    resolve();
                });

                worker.postMessage({ id, method: 'strip', params: { arrayBuffer } }, [arrayBuffer]);

                return promise;
            });
        });
    }
});
