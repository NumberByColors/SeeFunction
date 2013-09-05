class SlidingTextWindow {
    private beginLexemeIndex: number;
    private forwardIndex: number;
    private maxIndex: number;

    constructor(private text: string) {
        this.beginLexemeIndex = 0;
        this.forwardIndex = 0;
        this.maxIndex = text.length - 1;
    }

    public getCurrentString(): string {
        if (this.beginLexemeIndex === this.forwardIndex) {
            return this.text[this.beginLexemeIndex];
        }

        if (this.beginLexemeIndex > this.forwardIndex) {
            return ""; //Should probably be an error
        }

        return this.text.slice(this.beginLexemeIndex, this.forwardIndex + 1);
    }

    public widenRight(): boolean {
        if (this.forwardIndex === this.maxIndex) {
            return false;
        }

        this.forwardIndex++;
        return true;
    }

    public advanceWindow(): boolean {
        if (this.forwardIndex === this.maxIndex) {
            return false;
        }

        this.beginLexemeIndex = this.forwardIndex + 1;
        this.forwardIndex = this.forwardIndex + 1;
    }
}