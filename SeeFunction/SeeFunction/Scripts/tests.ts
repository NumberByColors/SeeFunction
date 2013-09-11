QUnit.module("PatternExpression tests"); //--------------------------------------------------------------------------------------------

//Constants
var exprForStringTest = { char: "t", and: [{ char: "e", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }, { char: "t", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
var exprForStringThis = { char: "t", and: [{ char: "h", and: [], or: [], times: Times.One, positive: true }, { char: "i", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true }

test("PatternExpression for a single character", () => {
    var actual = new PatternExpression("c");
    var expected = { char: "c", and: [], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression for a string", () => {
    var actual = PatternExpression.forString("test");
    var expected = exprForStringTest;
    QUnit.propEqual(actual, expected);
});

test("PatternExpression for a single-character string", () => {
    var actual = PatternExpression.forString("t");
    var expected = { char: "t", and: [], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: two empty strings", () => {
    var actual = new PatternExpression("").andWith(new PatternExpression(""));
    var expected = { char: "", and: [{ char: "", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: empty string + single character", () => {
    var actual = new PatternExpression("").andWith(new PatternExpression("a"));
    var expected = { char: "", and: [{ char: "a", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: single character + empty string", () => {
    var actual = new PatternExpression("a").andWith(new PatternExpression(""));
    var expected = { char: "a", and: [{ char: "", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: two single characters", () => {
    var actual = new PatternExpression("a").andWith(new PatternExpression("b"));
    var expected = { char: "a", and: [{ char: "b", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: single character + string", () => {
    var actual = new PatternExpression("a").andWith(PatternExpression.forString("test"));
    var expected = { char: "a", and: [exprForStringTest], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: string + single character", () => {
    var actual = PatternExpression.forString("test").andWith(new PatternExpression("a"));
    var expected = { char: "t", and: [{ char: "e", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }, { char: "t", and: [], or: [], times: Times.One, positive: true }, { char: "a", and: [], or: [], times: Times.One, positive: true }], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: empty string + string", () => {
    var actual = new PatternExpression("").andWith(PatternExpression.forString("test"));
    var expected = { char: "", and: [exprForStringTest], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression andWith: two strings", () => {
    var actual = PatternExpression.forString("test").andWith(PatternExpression.forString("this"));
    var expected = { char: "t", and: [{ char: "e", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }, { char: "t", and: [], or: [], times: Times.One, positive: true }, exprForStringThis], or: [], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: two empty strings", () => {
    var actual = new PatternExpression("").orWith(new PatternExpression(""));
    var expected = { char: "", and: [], or: [{ char: "", and: [], or: [], times: Times.One, positive: true }], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: empty string + single character", () => {
    var actual = new PatternExpression("").orWith(new PatternExpression("a"));
    var expected = { char: "", and: [], or: [{ char: "a", and: [], or: [], times: Times.One, positive: true }], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: single character + empty string", () => {
    var actual = new PatternExpression("a").orWith(new PatternExpression(""));
    var expected = { char: "a", and: [], or: [{ char: "", and: [], or: [], times: Times.One, positive: true }], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: two single characters", () => {
    var actual = new PatternExpression("a").orWith(new PatternExpression("b"));
    var expected = { char: "a", and: [], or: [{ char: "b", and: [], or: [], times: Times.One, positive: true }], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: single character + string", () => {
    var actual = new PatternExpression("a").orWith(PatternExpression.forString("test"));
    var expected = {
        char: "a",
        and: [],
        or: [exprForStringTest],
        times: Times.One,
        positive: true
    };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: string + single character", () => {
    var actual = PatternExpression.forString("test").orWith(new PatternExpression("a"));
    var expected = { char: "t", and: [{ char: "e", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }, { char: "t", and: [], or: [], times: Times.One, positive: true }], or: [{ char: "a", and: [], or: [], times: Times.One, positive: true }], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: empty string + string", () => {
    var actual = new PatternExpression("").orWith(PatternExpression.forString("test"));
    var expected = { char: "", and: [], or: [exprForStringTest], times: Times.One, positive: true };
    QUnit.propEqual(actual, expected);
});

test("PatternExpression orWith: two strings", () => {
    var actual = PatternExpression.forString("test").orWith(PatternExpression.forString("this"));
    var expected = { char: "t", and: [{ char: "e", and: [], or: [], times: Times.One, positive: true }, { char: "s", and: [], or: [], times: Times.One, positive: true }, { char: "t", and: [], or: [], times: Times.One, positive: true }], or: [exprForStringThis], times: Times.One, positive: true };;
    QUnit.propEqual(actual, expected);
});