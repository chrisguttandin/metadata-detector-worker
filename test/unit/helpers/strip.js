import { beforeEach, describe, expect, it } from 'vitest';
import lengthsData from '../../fixtures/lengths-data.json';
import { loadFixtureAsArrayBuffer } from '../../helper/load-fixture';
import { strip } from '../../../src/helpers/strip';

describe('strip', () => {
    for (const [filename, byteLength] of lengthsData) {
        describe('strip()', () => {
            let arrayBuffer;

            beforeEach(async () => {
                arrayBuffer = await loadFixtureAsArrayBuffer(filename);
            });

            it('should strip the metadata tags from the file', () => {
                const strippedArrayBuffer = strip(arrayBuffer);

                expect(strippedArrayBuffer.byteLength).to.equal(byteLength);
            });
        });
    }
});
