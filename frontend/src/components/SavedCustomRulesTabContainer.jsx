/**
 * @project Emergent Playground
 * @file SavedCustomRulesTabContainer.jsx
 * @overview This file contains the container component for the language options including the cellular automata language code editor.
 * @authors Beckett Avary, Kevin Schultz
 * @exports SavedCustomRulesTabContainer
 */

import { useContext } from 'react';

import { Box } from '@mui/material';
import PremadeRuleCard from './PremadeRuleCard';

import P5PropertiesContext from './P5PropertiesContext';

function SavedCustomRulesTabContainer() {
    return (
        <Box
            sx={{
                display: 'flex',
                width: '100%',
                paddingTop: '10px',
                rowGap: '10px',
                columnGap: '10px',
            }}
        >
            <PremadeRuleCard
                newFragmentShader={}
                newTupleList={}
                newDefaultDraw={}
                premadeRuleName={}
                imageUrl={
                }
            />
            <PremadeRuleCard
                newFragmentShader={}
                newTupleList={}
                newDefaultDraw={}
                premadeRuleName={}
                imageUrl={
                }
            />
        </Box>
    );
}

export default SavedCustomRulesTabContainer;
