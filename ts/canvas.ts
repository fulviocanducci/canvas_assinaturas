enum TypeQuality {
  jpg = "image/jpg",
  jpeg = "image/jpeg",
  png = "image/png",
}

interface ICanvasDefault {
  element: HTMLCanvasElement;
  context: CanvasRenderingContext2D | undefined | null;
  getBase64(type: TypeQuality, quality: number): string;
  getHash(type: TypeQuality, quality: number): string;
}

class CanvasDefault implements ICanvasDefault {
  public element: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | undefined | null;
  protected drawing: boolean = false;

  constructor(public id: string) {
    if (!document.getElementById(id)) {
      throw new Error("Element not found ...");
    }
    if (!(document.getElementById(id) instanceof HTMLCanvasElement)) {
      throw new Error(`The element of id "${id}" is not a HTMLCanvasElement. Make sure a <canvas id="${id}""> element is present in the document.`);
    }
    this.element = document.getElementById(id) as HTMLCanvasElement;
    this.context = this.element.getContext("2d");
    this.addEvents();
  }

  public getBase64(type: TypeQuality = TypeQuality.jpg, quality: number = 1): string {
    return this.getBase64OrHash(type, quality, false);
  }

  public getHash(type: TypeQuality = TypeQuality.jpg, quality: number = 1): string {
    return this.getBase64OrHash(type, quality, true);
  }

  public static create(id: string): CanvasDefault {
    return new CanvasDefault(id);
  }

  protected addEvents(): void {
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

  protected getBase64OrHash(type: TypeQuality = TypeQuality.jpg, quality: number = 1, onlyHash: boolean = false) {
    const data = this.element.toDataURL(type, quality);
    if (onlyHash) {
      return data.substr(data.indexOf(",") + 1, data.length);
    }
    return data;
  }
}
