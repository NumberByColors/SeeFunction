module Compiler {
    export class Lexer {
        constructor(private lexicalGrammar: LexicalGrammar, private sourceCode: string) {

        }

        public lex(): IEnumerable<IToken> {

        }
    }
}