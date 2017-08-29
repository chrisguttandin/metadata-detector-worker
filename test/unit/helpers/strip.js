import * as lengthsData from '../../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { strip } from '../../../src/helpers/strip';

describe('strip', () => {

    afterEach((done) => {
        // @todo This is a optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    describe('strip()', () => {

        leche.withData(lengthsData, (filename, byteLength) => {

            it('should strip the metadata tags from the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    const strippedArrayBuffer = strip(arrayBuffer);

                    expect(strippedArrayBuffer.byteLength).to.equal(byteLength);

                    done();
                });
            });

        });

    });

});
