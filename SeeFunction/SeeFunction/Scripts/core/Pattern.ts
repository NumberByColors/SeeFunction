class Pattern {
    private expr: PatternExpression;

    constructor() {
        
    }

    //Function that performs a pattern match given a pattern and text
    public static match(pattern: Pattern, text: string): boolean {
        return false; //Not implemented
        if (text[0] === pattern.expr.char) {

        } else {

        }
    }

    private static fromExpression(expression: PatternExpression): Pattern {
        var pattern = new Pattern();
        pattern.expr = expression;
        return pattern;
    }

    private static forCharacter(char: string): Pattern {
        if (char.length === 1) {
            return Pattern.fromExpression(<PatternExpression>{ char: char });
        }

        //Need to handle error case when char is many characters
    }

    public forString(str: string): Pattern {
        return Pattern.fromExpression(PatternExpression.forString(str));
    }

    public orString(str: string): Pattern {
        this.expr.orWith(PatternExpression.forString(str));
        return this;
    }

    public oneOfStrings(strings: string[]): Pattern {
        var restStrings = strings.slice(1);
        var restPattern: PatternExpression = undefined;
        restStrings.forEach(str => restPattern.andWith(PatternExpression.forString(str)));
        return Pattern.fromExpression(PatternExpression.forString(strings[0]).andWith(restPattern));
    }
}