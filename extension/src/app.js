/*global chrome*/

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

// custom styling using styled-components!
const AppContainer = styled.div`
  
`

const ListComponentContainer = styled.div`
    border-style: solid;
    border-width: thin;
    border-radius: 5%;


`


var item = "";
var getTabs = false;

/*
async function fetchFromStorage(key) {
    return new Promise ((resolve, reject) => {
        chrome.storage.sync.get([key], resolve);
    })
        .then(result => {
            if (key == null) {
                return result;
            }
            else {
                return result[key];
            }
        });
}
*/



chrome.storage.sync.get(['mode'], function(newMode) {
    console.log("DA mode is currently " + newMode.mode);
});


function ListComponent(props) {
    return (
        <ListComponentContainer>
            <div>
                {props.name}, {props.url}    
            </div>
        </ListComponentContainer>
    )
}



function App() {
    const [currentTabs, setNewTabs] = useState([]);
    const addTabs = (tab) => {

        console.log(tab);
        setNewTabs(currentTabs => currentTabs.concat(tab));
        
        console.log(currentTabs);
    }

    const [currentNames, setNewNames] = useState([]);
    const addNames = (theName) => {
        setNewNames(currentNames => currentNames.concat(theName));
    }
    
    const [currentIcons, setNewIcons] = useState([]);
    const addIcons = (theIcon) => {
        setNewIcons(currentIcons => currentIcons.concat(theIcon));
    }


    useEffect(() => {
        chrome.storage.sync.get(['currentURL'], function(result) {
            console.log('currentURL is ');
            console.log(result['currentURL']);

            for (let i = 0; i < result.currentURL.length; i++)
            {
                addTabs(result['currentURL'][i]);
                console.log(currentTabs);
            }
            
        });

        chrome.storage.sync.get(['names'], function(result) {
            console.log("'names' is ");
            console.log(result.names);

            for (let i = 0; i < result.names.length; i++)
            {
                addNames(result['names'][i]);
                console.log(currentNames);
            }

        });

        chrome.storage.sync.get(['icons'], function(result) {
            console.log("'icons' is ");
            console.log(result.icons);

            for (let i = 0; i < result.icons.length; i++)
            {
                addIcons(result['icons'][i]);
                console.log(currentIcons);
            }

        });

    } ,[]);

    
    const getAllItems = function(currentTabs, currentNames, currentIcons) {

        let renderedList = [];

        for (let i = 0; i < currentTabs.length; i++)
        {
            let tempURL = currentTabs[i];
            let tempName = currentNames[i];
            let tempIcon = currentIcons[i];

            renderedList.push({
                id: i,
                title: tempName,
                url: tempURL,
                icon: tempIcon
            });    
        }
        
        console.log(renderedList);
        
        let content = [];
        for (let item of renderedList) {
            content.push(<li key={item.id}><img src={item.icon} width="20" height="20"></img> {item.title}, {item.url}</li>);
            
        }
        
        return content;
    }

    return ( 
        <AppContainer>
                {getAllItems(currentTabs, currentNames, currentIcons)}
        </AppContainer>
    );
}

export default App;