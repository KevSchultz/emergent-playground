import { useContext } from 'react';
import P5PropertiesContext from './P5PropertiesContext';
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Brightness1, RemoveCircleOutline } from '@mui/icons-material';

//TODO: make names work!
function LanguageStateItem({color}) {
    const { langTupleList, setLangTupleList } = useContext(P5PropertiesContext);

    return(
        <ListItem
            secondaryAction={
                <IconButton 
                    edge='end'
                    onClick={() => {
                        setLangTupleList(langTupleList.filter(c => c !== color));
                    }}
                >
                    <RemoveCircleOutline/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <Brightness1 sx={{ color: color }}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <TextField variant="standard"/>
                }
            />
        </ListItem>
    );
}

export default LanguageStateItem;
