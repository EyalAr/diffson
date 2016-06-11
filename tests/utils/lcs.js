import "should";
import lcs from "../../src/utils/lcs";

describe("lcs", () => {
  it("should find the longest common subsequence of ABCDEFG and 1C2DF3", () => {
    lcs(
      "ABCDEFG".split(""),
      "1C2DF3".split("")
    ).should.be.deepEqual("CDF".split(""));
  });

  it("should find the longest common subsequence of ABCDEFG and 1ABCDEFG", () => {
    lcs(
      "ABCDEFG".split(""),
      "1ABCDEFG".split("")
    ).should.be.deepEqual("ABCDEFG".split(""));
  });

  it("should find the longest common subsequence of ABCDEFG and ABCDEFG1", () => {
    lcs(
      "ABCDEFG".split(""),
      "ABCDEFG1".split("")
    ).should.be.deepEqual("ABCDEFG".split(""));
  });

  it("should find the longest common subsequence of ABCDEFG and ABCDEFG", () => {
    lcs(
      "ABCDEFG".split(""),
      "ABCDEFG".split("")
    ).should.be.deepEqual("ABCDEFG".split(""));
  });

  it("should find the longest common subsequence of ABCDEFG and an empty sequence", () => {
    lcs(
      "ABCDEFG".split(""),
      "".split("")
    ).should.be.deepEqual("".split(""));
  });
});
