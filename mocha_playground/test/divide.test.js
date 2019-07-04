const divide = require('../index');
const expect = require('chai').expect;

describe('Divide function', () => {
    it('should divide positive integers correctly', () => {
        expect(divide(8,4)).to.equal(2);
    });
  
    it('should throw an error when divide by zero', () => {
        // define inputs
        const a = 8,
            b = 0;

        // set up the function call
        const fn = () => {divide(a, b)};

        // assert that exception is thrown
        expect(fn).to.throw();
    });

    it('testing assertions', () => {
        expect(2).to.equal(2, '2 === 2'); //pass
//        expect(2).to.equal("2", '2 === "2"'); // fail, wrong types

    })
});