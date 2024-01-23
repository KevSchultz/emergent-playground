/**
 * @file This file exports P5Wrapper which is a react component that wraps a p5 canvas with associated sketch code.
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import React, { useEffect } from 'react'
import PropTypes from 'prop-types';
import p5 from "p5";

/**
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the div.
 * @param {function} props.sketch - The p5 sketch to display in the canvas.
 * @returns {JSX.Element} A div that contains a p5 canvas.
 */
function P5Wrapper({className, sketch}) {

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
    }, [myRef, sketch]); // will called when myRef or sketch is changed. 

    return <div className={className} ref={myRef}/>;
}

// This is a type check for the sketch prop
P5Wrapper.propTypes = {
    className: PropTypes.string, // needed for styling purposes
    sketch: PropTypes.func.isRequired
};

export default P5Wrapper;