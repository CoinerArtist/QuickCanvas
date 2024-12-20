import { Vec, type VecLike } from "@coin/vector2d"
import type { ImageLike, PathLike } from "../types.ts"

export abstract class BaseRenderingContext{
    abstract context: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D
    abstract canvas: HTMLCanvasElement | OffscreenCanvas

    // --- Size --- //

    get size(): VecLike { return {x: this.canvas.width, y: this.canvas.height} }
    set size(v: VecLike){
        this.canvas.width = v.x
        this.canvas.height = v.y
    }

    get width(): number { return this.canvas.width }
    set width(n: number){ this.canvas.width = n }

    get height(): number { return this.canvas.height }
    set height(n: number){ this.canvas.height = n }

    // The following sections loosely follow the same order as :
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
    
    // --- Drawing Rectangle --- //

    strokeRect(topLeft: VecLike, size: VecLike){
        this.context.strokeRect(topLeft.x, topLeft.y, size.x, size.y)
    }
    strokeRectV(topLeft: VecLike, bottomRight: VecLike){
        this.context.strokeRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)
    }

    fillRect(topLeft: VecLike, size: VecLike){
        this.context.fillRect(topLeft.x, topLeft.y, size.x, size.y)
    }
    fillRectV(topLeft: VecLike, bottomRight: VecLike){
        this.context.fillRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)
    }

    clearRect(topLeft: VecLike, size: VecLike){
        this.context.clearRect(topLeft.x, topLeft.y, size.x, size.y)
    }
    clearRectV(topLeft: VecLike, bottomRight: VecLike){
        this.context.clearRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)
    }

    // --- Drawing Circle --- //

    strokeCirc(center: VecLike, radius: number){
        this.context.beginPath()
        this.context.arc(center.x, center.y, radius, 0, Math.PI*2)
        this.context.stroke()
    }

    fillCirc(center: VecLike, radius: number){
        this.context.beginPath()
        this.context.arc(center.x, center.y, radius, 0, Math.PI*2)
        this.context.fill()
    }

    // --- Drawing Arrow --- //

    strokeArrow(start: VecLike, arrow: VecLike, scale = 1, headAngle = Math.PI/4, headSize = 20){
        this.strokeArrowTo(start, Vec.from(start).add( Vec.from(arrow).mul(scale) ), headAngle, headSize)
    }

    strokeArrowTo(start: VecLike, end: VecLike, headAngle = Math.PI/4, headSize = 20){
        this.context.beginPath()
        this.context.moveTo(start.x, start.y)
        this.context.lineTo(end.x, end.y)

        const dir = Vec.from(end).to(start).normalize(headSize)
        const p1 = Vec.from(dir).rotate(headAngle/2).add(end)
        const p2 = Vec.from(dir).rotate(-headAngle/2).add(end)

        this.context.lineTo(p1.x, p1.y)
        this.context.lineTo(p2.x, p2.y)
        this.context.lineTo(end.x, end.y)

        this.context.stroke()
    }

    // --- Drawing Text --- //

    strokeText(text: string, pos: VecLike, maxWidth?: number){
        this.context.strokeText(text, pos.x, pos.y, maxWidth)
    }

    fillText(text: string, pos: VecLike, maxWidth?: number){
        this.context.fillText(text, pos.x, pos.y, maxWidth)
    }

    measureText(text: string): TextMetrics {
        return this.context.measureText(text)
    }

    // --- Line Styles --- //

    get lineWidth(): number { return this.context.lineWidth }
    set lineWidth(n: number){ this.context.lineWidth = n }

    get lineCap(): CanvasLineCap { return this.context.lineCap }
    set lineCap(n: CanvasLineCap){ this.context.lineCap = n }

    get lineJoin(): CanvasLineJoin { return this.context.lineJoin }
    set lineJoin(n: CanvasLineJoin){ this.context.lineJoin = n }

    get miterLimit(): number { return this.context.miterLimit }
    set miterLimit(n: number) { this.context.miterLimit = n }

    get lineDash(): number[] { return this.context.getLineDash() }
    set lineDash(segments: number[]){ this.context.setLineDash(segments) }

    get lineDashOffset(): number { return this.context.lineDashOffset }
    set lineDashOffset(n: number) { this.context.lineDashOffset = n }

    // --- Text Style --- //

    /** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font */
    get font(): string { return this.context.font }
    /** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/font */
    set font(n: string){ this.context.font = n }

    get textAlign(): CanvasTextAlign { return this.context.textAlign }
    set textAlign(n: CanvasTextAlign){ this.context.textAlign = n }

    get textBaseline(): CanvasTextBaseline { return this.context.textBaseline }
    set textBaseline(n: CanvasTextBaseline){ this.context.textBaseline = n }

    get direction(): CanvasDirection { return this.context.direction }
    set direction(n: CanvasDirection){ this.context.direction = n }

    get letterSpacing(): string { return this.context.letterSpacing }
    set letterSpacing(n: string){ this.context.letterSpacing = n }

    get fontKerning(): CanvasFontKerning { return this.context.fontKerning }
    set fontKerning(n: CanvasFontKerning){ this.context.fontKerning = n }

    get fontStretch(): CanvasFontStretch { return this.context.fontStretch }
    set fontStretch(n: CanvasFontStretch){ this.context.fontStretch = n }

    get fontVariantCap(): CanvasFontVariantCaps { return this.context.fontVariantCaps }
    set fontVariantCap(n: CanvasFontVariantCaps){ this.context.fontVariantCaps = n }

    get textRendering(): CanvasTextRendering { return this.context.textRendering }
    set textRendering(n: CanvasTextRendering){ this.context.textRendering = n }

    get wordSpacing(): string { return this.context.wordSpacing }
    set wordSpacing(n: string){ this.context.wordSpacing = n }

    // --- Fill and Stroke Styles --- //

    get strokeStyle(): string | CanvasGradient | CanvasPattern { return this.context.strokeStyle }
    set strokeStyle(n: string | CanvasGradient | CanvasPattern){ this.context.strokeStyle = n }

    get fillStyle(): string | CanvasGradient | CanvasPattern { return this.context.fillStyle }
    set fillStyle(n: string | CanvasGradient | CanvasPattern){ this.context.fillStyle = n }

    // --- Gradients and Patterns --- //

    createConicGradient(pos: VecLike, startAngle=0): CanvasGradient {
        return this.context.createConicGradient(startAngle, pos.x, pos.y)
    }

    createRadialGradient(outerPos: VecLike, outerRadius: number, innerPos = outerPos, innerRadius=0): CanvasGradient {
        return this.context.createRadialGradient(innerPos.x, innerPos.y, innerRadius, outerPos.x, outerPos.y, outerRadius)
    }

    createLinearGradient(p0: VecLike, p1: VecLike): CanvasGradient {
        return this.context.createLinearGradient(p0.x, p0.y, p1.x, p1.y)
    }

    createPattern(image: ImageLike, repetition: "repeat" | "repeat-x" | "repeat-y" | "no-repeat" = "repeat"): CanvasPattern {
        return this.context.createPattern(image.canvas, repetition)!
    }

    // --- Shadow --- //

    get shadowBlur(): number { return this.context.shadowBlur }
    set shadowBlur(n: number){ this.context.shadowBlur = n }

    get shadowColor(): string { return this.context.shadowColor }
    set shadowColor(n: string){ this.context.shadowColor = n }

    get shadowOffset(): VecLike { return {x: this.context.shadowOffsetX, y: this.context.shadowOffsetY}}
    set shadowOffset(v: VecLike){
        this.context.shadowOffsetX = v.x
        this.context.shadowOffsetY = v.y
    }

    // --- Paths --- //

    // To simplify some methods, the context doesn't have its own path.
    // Create a Path object instead.

    // --- Drawing Paths --- //

    stroke(path: PathLike){
        this.context.stroke(path.path)
    }

    fill(path: PathLike){
        this.context.fill(path.path)
    }

    clip(path: PathLike, fillRule?: CanvasFillRule){
        this.context.clip(path.path, fillRule)
    }

    /** @param point is in canvas-space. */
    isPointInPath(path: PathLike, point: VecLike, fillRule?: CanvasFillRule): boolean {
        return this.context.isPointInPath(path.path, point.x, point.y, fillRule)
    }

    /** @param point is in canvas-space. */
    isPointInStroke(path: PathLike, point: VecLike): boolean {
        return this.context.isPointInStroke(path.path, point.x, point.y)
    }

    // --- Transformations --- //

    translate(v: VecLike){
        this.context.translate(v.x, v.y)
    }
    translateN(x: number, y: number){
        this.context.translate(x, y)
    }

    rotate(angle: number){
        this.context.rotate(angle % (Math.PI*2))
    }

    scale(n: number){
        this.context.scale(n, n)
    }
    scaleV(v: VecLike){
        this.context.scale(v.x, v.y)
    }
    scaleN(x: number, y: number){
        this.context.scale(x, y)
    }

    // TODO Transform Matrix

    // --- Compositing --- //

    get globalAlpha(): number { return this.context.globalAlpha }
    set globalAlpha(n: number){ this.context.globalAlpha = n }

    /** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation */
    get globalCompositeOperation(): GlobalCompositeOperation { return this.context.globalCompositeOperation }
    /** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation */
    set globalCompositeOperation(n: GlobalCompositeOperation){ this.context.globalCompositeOperation = n }

    // --- Drawing Images --- //

    drawImageRect(image: ImageLike, pos: VecLike, size=image.size, sourcePos={x:0, y:0}, sourceSize=image.size){
        this.context.drawImage(image.canvas, sourcePos.x, sourcePos.y, sourceSize.x, sourceSize.y, pos.x, pos.y, size.x, size.y)
    }
    drawImageRectV(image: ImageLike, topLeft: VecLike, bottomRight: VecLike, sourcePos={x:0, y:0}, sourceSize=image.size){
        this.context.drawImage(image.canvas, sourcePos.x, sourcePos.y, sourceSize.x, sourceSize.y, topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)
    }

    drawImage(image: ImageLike, pos: VecLike, options: DrawImageOptions = {}){
        const size = options.size || image.size
        const anchor = options.anchor || {x: 0.5, y: 0.5}
        const rotation = options.rotation || 0
        const sourcePos = options.sourcePos || {x: 0, y: 0}
        const sourceSize = options.sourceSize || image.size

        const topLeft = Vec.from(size).mulV(anchor).neg()

        this.save()
        this.translate(pos)
        this.rotate(rotation)
        this.context.drawImage(image.canvas, sourcePos.x, sourcePos.y, sourceSize.x, sourceSize.y, topLeft.x, topLeft.y, size.x, size.y)
        this.restore()
    }

    // --- Pixel Manipulation --- //

    getImageData(pos: VecLike, size: VecLike, settings?: ImageDataSettings): ImageData {
        return this.context.getImageData(pos.x, pos.y, size.x, size.y, settings)
    }

    putImageData(data: ImageData, pos: VecLike, sourcePos: VecLike = {x: 0, y: 0}, sourceSize: VecLike = {x: data.width, y: data.height}){
        this.context.putImageData(data, pos.x, pos.y, sourcePos.x, sourcePos.y, sourceSize.x, sourceSize.y)
    }

    createImageData(size: VecLike): ImageData {
        return this.context.createImageData(size.x, size.y)
    }

    // --- Image Smoothing --- //

    get imageSmoothingEnabled(): boolean { return this.context.imageSmoothingEnabled }
    set imageSmoothingEnabled(b: boolean){ this.context.imageSmoothingEnabled = b }

    get imageSmoothingQuality(): ImageSmoothingQuality { return this.context.imageSmoothingQuality }
    set imageSmoothingQuality(n: ImageSmoothingQuality){ this.context.imageSmoothingQuality = n }

    // --- Canvas State --- //

    reset(){
        this.context.reset()
    }

    save(){
        this.context.save()
    }

    restore(){
        this.context.restore()
    }

    /** Clears the whole canvas while keeping the transform. You likely want `reset()` if you have a draw loop. */
    clear(){
        this.context.save();
        this.context.resetTransform()
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    // --- Filter --- //

    /** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter */
    get filter(): string { return this.context.filter }
    /** https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter */
    set filter(s: string){ this.context.filter = s }
}

type DrawImageOptions = {
    size?: VecLike
    anchor?: VecLike
    rotation?: number
    sourcePos?: VecLike
    sourceSize?: VecLike
}
