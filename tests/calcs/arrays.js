import "should";
import arraysCalc from "../../src/calcs/arrays";

describe("arrays calc", () => {
  it("should return false if base or target are not arrays", () => {
    arraysCalc(
      { a: { b: {} } },
      []
    ).should.be.false();

    arraysCalc(
      1,
      {}
    ).should.be.false();

    arraysCalc(
      [],
      false
    ).should.be.false();
  });

  it("should generate a 'remove' delta when target is missing in first level path", () => {
    var deltas = arraysCalc(
      [{}],
      []
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("remove");
    deltas[0].path.should.be.deepEqual([{}]);
  });

  it("should generate an 'add' delta when base is missing in first level path", () => {
    var deltas = arraysCalc(
      [],
      [[]]
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("add");
    deltas[0].path.should.be.deepEqual([{}]);
  });

  it("should generate a 'noop' delta when base and target are equal in first level path", () => {
    var deltas = arraysCalc(
      [1],
      [1]
    );
    deltas.should.have.length(1);
    deltas[0].action.should.be.equal("noop");
    deltas[0].path.should.be.deepEqual([{}]);
  });

  it("should generate one 'remove' delta and the rest 'noop' deltas when one element is removed from array", () => {
    var deltas = arraysCalc(
      [1,2,3],
      [2,3]
    );
    deltas.should.have.length(3);
    deltas[0].action.should.be.equal("remove");
    deltas[0].path.should.be.deepEqual([{},,,]);
    deltas[1].action.should.be.equal("noop");
    deltas[1].path.should.be.deepEqual([,{},,]);
    deltas[2].action.should.be.equal("noop");
    deltas[2].path.should.be.deepEqual([,,{}]);

    deltas = arraysCalc(
      [1,2,3],
      [1,3]
    );
    deltas.should.have.length(3);
    deltas[0].action.should.be.equal("noop");
    deltas[0].path.should.be.deepEqual([{},,,]);
    deltas[1].action.should.be.equal("remove");
    deltas[1].path.should.be.deepEqual([,{},,]);
    deltas[2].action.should.be.equal("noop");
    deltas[2].path.should.be.deepEqual([,,{}]);
  });
});
