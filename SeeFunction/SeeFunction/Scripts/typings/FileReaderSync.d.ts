declare class FileReaderSync {
    readAsArrayBuffer(blob: Blob): ArrayBuffer;
    readAsDataURL(blob: Blob): string;
    readAsText(blob: Blob, encoding?: string): string;
}