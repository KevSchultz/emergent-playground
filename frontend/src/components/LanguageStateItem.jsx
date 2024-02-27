/**
 * @project Emergent Playground
 * @file LanguageStateItem.jsx
 * @overview This file contains the entries found in the state list in the LanguageOptionsTabController, represented by langTupleList.
 * @author Beckett Avary
 * @exports LanguageStateItem
 */

// React Imports
import { useContext } from 'react';

// Material UI Imports
import { Avatar, IconButton, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Brightness1, RemoveCircleOutline } from '@mui/icons-material';

// Other Imports
import P5PropertiesContext from './P5PropertiesContext';

/**
 * An entry component in the LanguageOptionsTabContainer list of states, represented by langTupleList.
 *
 * This component displays the color and name of a given state in a ListItem.
 * An IconButton is used to delete the entry from the list.
 * A ListItemAvatar is used to display the state's color using an Avatar with a Brightness1Icon.
 * A TextField is used to display and enter the state's name.
 *
 * @param {Object} state - The state to be displayed, an entry in langTupleList.
 * @param {string} state.color - The state's color in hex format.
 * @param {string} state.name - The state's name as inputted by the user.
 *
 * @returns {JSX.Element} The LanguageStateItem component.
 */
function LanguageStateItem({state}) {
    const { langTupleList, setLangTupleList } = useContext(P5PropertiesContext);
    
    const handleName = (event) => {
        setLangTupleList(langTupleList.map(s => {
            if(s.color === state.color){
                return {color: s.color, name: event.target.value}
            } 
            return s;
        }));
    };

    return(
        <ListItem
            secondaryAction={
                <IconButton 
                    edge='end'
                    onClick={() => {
                        setLangTupleList(langTupleList.filter(t => t.color !== state.color));
                    }}
                >
                    <RemoveCircleOutline/>
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Avatar>
                    <Brightness1 sx={{ color: state.color }}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <TextField variant='standard' margin='none' onChange={handleName} value={state.name} error={state.name===''}/>
                }
            />
        </ListItem>
    );
}

export default LanguageStateItem;