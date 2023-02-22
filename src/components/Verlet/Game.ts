import Solver from "./Solver";
import Vector from "./Vector";
import Draw from "./Draw";
import VerletObject from "./VerletObject";

export default class Game {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly draw: Draw;
    public mid: Vector
    public solver: Solver
    public deltaTimeRender: number
    public deltaTimeUpdate: number
    public deltaTimeSolver: number
    private constraintRadius: number;
    private backgroundColor: string;

    constructor(ctx: CanvasRenderingContext2D, backgroundColor: string) {
        this.ctx = ctx
        this.backgroundColor = backgroundColor;
        this.draw = new Draw(ctx)
        this.ctx.canvas.height = 700
        this.ctx.canvas.width = this.ctx.canvas.height
        this.mid = new Vector(ctx.canvas.width / 2, ctx.canvas.height / 2)
        this.constraintRadius = this.mid.y - 50
        this.solver = new Solver(this.mid, this.constraintRadius, 0.01)
        this.deltaTimeRender = 0
        this.deltaTimeSolver = 0
        this.deltaTimeUpdate = 0
    }

    randomConstraint() {
        const radius = this.constraintRadius * Math.random()
        const point = Math.random() * Math.PI * 2
        return new Vector(this.mid.x + radius * Math.cos(point), this.mid.y + radius * Math.sin(point))
    }

    getTime() {
        return (new Date()).getMilliseconds()
    }

    solverUpdate() {
        const t = this.getTime()
        this.solver.update()
        this.deltaTimeSolver = this.getTime() - t
    }

    render() {
        const t = this.getTime()
        this.draw.fillScreen(this.backgroundColor)
        this.draw.Circle(this.mid.x, this.mid.y, this.constraintRadius, 'white')
        this.solver.objects.forEach((obj) => {
            this.draw.Circle(obj.position.x, obj.position.y, obj.radius, obj.color)
        })
        this.deltaTimeRender = this.getTime() - t
    }

    update(end = 0) {
        const start = this.getTime()
        this.deltaTimeUpdate = start - end
        this.render()
        this.addObject()
        this.solverUpdate()

        this.draw.Text(`Simulation time: ${Math.round(this.deltaTimeSolver)} ms`, 10, 50, 'green', '38px serif')
        this.draw.Text(`Render time: ${Math.round(this.deltaTimeRender)} ms`, 10, 90, 'green', '38px serif')
        this.draw.Text(`Update time: ${Math.round(this.deltaTimeUpdate)} ms`, 10, 130, 'green', '38px serif')
        this.draw.Text(`FPS: ${Math.round(1000 / this.deltaTimeUpdate)}`, 10, 170, 'green', '38px serif')
        this.draw.Text(`Objects: ${this.solver.numObjects}`, 10, 210, 'green', '38px serif')
        requestAnimationFrame(() => this.update(start))
    }

    addObject() {
        if (this.solver.steps % 4 === 0 && this.solver.numObjects < 2000) {
            const i = this.solver.numObjects
            const obj = new VerletObject(this.mid, 5, `hsl(${i}, 100%, 50%)`)
            const point = i / 30 * 2 * Math.PI
            // const point = Math.sin(i / 70) * Math.PI
            const scale = 1000
            const velocity = new Vector(Math.cos(point), Math.sin(point))
            obj.setVelocity(velocity, this.solver.subStepDeltaTime * scale)
            this.solver.addObject(obj)
        }
    }

    run() {
        console.log('Start')
        this.update()
    }
}
