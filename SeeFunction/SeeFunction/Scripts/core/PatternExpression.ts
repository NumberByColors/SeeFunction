class PatternExpression {
    char: string;
    and: PatternExpression[];
    or: PatternExpression[];
    times: Times;
    positive: boolean;

    constructor(character: string, andExpressions?: PatternExpression[], orExpressions?: PatternExpression[], times?: Times, positiveMatch?: boolean) {
        this.char = character;

        if (andExpressions) {
            this.and = andExpressions;
        } else {
            this.and = [];
        }

        if (orExpressions) {
            this.or = orExpressions;
        } else {
            this.or = [];
        }

        if (times) {
            this.times = times;
        } else {
            this.times = Times.One;
        }

        if (positiveMatch) {
            this.positive = positiveMatch;
        } else {
            if (positiveMatch === false) {
                this.positive = positiveMatch;
            }

            this.positive = true;
        }
    }

    public static forString(str: string): PatternExpression {
        //Whitespace?? Other stuff?? Test this.
        return new PatternExpression(str[0], str.split("").slice(1).map(c => new PatternExpression(c)));
    }

    public andWith(patternExpr: PatternExpression): PatternExpression {        
        this.and.concat(patternExpr);
        return this;
    }

    public orWith(patternExpr: PatternExpression): PatternExpression {
        this.or.concat(patternExpr);
        return this;
    }
}