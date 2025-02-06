import lengthsData from '../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';
import locationsData from '../fixtures/locations-data.json';

describe('module', () => {
    let id;
    let worker;

    afterEach(() => worker.terminate());

    beforeEach(() => {
        id = 33;

        worker = new Worker('base/src/module.js');
    });

    for (const [filename, locations] of locationsData) {
        describe('locate()', () => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should locate the metadata tags of the file', (done) => {
                worker.addEventListener('message', ({ data }) => {
                    expect(data).to.deep.equal({
                        id,
                        result: locations
                    });

                    done();
                });

                worker.postMessage({ id, method: 'locate', params: { arrayBuffer } }, [arrayBuffer]);
            });
        });
    }

    for (const [filename, byteLength] of lengthsData) {
        describe('strip()', () => {
            let arrayBuffer;

            beforeEach(async function () {
                this.timeout(5000);

                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should strip the metadata tags from the file', function (done) {
                this.timeout(5000);

                worker.addEventListener('message', ({ data }) => {
                    expect(byteLength).to.equal(data.result.byteLength);

                    expect(data).to.deep.equal({
                        id,
                        result: data.result
                    });

                    done();
                });

                worker.postMessage({ id, method: 'strip', params: { arrayBuffer } }, [arrayBuffer]);
            });
        });
    }
});
