/*global chrome*/

import React, { useState } from 'react'
import styled from 'styled-components'

// custom styling using styled-components!
const AppContainer = styled.div`
  
`

function CurrentTab(props) {
    return (
        <div>
            <p>{props.name}</p>
        </div>
    )

}

function App() {
    const [currentTabs, setNewTabs] = useState(["youtube", "twitter"])

    const addTabs = (tab) => {
        const newTabs = [...currentTabs, tab]
        setNewTabs(newTabs)
    }
     

    return ( 
        <AppContainer>
            {currentTabs.map((item, i) => <CurrentTab 
                key = {i}
                name = {item}
            />)}

        </AppContainer>
    );
}

export default App;