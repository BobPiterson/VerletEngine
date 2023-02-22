import React, {useEffect, useRef} from 'react';
import classes from './Verlet.module.css'
import Game from "./Game";

const backgroundColor = '#4ac090'

const Verlet = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const gameRef = useRef<Game>()

    useEffect(() => {
        const canvas = canvasRef.current as HTMLCanvasElement
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
        const game = new Game(ctx, backgroundColor)
        game.run()
        gameRef.current = game
    }, [canvasRef])


    return (
        <div style={{backgroundColor: backgroundColor}} className={classes.container}>
            <div className={classes.containerInfo}>
                <p className={classes.info}>Simulation time: <span>{window.innerHeight}</span></p>
                <p className={classes.info}>Render Time: <span>1343</span></p>
                <p className={classes.info}>Objects: <span>1343</span></p>
                <p className={classes.info}>AllTime: <span>1343</span></p>
            </div>
            <canvas className={classes.field} ref={canvasRef}></canvas>
        </div>
    );
};

export default Verlet;