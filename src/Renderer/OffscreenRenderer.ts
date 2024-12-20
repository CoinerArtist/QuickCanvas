import type { VecLike } from "@coin/vector2d";
import { BaseRenderer } from "./BaseRenderer.ts";

export class OffscreenRenderer extends BaseRenderer{
    canvas: OffscreenCanvas
    context: OffscreenCanvasRenderingContext2D

    constructor(canvas: OffscreenCanvas, options?: CanvasRenderingContext2DSettings){
        super()
        this.canvas = canvas
        this.context = canvas.getContext("2d", options)!
    }

    static fromSize(size: VecLike, options?: CanvasRenderingContext2DSettings): OffscreenRenderer {
        return new OffscreenRenderer(new OffscreenCanvas(size.x, size.y), options)
    }
}