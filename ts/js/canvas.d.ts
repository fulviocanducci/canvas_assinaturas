declare enum TypeQuality {
    jpg = "image/jpg",
    png = "image/png"
}
interface ICanvasDefaultOption {
    width: number;
    heigth: number;
}
interface ICanvasDefault {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D | undefined | null;
    getBase64(type: TypeQuality, quality: number): string;
    getBase64Hash(type: TypeQuality, quality: number): string;
}
declare class CanvasDefault implements ICanvasDefault {
    element: HTMLCanvasElement;
    context: CanvasRenderingContext2D | undefined | null;
    id: string;
    options: ICanvasDefaultOption | undefined;
    protected drawing: boolean;
    constructor(id: string, options?: ICanvasDefaultOption);
    getBase64(type?: TypeQuality, quality?: number): string;
    getBase64Hash(type?: TypeQuality, quality?: number): string;
    static create(id: string, options?: ICanvasDefaultOption): CanvasDefault;
    protected getOptionsDefault(options?: ICanvasDefaultOption): ICanvasDefaultOption;
    protected setElementOption(options: ICanvasDefaultOption): void;
    protected setEvents(): void;
}
