import * as locationsData from '../../fixtures/locations-data.json';
import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { locate } from '../../../src/helpers/locate';

describe('locate', () => {

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
