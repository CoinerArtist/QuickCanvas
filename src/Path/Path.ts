import { Vec, type VecLike } from "@coin/vector2d";
import type { PathLike } from "../types.ts";

export class Path{
    path: Path2D

    // --- Constructors --- //

    constructor(path: Path2D = new Path2D()){
        this.path = path
    }

    static fromPathLike(path: PathLike): Path {
        return new Path(new Path2D(path.path))
    }

    static fromSVG(svgPath: string): Path {
        return new Path(new Path2D(svgPath))
    }

    // --- Base Methods --- //

    moveTo(pos: VecLike){
        this.path.moveTo(pos.x, pos.y)
    }

    lineTo(pos: VecLike){
        this.path.lineTo(pos.x, pos.y)
    }

    rect(topLeft: VecLike, size: VecLike){
        this.path.rect(topLeft.x, topLeft.y, size.x, size.y)
    }
    rectV(topLeft: VecLike, bottomRight: VecLike){
        this.path.rect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y)
    }

    roundRect(topLeft: VecLike, size: VecLike, radii: number | VecLike | (VecLike | number)[]){
        this.path.roundRect(topLeft.x, topLeft.y, size.x, size.y, radii)
    }
    roundRectV(topLeft: VecLike, bottomRight: VecLike, radii: number | VecLike | (VecLike | number)[]){
        this.path.roundRect(topLeft.x, topLeft.y, bottomRight.x - topLeft.x, bottomRight.y - topLeft.y, radii)
    }

    arc(center: VecLike, radius: number, startAngle: number, endAngle: number, counterClockwise?: boolean){
        this.path.arc(center.x, center.y, radius, startAngle, endAngle, counterClockwise)
    }

    arcTo(p1: VecLike, p2: VecLike, radius: number){
        this.path.arcTo(p1.x, p1.y, p2.x, p2.y, radius)
    }

    ellipse(center: VecLike, radii: VecLike, rotation: number, startAngle: number, endAngle: number, counterClockwise?: boolean){
        this.path.ellipse(center.x, center.y, radii.x, radii.y, rotation, startAngle, endAngle, counterClockwise)
    }

    bezierCurveTo(cp1: VecLike, cp2: VecLike, end: VecLike){
        this.path.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y)
    }

    quadraticCurveTo(cp: VecLike, end: VecLike){
        this.path.quadraticCurveTo(cp.x, cp.y, end.x, end.y)
    }

    closePath(){
        this.path.closePath()
    }

    addPath(path: Path, transform?: DOMMatrix2DInit){
        this.path.addPath(path.path, transform)
    }

    // --- Extra Methods --- //

    circ(center: VecLike, radius: number){
        this.path.arc(center.x, center.y, radius, 0, Math.PI*2)
    }

    arrow(start: VecLike, arrow: VecLike, scale = 1, headAngle = Math.PI/4, headSize = 20){
        this.arrowTo(start, Vec.from(start).add( Vec.from(arrow).mul(scale) ), headAngle, headSize)
    }

    arrowTo(start: VecLike, end: VecLike, headAngle = Math.PI/4, headSize = 20){
        this.moveTo(start)
        this.lineTo(end)

        const dir = Vec.from(end).to(start).normalize(headSize)

        this.lineTo(Vec.from(dir).rotate(headAngle/2).add(end))
        this.lineTo(Vec.from(dir).rotate(-headAngle/2).add(end))
        this.lineTo(end)
    }

    copy(): Path {
        return new Path(new Path2D(this.path))
    }

}