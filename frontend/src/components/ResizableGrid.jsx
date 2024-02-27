/**
 * @project Emergent Playground
 * @file ResizableGrid.jsx
 * @overview This file contains the container component for a grid that will resize its children based on its parent container.
 * @author Beckett Avary
 * @exports ResizableGrid
 */

import { Children, useEffect, useRef, useState } from 'react';
import { Box, Grid } from '@mui/material';

/**
 * A container component that arranges its children in a two-column grid when its width is less than limit.
 *
 * Registers a ResizeObserver on its parent Box container's Ref, updating state
 * variable boxSize when the parent Box size changes. Children are mapped to 
 * Grid items that set their breakpoint based on (boxSize < limit). Likely bad.
 * 
 * @param {object} props
 * @param {number} props.limit - The limit at which the grid switches from two columns to one.
 * @param {JSX.Element} props.children - The React components contained by ResizableGrid.
 *
 * @returns {JSX.Element} The ResizableGrid component.
 */
function ResizableGrid({limit, children}){
    
    const [boxSize, setBoxSize] = useState(0);
    const boxRef = useRef(null);

    useEffect(() => {
        const resizeObs = new ResizeObserver(entries => {
            if(entries && entries.length > 0){
                setBoxSize(entries[0].contentRect.width);
            }
        });

        if(boxRef.current){
            resizeObs.observe(boxRef.current);
        }

        return () => {
            if(boxRef.current){
                resizeObs.unobserve(boxRef.current);
            }
        };
    }, [boxRef, boxSize]);

    return(
        <Box ref={boxRef}>
            <Grid container spacing={1} padding={2}>
                {Children.map(children, child =>
                    <Grid item xs={boxSize < limit ? 12 : 6}>{child}</Grid>
                )}
            </Grid>
        </Box>
    );
}

export default ResizableGrid;