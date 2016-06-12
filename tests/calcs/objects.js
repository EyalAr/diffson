import "should";
import objectsCalc from "../../src/calcs/objects";

describe("objects calc", () => {
  it("should return false if base or target are not objects", () => {
    objectsCalc(
      { a: { b: {} } },
      []
    ).should.be.false();

    objectsCalc(
      1,
      {}
    ).should.be.false();

    objectsCalc(
      [],
      false
    ).should.be.false();
  });

  it("should generate a 'remove' delta when target is missing in first level path", () => {
    var deltas = objectsCalc(
      { a: { b: {} } },
      {}
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("remove");
    deltas[0].path.should.be.deepEqual({a:{}});
  });

  it("should generate an 'add' delta when base is missing in first level path", () => {
    var deltas = objectsCalc(
      {},
      { a: { b: {} } }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("add");
    deltas[0].path.should.be.deepEqual({a:{}});
  });

  it("should generate a 'noop' delta when base and target are equal in first level path", () => {
    var deltas = objectsCalc(
      { a: 1 },
      { a: 1 }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");
    deltas[0].path.should.be.deepEqual({a:{}});
  });

  it("should generate a 'replace' delta when base and target are not equal primitives in first level path", () => {
    var deltas = objectsCalc(
      { a: 1 },
      { a: 2 }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");
    deltas[0].path.should.be.deepEqual({a:{}});
  });

  it("should generate a 'replace' delta when base and target are not equal copmlex objects of difference types in first level path", () => {
    var deltas = objectsCalc(
      { a: {} },
      { a: [] }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("replace");
    deltas[0].path.should.be.deepEqual({a:{}});
  });

  it("should generate a 'recurse' delta when base and target are of same complex type in first level path", () => {
    var deltas = objectsCalc(
      { a: { a: "a" } },
      { a: { a: "b" } }
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("recurse");
    deltas[0].path.should.be.deepEqual({a:{}});
  });
});
