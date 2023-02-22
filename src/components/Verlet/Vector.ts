export default class Vector {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }

    add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y)
    }

    subtract(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y)
    }

    multiply(s: number) {
        return new Vector(this.x * s, this.y * s)
    }

    divide(s: number) {
        return new Vector(this.x / s, this.y / s)
    }

    dot(v: Vector) {
        return new Vector(this.x * v.x, this.y * v.y)
    }

    len() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    }

    copy() {
        return new Vector(this.x, this.y)
    }

    clear() {
        this.x = 0
        this.y = 0
    }

}