import { Vec, type VecLike } from "@coin/vector2d";
import { BaseRenderer } from "./BaseRenderer.ts";

export class Renderer extends BaseRenderer{
    canvas: HTMLCanvasElement
    context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement, options?: CanvasRenderingContext2DSettings){
        super()
        this.canvas = canvas
        this.context = canvas.getContext("2d", options)!
    }

    // --- Space Conversion --- //

    screenToCanvas(v: VecLike): Vec {
        const bound = this.canvas.getBoundingClientRect()
        return new Vec(v.x - bound.x, v.y - bound.y)
    }

    canvasToScreen(v: VecLike): Vec {
        const bound = this.canvas.getBoundingClientRect()
        return new Vec(v.x + bound.x, v.y + bound.y)
    }

    screenToWorld(v: VecLike){
        return this.canvasToWorld(this.screenToCanvas(v))
    }

    worldToScreen(v: VecLike){
        return this.canvasToScreen(this.wordlToCanvas(v))
    }

    // --- Resize --- //

    /** Set the canvas size to the size of the canvas element. This also clears the canvas.*/
    resize(){
        const bound = this.canvas.getBoundingClientRect()
        this.canvas.width = bound.width
        this.canvas.height = bound.height
    }

    /** Keep the canvas size to the size of the canvas element. The canvas is cleared when it is resized.
     * @param [onResize] : Function called after each resize. */
    autoResize(onResize: () => void = () => {}){
        const observer = new ResizeObserver(() => {
            this.resize()
            onResize()
        })
        observer.observe(this.canvas)
    }
}