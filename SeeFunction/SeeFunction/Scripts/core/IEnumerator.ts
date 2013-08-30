interface IEnumerator<T> {
    getCurrent(): T;
    moveNext(): boolean;
    reset(): void;
}