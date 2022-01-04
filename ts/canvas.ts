enum TypeQuality {
  jpg = "image/jpg",
  png = "image/png",
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

class CanvasDefault implements ICanvasDefault {
  public element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | undefined | null;
  public id: string;
  public options: ICanvasDefaultOption | undefined;
  protected drawing: boolean = false;
  constructor(id: string, options?: ICanvasDefaultOption) {
    if (!document.getElementById(id)) {
      throw new Error("Element not found ...");
    }
    if (!(document.getElementById(id) instanceof HTMLCanvasElement)) {
      throw new Error(`The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`);
    }
    this.id = id;
    this.element = document.getElementById(id) as HTMLCanvasElement;
    this.context = this.element.getContext("2d");
    this.options = this.getOptionsDefault(options);
    this.setElementOption(this.options);
    this.setEvents();
  }

  public getBase64(type: TypeQuality = TypeQuality.jpg, quality: number = 1): string {
    return this.element.toDataURL(type, quality);
  }

  public getBase64Hash(type: TypeQuality = TypeQuality.jpg, quality: number = 1): string {
    const data = this.element.toDataURL(type, quality);
    return data.substring(data.indexOf(",") + 1, data.length);
  }

  public static create(id: string, options?: ICanvasDefaultOption): CanvasDefault {
    return new CanvasDefault(id, options);
  }

  protected getOptionsDefault(options?: ICanvasDefaultOption) {
    return options ?? { width: 100, heigth: 100 };
  }

  protected setElementOption(options: ICanvasDefaultOption): void {
    this.element.setAttribute("width", options.width.toString());
    this.element.setAttribute("height", options.heigth.toString());
  }

  protected setEvents(): void {
    this.element.onmousedown = (e: MouseEvent) => {
      this.context?.moveTo(e.clientX, e.clientY);
      this.drawing = true;
    };
    this.element.onmouseup = (e: MouseEvent) => {
      this.drawing = false;
    };
    this.element.onmousemove = (e: MouseEvent) => {
      if (this.drawing) {
        this.context?.lineTo(e.clientX, e.clientY);
        this.context?.stroke();
      }
    };
  }
}
