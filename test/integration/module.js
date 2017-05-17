import * as lengthsData from '../fixtures/lengths-data.json';
import * as locationsData from '../fixtures/locations-data.json';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';

describe('module', () => {

    let id;
    let worker;

    beforeEach(() => {
        id = 33;

        worker = new Worker('base/src/module.ts');
    });

    describe('locate()', () => {

        leche.withData(locationsData, (filename, locations) => { // eslint-disable-line no-undef

            it('should locate the metadata tags of the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    worker.addEventListener('message', ({ data }) => {
                        expect(data).to.deep.equal({
                            error: null,
                            id,
                            result: { locations }
                        });
                    });

                    worker.postMessage({ id, method: 'locate', params: { arrayBuffer } }, [ arrayBuffer ]);

                    done();
                });
            });

        });

    });

    describe('strip()', () => {

        leche.withData(lengthsData, (filename, byteLength) => { // eslint-disable-line no-undef

            it('should strip the metadata tags from the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    worker.addEventListener('message', ({ data }) => {
                        expect(byteLength).to.equal(data.result.arrayBuffer.byteLength);

                        expect(data).to.deep.equal({
                            error: null,
                            id,
                            result: { arrayBuffer: data.result.arrayBuffer }
                        });
                    });

                    worker.postMessage({ id, method: 'strip', params: { arrayBuffer } }, [ arrayBuffer ]);

                    done();
                });
            });

        });

    });

});
