import { Vec, type VecLike } from "@coin/vector2d";

export class PointPath{
    path: Path2D
    points: Vec[]

    constructor(){
        this.path = new Path2D()
        this.points = []
    }

    lineTo(pos: VecLike){
        this.path.lineTo(pos.x, pos.y)
        this.points.push(Vec.from(pos))
    }

    closePath(){
        this.path.closePath()
    }

    update(){
        this.path = new Path2D()
        for(const p of this.points){
            this.path.lineTo(p.x, p.y)
        }
    }
}