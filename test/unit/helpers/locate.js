import * as locationsData from '../../fixtures/locations-data.json';
import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { locate } from '../../../src/helpers/locate';

describe('locate', () => {

    afterEach((done) => {
        // @todo This is a optimistic fix to prevent the famous 'Some of your tests did a full page reload!' error.
        setTimeout(done, 500);
    });

    describe('locate()', () => {

        leche.withData(locationsData, (filename, locations) => {

            it('should locate the metadata tags of the file', (done) => {
                loadFixtureAsArrayBuffer(filename, (err, arrayBuffer) => {
                    expect(err).to.be.null;

                    expect(locate(arrayBuffer)).to.deep.equal(locations);

                    done();
                });
            });

        });

    });

});
