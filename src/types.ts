import type { VecLike } from "@coin/vector2d";

export type PathLike = {
    path: Path2D
}

export type ImageLike = {
    canvas: HTMLImageElement | SVGImageElement | HTMLVideoElement | HTMLCanvasElement | ImageBitmap | OffscreenCanvas | VideoFrame
    size: VecLike
}