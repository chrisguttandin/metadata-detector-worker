import * as lengthsData from '../../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { strip } from '../../../src/helpers/strip';

describe('strip', () => {

    describe('strip()', () => {

        leche.withData(lengthsData, (filename, byteLength) => { // eslint-disable-line no-undef

            it('should strip the metadata tags from the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    arrayBuffer = strip(arrayBuffer);

                    expect(arrayBuffer.byteLength).to.equal(byteLength);

                    done();
                });
            });

        });

    });

});
