import Paper from '@mui/material/Paper'
import { styled } from '@mui/system'
import {useTheme } from '@mui/material/styles';

function ButtonPanel({ className, children }) {
    const theme = useTheme();

    const LeftSideBox = styled(Paper)(() => ({
        display: 'flex',
        flexDirection: 'column',
        position: 'static',
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.primary.main,
    }));


    return (
        <LeftSideBox>
            {children}
        </LeftSideBox>
    );
}

export default ButtonPanel;