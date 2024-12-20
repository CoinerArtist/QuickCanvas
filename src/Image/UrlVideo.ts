import { Vec } from "@coin/vector2d";

export class UrlVideo{
    canvas: HTMLVideoElement

    constructor(url: string, loop=true, autoplay=true){
        this.canvas = document.createElement("video")
        this.canvas.src = url
        this.canvas.muted = true

        this.canvas.loop = loop
        if(autoplay) this.canvas.play()
    }

    get size(): Vec { return new Vec(this.canvas.videoWidth, this.canvas.videoHeight)}
    get loaded(): boolean { return this.canvas.readyState >= 3 }

    whenLoaded(): Promise<void> {
        return new Promise<void>((resolve) => {
            if(!this.loaded){
                this.canvas.addEventListener("loadeddata", () => resolve())
            } else {
                resolve()
            }
        })
    }

    get paused(): boolean { return this.canvas.paused }
    get duration(): number { return this.canvas.duration }

    get currentTime(): number { return this.canvas.currentTime }
    set currentTime(n: number){ this.canvas.currentTime = n }

    get loop(): boolean { return this.canvas.loop }
    set loop(n: boolean){ this.canvas.loop = n }

    play(){ this.canvas.play() }
    pause(){ this.canvas.pause() }
    toggle(){
        if(this.canvas.paused) this.canvas.play()
        else this.canvas.pause()
    }
}