import { Vec } from "@coin/vector2d";

export class UrlImage{
    canvas: HTMLImageElement
    
    constructor(url: string){
        this.canvas = new Image()
        this.canvas.src = url
    }

    get size(): Vec { return new Vec(this.canvas.width, this.canvas.height)}
    get loaded(): boolean { return this.canvas.complete }

    whenLoaded(): Promise<void> {
        return new Promise<void>((resolve) => {
            if(!this.canvas.complete){
                this.canvas.addEventListener("load", () => resolve())
            } else {
                resolve()
            }
        })
    }
}