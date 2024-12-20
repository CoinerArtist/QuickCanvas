import type { VecLike } from "@coin/vector2d";
import { BaseRenderingContext } from "./BaseRenderingContext.ts"

export class OffscreenRenderingContext extends BaseRenderingContext{
    canvas: OffscreenCanvas
    context: OffscreenCanvasRenderingContext2D

    constructor(canvas: OffscreenCanvas, options?: CanvasRenderingContext2DSettings){
        super()
        this.canvas = canvas
        this.context = canvas.getContext("2d", options)!
    }

    static fromSize(size: VecLike, options?: CanvasRenderingContext2DSettings){
        return new OffscreenRenderingContext(new OffscreenCanvas(size.x, size.y), options)
    }
}