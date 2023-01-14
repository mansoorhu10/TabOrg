/*global chrome*/

// All Import Statements
import React, { useEffect, useState } from 'react'
import Select from "react-select"
import styled from 'styled-components'

// Custom styling using styled-components!
const AppContainer = styled.div`
  
`

const ListComponentContainer = styled.div`
    border-style: solid;
    border-width: 0.50px;
    border-radius: 25px;
    height: 34px;
    width: 500px;
    justify-content: center;
    &:hover {
        border-width: 1.50px;
    }
`

// Checking the mode as either 'light' or 'dark'
chrome.storage.sync.get(['mode'], function(newMode) {
    console.log("The mode is currently " + newMode.mode);
});


function ListComponent(props) {
    return (
        <br>
            <ListComponentContainer>
                <div>
                    {props.name}
                </div>
            </ListComponentContainer>
        </br>
    )
}


// App function that contains all pieces of data that can change over time due to user input
function App() {

    // All useState variables that store data that cannot be directly modified, only undiretly through the user's changes
    const [currentTabs, setNewTabs] = useState([]);
    const addTabs = (tab) => {
        console.log(tab);
        setNewTabs(currentTabs => currentTabs.concat(tab));
        
        console.log(currentTabs);
    }

    const [currentTabGroup, setNewTabsInGroupCreation] = useState([]);
    const addTabInGroup = (tab) => {
        console.log(tab);
        setNewTabsInGroupCreation(currentTabGroup => currentTabGroup.concat(tab));

        console.log(currentTabGroup);
    }

    const [currentGroups, setNewGroups] = useState([]);
    const addNewGroup = (group) => {
        console.log(group);
        setNewGroups(currentGroups => currentGroups.concat(group));

        console.log(currentGroups);
    }
    

    const [currentColor, setNewColor] = useState({label: "Red", value: "red"});

    const [toggled, setToggled] = useState(false);
    const handleClick = () => {
        if (toggled === false)
        {
            setToggled(true);
        }
        else {
            setToggled(false);
        }
        setDarkMode();
    };

    // Updating the dark mode 
    function setDarkMode()
    {
        document.body.classList.toggle("dark");

        chrome.storage.sync.get(['mode'], function(tempMode) {
            console.log("'mode' is currently set to " + tempMode['mode']);
            if (tempMode['mode'] === "light")
            {
            chrome.storage.sync.set({'mode': 'dark'}, function() {
                console.log("'mode' is updated to 'dark'");
            });
            }
            else if (tempMode['mode'] === "dark")
            {
            chrome.storage.sync.set({'mode': 'light'}, function() {
                console.log("'mode' is updated to 'light'");
            });
            }
        });

    }

    // Adds a tab into the group section by individually updating the correponding useState variables
    const addGroupTabs = (item) => {
        
        addTabInGroup(item);

        const newTabs = [...currentTabs];

        newTabs.splice(item.id, 1);

        setNewTabs(newTabs);

        const tabGroup = [...currentTabGroup];
        tabGroup.push(item);

        chrome.storage.local.set({'currentTabs': newTabs}, function() {
            console.log("'currentTabs' is updated to");
            console.log(newTabs);
        });

        chrome.storage.local.set({'groupCreationTabs': tabGroup}, function() {
            console.log("'groupCreationTabs' is updated to ");
            console.log(tabGroup);
        });
    }

    // Removing a tab from the group section back to the overview of the user's tabs
    const deleteGroupTabs = (item) => {

        addTabs(item);

        const tabGroup = [...currentTabGroup];

        tabGroup.splice(item.id, 1);

        setNewTabsInGroupCreation(tabGroup);

        const newTabs = [...currentTabs];
        newTabs.push(item);

        chrome.storage.local.set({'currentTabs': newTabs}, function() {
            console.log("'currentTabs' is updated to ");
            console.log(newTabs);
        });

        chrome.storage.local.set({'groupCreationTabs': tabGroup}, function() {
            console.log("'groupCreationTabs' is updated to ");
            console.log(tabGroup);
        });

    }

    // Copying a tab's url
    const copyURL = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            alert("Copied the text: " + text);    
        });
        
    }

    // Fetching data using chrome.storage on render of the popup
    useEffect(() => {

        chrome.storage.local.get(['currentTabs'], function(result) {
            console.log("'currentTabs' from storage is: ");
            console.log(result['currentTabs']);
            setNewTabs(result.currentTabs);

        })
        
        chrome.storage.local.get(['groupCreationTabs'], function(result) {
            console.log("'groupCreationTabs' from storage is ");
            console.log(result.groupCreationTabs);

            for (let i = 0; i < result.groupCreationTabs.length; i++)
            {
                addTabInGroup(result['groupCreationTabs'][i]);
            }

            console.log(currentTabGroup);

        });

        chrome.storage.local.get(['groups'], function(result) {
            console.log("'groups' from storage is ");
            console.log(result['groups']);
            setNewGroups(result.groups);

        });

    } ,[]);

    // Style variables used in react
    const textStyle = {
        height: "60px",
        width: "400x",
        fontSize: "12px",
        display: "inline-block",
        position: "relative",
    }

    const urlStyle = {
        width: "365px",
        marginLeft: "45px",
        marginTop: "10px",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }
    
    const iconStyle = {
        marginLeft: "7px",
        marginTop: "10x",
        paddingTop: "6px"
    }

    const buttonStyle = {
        width: "22px", 
        height:"22px", 
        float: "right", 
        zIndex: "0",
        marginTop: "5px"
    }

    const borderStyle = {
        boxShadow: '4px 0px 10px -4px #9E9E9E',
        zIndex: "1",
        height: "34px",
        width: "34px",
        margin: "0",
        position: "absolute",
        top: "0",
        left: "0",
    }

    const alignCenter = {
        marginLeft: "45px",

    }

    const customSelectStyle = {
        menu: (provided, state) => ({
            ...provided,
            width: state.selectProps.width,
            borderBottom: '1px dotted pink',
            color: state.selectProps.menuColor,
            padding: 20,

        }),

        control: (_, { selectProps: { width }}) => ({
            width: width
        }),

        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }

    // Rendering the colour drop down
    const colourDropDown = () => {
        
        const options = [
            {label: "Red", value: "red"},
            {label: "Blue", value: "blue"},
            {label: "Green", value: "green"},
            {label: "Yellow", value: "yellow"},
            {label: "Purple", value: "purple"},
            {label: "Pink", value: "pink"}, 
        ];

        return (
            
            <Select defaultValue={options[0]} theme={(theme) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                    ...theme.colors,
                    primary25: "#BDFFBD",
                    primary: "black"
                }
            })} onChange={handleChange} width="500px" className="react-select" classNamePrefix="react-select" style={customSelectStyle} options={options} />
            
        );
    }

    // Rendering all of the user's tabs
    const getTabItems = function(currentTabs) {
        
        let tabList = [];

        for(let i = 0; i < currentTabs.length; i++){
            tabList.push({
                id: i,
                title: (currentTabs[i]).title,
                url: (currentTabs[i]).url,
                icon: (currentTabs[i]).icon,
            })
        }

        let content = [];
        for (let item of tabList) {
            content.push(
                <p style={{marginTop: "-10px"}}>
                    <ListComponentContainer>
                        <div key={item.id} style={textStyle}>
                            <div style={{paddingLeft:"420px",}}>
                                <input style={buttonStyle} type="image" alt="add button" onClick={() => addGroupTabs(item)} src="icons/add-button-48.png"/>
                                <div style={{marginRight: "28px"}}><input style={buttonStyle} type="image" alt="copy button" onClick={() => copyURL(item.url)} src="icons/copy-button-48.png"/></div>
                            </div>
                            <div style={borderStyle}><img alt="icon" src={item.icon} width="22" height="22" style={iconStyle}></img></div>
                            <div title={item.title} style={urlStyle}>
                                {item.title}
                            </div>
                            
                        </div>
                    </ListComponentContainer>
                </p>
            );    
        }

        return content;
    }

    // Rendering the tabs that are being added into the tab group creation section
    const getGroupItems = function(currentTabGroup) {

        let groupList = [];

        for(let i = 0; i < currentTabGroup.length; i++){
            groupList.push({
                id: i,
                title: (currentTabGroup[i]).title,
                url: (currentTabGroup[i]).url,
                icon: (currentTabGroup[i]).icon,
            })
        }

        let content = [];
        for (let item of groupList) {
            content.push(
                <p style={{marginTop: "-10px",}}>
                    <ListComponentContainer>
                        <div key={item.id} style={textStyle}>
                            <div style={{paddingLeft:"420px",}}>
                                <input onClick={() => {deleteGroupTabs(item)}} style={buttonStyle} type="image" alt="delete-button" src="icons/delete-button-48.png" />
                                <div style={{marginRight: "28px"}}><input style={buttonStyle} type="image" alt="copy button" onClick={() => copyURL(item.url)} src="icons/copy-button-48.png"/></div>
                            </div>
                            <div style={borderStyle}><img alt="icon" src={item.icon} width="22" height="22" style={iconStyle}></img></div>
                            <div title={item.title} style={urlStyle}>
                                {item.title}
                            </div>
                        </div>
                    </ListComponentContainer>
                </p>
            );
        }

        return content;
    }

    // Rendering all of hte tab group buttons
    const getGroups = function(currentGroups) {
        let groups = [];

        for (let i = 0; i < currentGroups.length; i++)
        {
            let tempUrlArr = currentGroups[i].urlArr;
            let tempTitle = currentGroups[i].title;
            let tempColor = currentGroups[i].color;

            groups.push({
                id: i,
                title: tempTitle,
                urlArr: tempUrlArr,
                color: tempColor,
            });
        }

        let content = [];
        for (let item of groups) {

            content.push(
                <p>
                    <div key={item.id} class="groupBtns">
                        <button className={getColor(item.color)} type="button" onClick={() => {createTabs(item.urlArr)}}>{item.title}</button>
                    </div>
                </p>
            );
        }

        return content;
    }

    // Custom css toggle switch
    function Toggle({toggled, onClick}) {
        return (
            <div onClick={onClick} className={`toggle${toggled ? " night": ""}`}>
                <div className="notch">
                    <div className="crater"/>
                    <div className="crater"/>
                </div>
                <div>
                    <div className="shape sm"></div>
                    <div className="shape sm"></div>
                    <div className="shape md"></div>
                    <div className="shape lg"></div>
                </div>
            </div>
        );
    }

    // Determining what colour is being represented in storage
    const getColor = (groupColorIndex) => {
        
        let colorClass = "";
        
        switch(groupColorIndex)
        {
            case "red":
                console.log("The colour is red");
                colorClass = "background-red";
                break;

            case "blue":
                console.log("The colour is blue");
                colorClass = "background-blue";
                break;

            case "yellow":
                console.log("The colour is yellow");
                colorClass = "background-yellow";
                break;

            case "green":
                console.log("The colour is green");
                colorClass = "background-green";
                break;

            case "purple":
                console.log("The colour is purple");
                colorClass = "background-purple";
                break;

            case "pink":
                console.log("The colour is pink");
                colorClass = "background-pink";
                break;

            default:
                console.log("Colour unidentified");
                colorClass = "";
        }

        return colorClass;
    }

    // Adding a tab group into the memory and the useState variables
    const handleSubmit = event => {
        event.preventDefault();

        const groupURLs = [];
        
        for(let i = 0; i < currentTabGroup.length; i++){
            groupURLs.push(currentTabGroup[i].url);
        }

        const groupTitle = document.querySelector('#grpName').value;

        const groupArr = [...currentGroups];

        let groupId = groupArr.length;

        const newGroup = {
            id: groupId,
            title: groupTitle,
            urlArr: groupURLs,
            color: currentColor.value,
        }

        document.querySelector('#grpName').value = "";

        console.log("new group is");
        console.log(newGroup);

        setNewTabsInGroupCreation([]);

        addNewGroup(newGroup);

        groupArr.push(newGroup);

        chrome.storage.local.set({'groups': groupArr}, function() {
            console.log("'groups' has been updated to ");
            console.log(groupArr);
        });

        chrome.storage.local.set({'groupCreationTabs': []}, function() {
            console.log("'groupCreationTabs' has been updated to ");
            console.log([]);
        });

        console.log('form submitted');
    }

    // Adding the selected colour into memory
    const handleChange = (selectedOption) => {
        setNewColor(selectedOption);
        console.log("Current colour is ");
        console.log(selectedOption);
    }

    // Creating a new window with the tabs stored in the tab group
    const createTabs = (urlArr) => {
        chrome.windows.create({'url': urlArr, 'focused': false, 'height': 800, 'width': 1200});
    }

    // Returning what components to display inside the AppContainer while using the functions above to fetch data and update memory
    return ( 
        <AppContainer>
            
            <h1>TabOrg</h1>
            <Toggle toggled={toggled} onClick={handleClick} />

            <hr style={{display: "inline-block", width: "100%"}}/>

            <h2>Your Groups:</h2>
            <div style={alignCenter}>

                <p className="buttonGrid">
                    {getGroups(currentGroups)}
                </p>

            </div>

            <h2>Create a Group:</h2>

            <h3>Your Tabs:</h3>
            <div style={alignCenter}> 

                <p>
                    {getTabItems(currentTabs)}
                </p>
            </div>
            
            <h3>Current Tab Group:</h3>
            <div style={alignCenter}>
                <p style={{marginBottom: "10px"}}>
                    <form onSubmit={handleSubmit} style={{width: "500px",}}>
                        <input type="text" placeholder="Enter Group Name" id="grpName"></input>
                        {colourDropDown()}
                        <button type="submit">Create +</button>
                    </form>
                </p>

                <p>
                    {getGroupItems(currentTabGroup)}
                </p>

            </div>
        </AppContainer>
    );
}

export default App;