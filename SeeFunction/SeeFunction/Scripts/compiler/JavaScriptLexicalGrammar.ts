module Compiler {
    export module JavaScriptLexicalGrammar {
        var nullLiteral = new Pattern().forString("null");
        var booleanLiteral = new Pattern().oneOfStrings(["true", "false"]);
        var decimalDigit = new Pattern().oneOfStrings(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        var nonZeroDigit = new Pattern().oneOfStrings(["1", "2", "3", "4", "5", "6", "7", "8", "9"]);
        var exponentIndicator = new Pattern().oneOfStrings(["e", "E"]);
        
        
        export var productions: IProduction[] = [
            { nonterminal: "DecimalDigit", pattern: decimalDigit }
        ];
    }
}