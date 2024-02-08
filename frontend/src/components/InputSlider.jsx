/**
 * @file InputSlider.jsx renders a material ui slider input component with a label and input field.
 * It is a modified version of the InputSlider component from the Material-UI documentation. The original code can be found at https://mui.com/components/slider/
 * @author Kevin Schultz
 * @project Emergent Playground
 */
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import Input from '@mui/material/Input';
import PropTypes from 'prop-types';

/**
 * Renders a Material-UI slider input component with a label and input field.
 * The slider's value, minimum and maximum values, step size, and label can be customized via props.
 * The component also accepts a callback function that will be called whenever the slider's value changes.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.className - The CSS class to apply to the component.
 * @param {Object} props.sx - The style to apply to the component.
 * @param {string} props.label - The label to display above the slider.
 * @param {number} props.minValue - The minimum value of the slider.
 * @param {number} props.maxValue - The maximum value of the slider.
 * @param {number} props.stepValue - The step size of the slider.
 * @param {number} props.value - The value of the slider (controlled component).
 * @param {Function} props.setValue - The function to call when the slider's value changes.
 */
function InputSlider({
    className,
    sx,
    label,
    minValue,
    maxValue,
    stepValue,
    value,
    setValue,
}) {
    
    /**
     * Updates the slider's value.
     *
     * @param {Object} event - The event object.
     * @param {number} newValue - The new value of the slider.
     */
    const handleSliderChange = (event, newValue) => {
        // setValue(newValue);
        setValue(newValue);
    };

    /**
     * Updates the slider's value based on the text input field.
     *
     * @param {Object} event - The event object.
     */
    const handleTextInputChange = (event) => {
        let newValue =
            event.target.value === '' ? '' : Number(event.target.value);
        // setValue(newValue);
        setValue(newValue);
    };

    /**
     * Ensures the slider's value is within the allowed range.
     */
    const handleBlur = () => {

        if (value < minValue) {

            // setValue(minValue);
            setValue(minValue)

        } else if (value > maxValue) {

            // setValue(maxValue);
            setValue(maxValue)

        }
    };

    return (
        <Box className={className} sx={sx}>
            <Typography id="input-slider" gutterBottom>
                {label}
            </Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                    <Slider
                        value={value}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        step={stepValue}
                        min={minValue}
                        max={maxValue}
                    />
                </Grid>
                <Grid item>
                    <Input
                        style={{ width: '50px', color: 'white' }}
                        value={value}
                        size="small"
                        onChange={handleTextInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: stepValue,
                            min: minValue,
                            max: maxValue,
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

// This is a type check for the props of the component
InputSlider.propTypes = {
    className: PropTypes.string,
    sx: PropTypes.object,
    label: PropTypes.string.isRequired,
    minValue: PropTypes.number.isRequired,
    maxValue: PropTypes.number.isRequired,
    stepValue: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    setValue: PropTypes.func.isRequired,
};

export default InputSlider;
