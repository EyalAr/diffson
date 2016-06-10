import "should";
import concatPaths from "../../src/utils/concatPaths";

describe("concat paths", () => {
  it("should concat object to object", () => {
    concatPaths(
      { a: { b: {} } },
      { c: { d: {} } }
    ).should.be.deepEqual({ a: { b: { c: { d: {} } } } });
  });

  it("should concat object to array", () => {
    concatPaths(
      { a: { b: {} } },
      [undefined,{ c: {} },undefined]
    ).should.be.deepEqual({ a: { b: [undefined,{ c: {} },undefined] } });
  });

  it("should concat array to object", () => {
    concatPaths(
      [undefined,{ a: {} },undefined],
      { b: {} }
    ).should.be.deepEqual([undefined,{ a: { b: {} } },undefined]);
  });

  it("should concat array to array", () => {
    concatPaths(
      [undefined,{ a: {} },undefined],
      [ {} ]
    ).should.be.deepEqual([undefined,{ a: [ {} ] },undefined]);
  });
});
