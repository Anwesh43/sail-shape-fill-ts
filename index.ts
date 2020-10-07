const w : number = window.innerWidth 
const h : number = window.innerHeight
const parts : number = 3  
const scGap : number = 0.02 / parts 
const strokeFactor : number = 90 
const sizeFactor : number = 3 
const backColor : string = "#BDBDBD"
const colors : Array<string> = [
    "#F44336",
    "#3F51B5",
    "#FFC107",
    "#2196F3",
    "#4CAF50"
]
const delay : number = 20 

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawSailPath(context : CanvasRenderingContext2D, sf3 : number, size : number) {
        context.save()
        context.beginPath()
        context.moveTo(0, 0)
        context.lineTo(size, h / 2)
        context.lineTo(size, h)
        context.lineTo(0, h)
        context.lineTo(0, 0)
        context.clip()
        context.fillRect(0, 0, w, h * sf3)
        context.restore()
    } 

    static drawSailShapeFill(context : CanvasRenderingContext2D, i : number, scale : number) {
        const size : number = w / sizeFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)
        DrawingUtil.drawLine(context, 0, 0, size * sf1, h * 0.5 * sf1)
        DrawingUtil.drawLine(context, size, h / 2, size, h / 2 * (1 + sf2))
        DrawingUtil.drawSailPath(context, sf3, size)        
    }

    static drawSSFNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        context.fillStyle = colors[i]
        DrawingUtil.drawSailShapeFill(context, i, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}