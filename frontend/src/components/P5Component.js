/**
 * @file This file exports s P5component which is a react component that wraps a p5 canvas with associated sketch code.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import React, { useEffect } from 'react'
import p5 from "p5";


function P5Component({sketch}) {

    let myRef = React.createRef();

    // useEffect is a hook that gets called after the component is rendered or when anything in the dependency array changes
    useEffect(() => {

        // This is where we create the canvas and set up the sketch
        // myRef.current refers to the div created below
        let canvas = new p5(sketch, myRef.current);

        return function cleanup() {
            // This is where we clean up the sketch
            canvas.remove();
        };
    }, [myRef, sketch]); // Empty dependency array means this effect runs once on mount

    return <div ref={myRef}/>;
}

export default P5Component