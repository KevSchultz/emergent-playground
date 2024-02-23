/**
 * @project Emergent Playground
 * @file PrettyAlert.jsx
 * @overview This file contains a component for beautiful errors.
 * @author Beckett Avary
 * @exports PrettyAlert
 */

/**
 * @typedef {'success' | 'info' | 'warning' | 'error'} Severity
 * @typedef {'top' | 'bottom'} OriginV 
 * @typedef {'left' | 'center' | 'right'} OriginH
 */

/**
 * A pretty looking alert message. Use only one per component, and use setAlertMessage
 * to control what it says. Use setOpenAlert(true) to open it. Handles its own closing.
 *
 * Snackbar contains the Alert so it can display over other components.
 *
 * @param {boolean} openAlert - A React state variable to control whether PrettyAlert is displayed.
 * @param {function} setOpenAlert - A React state function to control openAlert.
 * @param {Severity} alertSeverity - Controls type of Alert. Can be one of 'success', 'info', 'warning', or 'error'.
 * @param {string} alertMessage - A React state variable for the alert message displayed.
 * @param {number} alertDuration - Duration PrettyAlert displays in milliseconds.
 * @param {OriginV} anchorOriginV - Controls vertical position of PrettyAlert. Can be one of 'top' or 'bottom'.
 * @param {OriginH} anchorOriginH - Controls horizontal position of PrettyAlert. Can be one of 'left', 'center', or 'right'.
 */
import { Alert, Snackbar } from '@mui/material';

function PrettyAlert({openAlert, setOpenAlert, alertSeverity, alertMessage, alertDuration, anchorOriginV, anchorOriginH}){

    const handleAlertClose = (event, reason) => {
        if(reason === 'clickaway'){
            return;
        }
        setOpenAlert(false);
    };

    return(
        <Snackbar
            open={openAlert}
            autoHideDuration={alertDuration}
            onClose={handleAlertClose}
            anchorOrigin={{ vertical: anchorOriginV, horizontal: anchorOriginH }}
        >
            <Alert
                onClose={handleAlertClose}
                severity={alertSeverity}
                variant='outlined'
                sx={{ width: '100%' }}
            >
                {alertMessage}
            </Alert>
        </Snackbar>
    );
}

export default PrettyAlert;
