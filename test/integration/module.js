import lengthsData from '../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../helper/load-fixture';
import locationsData from '../fixtures/locations-data.json';

describe('module', () => {

    let id;
    let worker;

    afterEach((done) => {
        // @todo This is an optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    beforeEach(() => {
        id = 33;

        worker = new Worker('base/src/module.js');
    });

    describe('locate()', () => {

        leche.withData(locationsData, (filename, locations) => {

            it('should locate the metadata tags of the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    worker.addEventListener('message', ({ data }) => {
                        expect(data).to.deep.equal({
                            error: null,
                            id,
                            result: { locations }
                        });

                        done();
                    });

                    worker.postMessage({ id, method: 'locate', params: { arrayBuffer } }, [ arrayBuffer ]);
                });
            });

        });

    });

    describe('strip()', () => {

        leche.withData(lengthsData, (filename, byteLength) => {

            it('should strip the metadata tags from the file', function (done) {
                this.timeout(5000);

                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    worker.addEventListener('message', ({ data }) => {
                        expect(byteLength).to.equal(data.result.arrayBuffer.byteLength);

                        expect(data).to.deep.equal({
                            error: null,
                            id,
                            result: { arrayBuffer: data.result.arrayBuffer }
                        });

                        done();
                    });

                    worker.postMessage({ id, method: 'strip', params: { arrayBuffer } }, [ arrayBuffer ]);
                });
            });

        });

    });

});
