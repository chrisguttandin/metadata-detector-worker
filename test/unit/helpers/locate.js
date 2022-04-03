import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { locate } from '../../../src/helpers/locate';
import locationsData from '../../fixtures/locations-data.json';

describe('locate', () => {
    afterEach((done) => {
        // @todo This is an optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    for (const [filename, locations] of locationsData) {
        describe('locate()', () => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should locate the metadata tags of the file', () => {
                expect(locate(arrayBuffer)).to.deep.equal(locations);
            });
        });
    }
});
