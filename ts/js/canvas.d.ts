declare enum TypeQuality {
    jpg = "image/jpg",
    png = "image/png"
}
interface ICanvasDefault {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D | undefined | null;
    getBase64(type: TypeQuality, quality: number): string;
    getBase64Hash(type: TypeQuality, quality: number): string;
}
declare class CanvasDefault implements ICanvasDefault {
    id: string;
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D | undefined | null;
    protected drawing: boolean;
    constructor(id: string);
    getBase64(type?: TypeQuality, quality?: number): string;
    getBase64Hash(type?: TypeQuality, quality?: number): string;
    static create(id: string): CanvasDefault;
    protected events(): void;
}
