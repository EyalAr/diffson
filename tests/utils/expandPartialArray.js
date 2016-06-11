import "should";
import expandPartialArray from "../../src/utils/expandPartialArray";

describe("expandPartialArray", () => {
  it("should expand partial CDE of ABCDEFG", () => {
    expandPartialArray(
      "ABCDEFG".split(""),
      "CDE".split("")
    ).should.be.deepEqual([,,"C","D","E",,,]);
  });

  it("should expand partial ACDEG of ABCDEFG", () => {
    expandPartialArray(
      "ABCDEFG".split(""),
      "ACDEG".split("")
    ).should.be.deepEqual(["A",,"C","D","E",,"G"]);
  });

  it("should expand partial ABCDEFG of ABCDEFG", () => {
    expandPartialArray(
      "ABCDEFG".split(""),
      "ABCDEFG".split("")
    ).should.be.deepEqual(["A","B","C","D","E","F","G"]);
  });

  it("should expand partial D of ABCDEFG", () => {
    expandPartialArray(
      "ABCDEFG".split(""),
      "D".split("")
    ).should.be.deepEqual([,,,"D",,,,]);
  });

  it("should expand an empty partial of ABCDEFG", () => {
    expandPartialArray(
      "ABCDEFG".split(""),
      "".split("")
    ).should.be.deepEqual([,,,,,,,]);
  });
});
