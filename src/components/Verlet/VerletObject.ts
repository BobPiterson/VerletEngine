import Vector from "./Vector";

export default class VerletObject {
    public position: Vector
    public positionLast: Vector
    public acceleration: Vector
    public radius: number
    public color: string

    constructor(position: Vector, radius: number, color: string) {
        this.position = position
        this.positionLast = position
        this.acceleration = new Vector(0, 0)
        this.radius = radius
        this.color = color
    }

    update(dt: number) {
        const displacement = this.position.subtract(this.positionLast)
        this.positionLast = this.position
        this.position = this.position.add(displacement).add(this.acceleration.multiply(dt * dt))
        this.acceleration.clear()
    }

    accelerate(a: Vector) {
        this.acceleration = this.acceleration.add(a)
    }

    setVelocity(v: Vector, dt: number) {
        this.positionLast = this.position.subtract(v.multiply(dt))
    }

    addVelocity(v: Vector, dt: number) {
        this.positionLast.subtract(v.multiply(dt))
    }

    getVelocity(v: Vector, dt: number) {
        return (this.position.subtract(this.positionLast)).divide(dt)
    }
}