import "should";
import initCalc from "../../src/calcs/init";

describe("init calc", () => {
  it("should generate a 'remove' delta when target is undefined", () => {
    var deltas = initCalc(
      { a: { b: {} } },
      undefined
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("remove");
  });

  it("should not generate a 'remove' delta when target is null", () => {
    var deltas = initCalc(
      { a: { b: {} } },
      null
    );
    deltas.should.have.length(1);
    deltas[0].action.should.not.be.equal("remove");
  });

  it("should not generate a 'remove' delta when target is false", () => {
    var deltas = initCalc(
      { a: { b: {} } },
      false
    );
    deltas.should.have.length(1);
    deltas[0].action.should.not.be.equal("remove");
  });

  it("should generate an 'add' delta when base is undefined", () => {
    var deltas = initCalc(
      undefined,
      { a: { b: {} } }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("add");
  });

  it("should generate a 'noop' delta when base and target are equal", () => {
    var deltas = initCalc(
      1,
      1
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");

    deltas = initCalc(
      false,
      false
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");

    deltas = initCalc(
      null,
      null
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");

    deltas = initCalc(
      "abc",
      "abc"
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");

    var o = {};
    deltas = initCalc(
      o,
      o
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");
  });

  it("should generate a 'replace' delta when base and target are primitives", () => {
    var deltas = initCalc(
      false,
      true
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");

    deltas = initCalc(
      false,
      1
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");

    deltas = initCalc(
      "abc",
      100
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");

    deltas = initCalc(
      1,
      2.2
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");
  });

  it("should generate a 'replace' delta when base and target are not of same complex type", () => {
    var deltas = initCalc(
      [1,2,3],
      { a: { b: {} } }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");

    deltas = initCalc(
      { a: { b: {} } },
      [1,2,3]
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");
  });

  it("should generate a 'recurse' delta when base and target are not primitives", () => {
    var deltas = initCalc(
      {},
      { a: { b: {} } }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");

    var deltas = initCalc(
      {},
      {}
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");

    deltas = initCalc(
      { a: { b: {} } },
      { a: { b: {} } }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");

    deltas = initCalc(
      [1,2],
      [1,2,3]
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");

    deltas = initCalc(
      [1,2,3],
      [1,2,3]
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");

    deltas = initCalc(
      [],
      []
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");
  });
});
