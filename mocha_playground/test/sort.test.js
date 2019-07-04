const sort = require('../sort');
const expect = require('chai').expect;

describe('Sort function', () => {
    it('should sort array of positive integers in ascending order', () => {
        const inputArr = [5, 23, 36, 15, 1];
        const expectedArr = [1, 5, 15, 23, 36];
    
        expect(sort(inputArr)).to.deep.equal(expectedArr);
    });
  
    it('should sort array of mixed negative, zero, & positive integers', () => {
        const inputArr = [13, 0, -5, -12, 26];
        const expectedArr = [-12, -5, 0, 13, 26];
    
        expect(sort(inputArr)).to.deep.equal(expectedArr);
    });
});