import lengthsData from '../../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { strip } from '../../../src/helpers/strip';

describe('strip', () => {
    afterEach((done) => {
        // @todo This is an optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    describe('strip()', () => {
        leche.withData(lengthsData, (filename, byteLength) => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should strip the metadata tags from the file', () => {
                const strippedArrayBuffer = strip(arrayBuffer);

                expect(strippedArrayBuffer.byteLength).to.equal(byteLength);
            });
        });
    });
});
