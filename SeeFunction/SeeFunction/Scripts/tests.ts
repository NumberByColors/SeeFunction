QUnit.module("PatternExpression tests"); //--------------------------------------------------------------------------------------------

test("PatternExpression for a single character", () => {
    var actual = new PatternExpression("c");
    var expected = { char: "c", and: [], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression for a string", () => {
    var actual = PatternExpression.forString("test");
    var expected = { char: "t", and: [{ char: "e", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }, { char: "t", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression for a single-character string", () => {
    var actual = PatternExpression.forString("t");
    var expected = { char: "t", and: [], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});