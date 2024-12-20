import { Vec, type VecLike } from "@coin/vector2d";
import { BaseRenderingContext } from "../RenderingContext/index.ts";

export abstract class BaseRenderer extends BaseRenderingContext{
    private _pos = new Vec(0, 0)
    private _zoomV = new Vec(1, 1)
    private _anchor = new Vec(0.5, 0.5)
    rotation = 0

    get pos(): Vec { return this._pos }
    set pos(v: VecLike){ this._pos.set(v) }

    get zoomV(): Vec { return this._zoomV }
    set zoomV(v: VecLike){ this._zoomV.set(v) }

    get anchor(): Vec { return this._anchor }
    set anchor(v: VecLike){ this._anchor.set(v) }

    get zoom(): number { return this._zoomV.x }
    set zoom(n: number){ this._zoomV.setN(n, n)}

    zoomFrom(n: number, pos: VecLike){
        this.pos.add(Vec.from(pos).to(this.pos).mul(1/n - 1))
        this.zoom *= n
    }

    setZoomFrom(n: number, pos: VecLike){
        this.zoomFrom(n/this.zoom, pos)
    }

    override reset(){
        this.context.reset()

        // This seems to reduce some lag.
        this.context.rect(0, 0, this.canvas.width, this.canvas.height)
        this.context.clip()

        this.translate(Vec.from(this.size).mulV(this._anchor))
        this.rotate(-this.rotation)
        this.scaleV(this._zoomV)
        this.translateN(-this._pos.x, -this._pos.y)
    }
    
    // --- Space Conversion --- //

    canvasToWorld(v: VecLike): Vec {
        return Vec.from(v).sub(Vec.from(this._anchor).mulV(this.size)).divV(this._zoomV).rotate(this.rotation).add(this.pos)
    }

    wordlToCanvas(v: VecLike): Vec {
        return Vec.from(v).sub(this.pos).rotate(-this.rotation).mulV(this._zoomV).add(Vec.from(this._anchor).mulV(this.size))
    }

    // --- Debug --- //

    private _debugControlsInterval = -1

    activateDebugControls(options: DebugControlsOptions = {}){
        if(this._debugControlsInterval !== -1) return

        const translateSpeed = options.translateSpeed || 30
        const scaleSpeed = options.scaleSpeed || 1.05
        const rotateSpeed = options.rotateSpeed || Math.PI/60
        const intervaleTime = options.intervalTime || 1000/60
        
        const keys: Record<string, boolean> = {}
        self.addEventListener("keydown", event => {
            keys[event.code] = true
        })
        self.addEventListener("keyup", event => {
            keys[event.code] = false
        })
        
        console.debug("Activated Debug Controls.")

        this._debugControlsInterval = setInterval(() => {
            const moveVec = new Vec(0, 0)
            if(keys.KeyD) moveVec.addN(1, 0)
            if(keys.KeyA) moveVec.addN(-1, 0)
            if(keys.KeyW) moveVec.addN(0, -1)
            if(keys.KeyS) moveVec.addN(0, 1)

            if(!moveVec.equalN(0, 0)){
                this._pos.add(moveVec.normalize(translateSpeed / this.zoom).rotate(this.rotation))
            }

            if(keys.KeyR) this.rotation += rotateSpeed
            if(keys.KeyF) this.rotation -= rotateSpeed

            if(keys.KeyE) this.zoom *= scaleSpeed
            if(keys.KeyQ) this.zoom /= scaleSpeed
        }, intervaleTime)
    }

    deactivateDebugControls(){
        if(this._debugControlsInterval !== -1){
            clearInterval(this._debugControlsInterval)
            this._debugControlsInterval = -1
            console.debug("Deactivated Debug Controls.")
        }
    }

    toggleDebugControls(options: DebugControlsOptions = {}){
        if(this._debugControlsInterval === -1) this.activateDebugControls(options)
        else this.deactivateDebugControls()
    }
}

type DebugControlsOptions = {
    translateSpeed?: number
    scaleSpeed?: number
    rotateSpeed?: number
    intervalTime?: number
}