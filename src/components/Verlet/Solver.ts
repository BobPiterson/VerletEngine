import Vector from "./Vector";
import VerletObject from "./VerletObject";

export default class Solver {
    public readonly objects: VerletObject[]
    private readonly gravity = new Vector(0, 1000)
    public readonly subStepDeltaTime = 0.005
    private readonly constraintCenter: Vector
    private readonly constraintRadius: number
    private subSteps: number
    public steps: number

    constructor(constraintCenter: Vector, constraintRadius: number, stepDeltaTime: number) {
        this.objects = []
        this.constraintCenter = constraintCenter
        this.constraintRadius = constraintRadius
        this.steps = 0
        this.subSteps = 0
        this.setDeltaTime(stepDeltaTime)
    }

    setDeltaTime(stepDeltaTime: number) {
        this.subSteps = stepDeltaTime / this.subStepDeltaTime
        if (this.subSteps < 1 || this.subSteps !== Math.round(this.subSteps)) throw Error('Substeps < 1 or Substeps not round')
    }

    get numObjects() {
        return this.objects.length
    }

    addObject(obj: VerletObject) {
        this.objects.push(obj)
    }

    removeObject() {
        this.objects.pop()
    }

    update() {
        for (let i = 0; i < this.subSteps; i++) {
            this.checkCollisions()
            this.objects.forEach(obj => {
                this.applyGravity(obj)
                this.applyConstraint(obj)
                this.updateObject(obj, this.subStepDeltaTime)
            })
        }
        this.steps += this.subSteps
    }

    applyGravity(obj: VerletObject) {
        obj.accelerate(this.gravity)
    }

    updateObject(obj: VerletObject, dt: number) {
        obj.update(dt)
    }

    applyConstraint(obj: VerletObject) {
        const v = this.constraintCenter.subtract(obj.position)
        const dist = v.len()
        if (dist > this.constraintRadius - obj.radius) {
            obj.position = this.constraintCenter.subtract(v.divide(dist).multiply(this.constraintRadius - obj.radius))
        }
    }

    checkCollisions() {
        this.objects.forEach(obj1 => {
            this.objects.forEach(obj2 => {
                if (obj1 !== obj2) {
                    const collision_axis = obj1.position.subtract(obj2.position)
                    const dist = collision_axis.len()
                    const min_dist = obj1.radius + obj2.radius
                    if (dist < min_dist) {
                        const v = collision_axis.divide(dist)
                        const delta = min_dist - dist
                        obj1.position = obj1.position.add(v.multiply(delta * 0.5))
                        obj2.position = obj2.position.subtract(v.multiply(delta * 0.5))
                    }
                }
            })
        })
    }
}