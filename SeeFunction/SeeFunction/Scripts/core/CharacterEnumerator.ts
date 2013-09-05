class CharacterEnumerator {
    private hasStarted: boolean;
    private currentIndex: number;

    constructor(private text: string) {
        this.hasStarted = false;
        this.currentIndex = null;
    }

    public getCurrent(): string {
        if (!this.hasStarted) {
            return null; //Some error would be better
        }

        return this.text[this.currentIndex];
    }

    public moveNext(): boolean {
        if (!this.hasStarted) {
            this.hasStarted = true;
            this.currentIndex = 0;
            return true;
        }

        if (this.currentIndex === this.text.length - 1) {
            return false;
        }

        this.currentIndex++;
        return true;
    }

    public reset(): void {

    }
}