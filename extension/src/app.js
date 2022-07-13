/*global chrome*/

// All Import Statements
import React, { useEffect, useState } from 'react'
import Select from "react-select"
import styled from 'styled-components'
import "./style.css";

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

    const [currentNames, setNewNames] = useState([]);
    const addNames = (theName) => {
        setNewNames(currentNames => currentNames.concat(theName));
    }
    
    const [currentIcons, setNewIcons] = useState([]);
    const addIcons = (theIcon) => {
        setNewIcons(currentIcons => currentIcons.concat(theIcon));
    }

    const [currentTabGroup, setNewTabInGroup] = useState([]);
    const addTabInGroup = (tab) => {
        console.log(tab);
        setNewTabInGroup(currentTabGroup => currentTabGroup.concat(tab));

        console.log(currentTabGroup);
    }

    const [currentNameGroup, setNewNameInGroup] = useState([]);
    const addNameInGroup = (theName) => {
        console.log(theName);
        setNewNameInGroup(currentNameGroup => currentNameGroup.concat(theName));
    }

    const[currentIconGroup, setNewIconInGroup] = useState([]);
    const addIconInGroup = (theIcon) => {
        console.log(theIcon);
        setNewIconInGroup(currentIconGroup => currentIconGroup.concat(theIcon));
    }

    const [currentGroups, setNewGroups] = useState([]);
    const addNewGroup = (group) => {
        console.log(group);
        setNewGroups(currentGroups => currentGroups.concat(group));
    }

    const [currentGroupTitle, setNewGroupTitle] = useState([]);
    const addNewGroupTitle = (groupName) => {
        console.log(groupName);
        setNewGroupTitle(currentGroupTitle => currentGroupTitle.concat(groupName));
    }

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

    const [currentGroupColors, setNewGroupColors] = useState([]);
    const addNewGroupColor= (color) => {
        console.log(color);
        setNewGroupColors(currentGroupColors => currentGroupColors.concat(color));
    }

    // Updating the dark mode 
    function setDarkMode()
    {
        document.body.classList.toggle("dark");

        chrome.storage.sync.get(['mode'], function(tempMode) {
            console.log("'mode' is currently set to " + tempMode['mode']);
            if (tempMode['mode'] == "light")
            {
            chrome.storage.sync.set({'mode': 'dark'}, function() {
                console.log("'mode' is updated to 'dark'");
            });
            }
            else if (tempMode['mode'] == "dark")
            {
            chrome.storage.sync.set({'mode': 'light'}, function() {
                console.log("'mode' is updated to 'light'");
            });
            }
        });

    }

    // Adds a tab into the group section by individually updating the correponding useState variables
    const addGroupTabs = (title, url, icon, index) => {
        
        addTabInGroup(url);
        addNameInGroup(title);
        addIconInGroup(icon);

        const newTabs = [...currentTabs];
        const newNames = [...currentNames];
        const newIcons = [...currentIcons];

        console.log(index);

        newTabs.splice(index, 1);
        newNames.splice(index, 1);
        newIcons.splice(index, 1);

        setNewTabs(newTabs);
        setNewNames(newNames);
        setNewIcons(newIcons);

        console.log(newTabs);

        const tabGroup = [...currentTabGroup];
        tabGroup.push(url);

        const nameGroup = [...currentNameGroup];
        nameGroup.push(title);

        const iconGroup = [...currentIconGroup];
        iconGroup.push(icon);


        chrome.storage.sync.set({'currentURL': newTabs}, function() {
            console.log("currentURL is set to ");
            console.log(newTabs);
        });

        chrome.storage.sync.set({'groupURLs': tabGroup}, function() {
            console.log("groupURL is updated to ");
            console.log(tabGroup);
        });

        chrome.storage.sync.set({'names': newNames}, function() {
            console.log("names is updated to ");
            console.log(newNames);
        });

        chrome.storage.sync.set({'groupNames': nameGroup}, function() {
            console.log("groupNames is updated to ");
            console.log(nameGroup);
        });

        chrome.storage.sync.set({'icons': newIcons}, function() {
            console.log("icons is updated to ");
            console.log(newIcons);
        });

        chrome.storage.sync.set({'groupIcons': iconGroup}, function() {
            console.log("groupIcons is updated to ");
            console.log(iconGroup);
        });

    }

    // Removing a tab from the group section back to the overview of the user's tabs
    const deleteGroupTabs = (title, url, icon, index) => {

        addTabs(url);
        addNames(title);
        addIcons(icon);

        const tabGroup = [...currentTabGroup];
        const nameGroup = [...currentNameGroup];
        const iconGroup = [...currentIconGroup];
        
        console.log(index);

        tabGroup.splice(index, 1);
        nameGroup.splice(index, 1);
        iconGroup.splice(index, 1);

        setNewTabInGroup(tabGroup);
        setNewNameInGroup(nameGroup);
        setNewIconInGroup(iconGroup);

        const newTabs = [...currentTabs];
        newTabs.push(url);

        const newNames = [...currentNames];
        newNames.push(title);

        const newIcons = [...currentIcons];
        newIcons.push(icon);


        chrome.storage.sync.set({'currentURL': newTabs}, function() {
            console.log("currentURL is set to ");
            console.log(newTabs);
        });

        chrome.storage.sync.set({'groupURLs': tabGroup}, function() {
            console.log("groupURL is updated to ");
            console.log(tabGroup);
        });

        chrome.storage.sync.set({'names': newNames}, function() {
            console.log("names is updated to ");
            console.log(newNames);
        });

        chrome.storage.sync.set({'groupNames': nameGroup}, function() {
            console.log("groupNames is updated to ");
            console.log(nameGroup);
        });

        chrome.storage.sync.set({'icons': newIcons}, function() {
            console.log("icons is updated to ");
            console.log(newIcons);
        });

        chrome.storage.sync.set({'groupIcons': iconGroup}, function() {
            console.log("groupIcons is updated to ");
            console.log(iconGroup);
        });

    }

    // Copying a tab's url
    const copyURL = (text) => {
        navigator.clipboard.writeText(text).then(function() {
            alert("Copied the text: " + text);    
        });
        
    }

    //Fetching data using chrome.storage on render of the popup
    useEffect(() => {
        chrome.storage.sync.get(['currentURL'], function(result) {
            console.log('currentURL from storage is');
            console.log(result['currentURL']);

            setNewTabs(result.currentURL);
        });

        
        chrome.storage.sync.get(['names'], function(result) {
            console.log("'names' from storage is");
            console.log(result.names);

            setNewNames(result.names);
        });

        chrome.storage.sync.get(['icons'], function(result) {
            console.log("'icons' from storage is ");
            console.log(result.icons);

            setNewIcons(result.icons);

        });

        
        chrome.storage.sync.get(['groupURLs'], function(result) {
            console.log("'groupURLs' from storage is ");
            console.log(result.groupURLs);

            for (let i = 0; i < result.groupURLs.length; i++)
            {
                addTabInGroup(result['groupURLs'][i]);
                console.log(currentTabGroup);
            }

        });

        chrome.storage.sync.get(['groupNames'], function(result) {
            console.log("'groupNames' from storage is ");
            console.log(result.groupNames);

            for (let i = 0; i < result.groupNames.length; i++)
            {
                addNameInGroup(result['groupNames'][i]);
                console.log(currentNameGroup);
            }

        });

        chrome.storage.sync.get(['groupIcons'], function(result) {
            console.log("'groupIcons' from storage is ");
            console.log(result.groupIcons);

            for (let i = 0; i < result.groupIcons.length; i++)
            {
                addIconInGroup(result['groupIcons'][i]);
                console.log(currentIconGroup);
            }

        });

        chrome.storage.sync.get(['groups'], function(result) {
            console.log("'groups' from storage is ");
            console.log(result.groups);

            for (let i = 0; i < result.groups.length; i++)
            {
                addNewGroup(result['groups'][i]);
                console.log(currentGroups);
            }

        });

        chrome.storage.sync.get(['groupTitles'], function(result) {
            console.log("'groupTitles' from storage is ");
            console.log(result.groupTitles);

            for (let i = 0; i < result.groupTitles.length; i++)
            {
                addNewGroupTitle(result['groupTitles'][i]);
                console.log(currentGroupTitle);
            }
        });

        chrome.storage.sync.get(['groupColors'], function(result) {
            console.log("'groupColors' from storage is ");
            console.log(result.groupColors);

            for (let i = 0; i < result.groupColors.length; i++)
            {
                addNewGroupColor(result['groupColors'][i]);
                console.log(result.groupColors);
            }
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
            content.push(
                <p style={{marginTop: "-10px"}}>
                    <ListComponentContainer>
                        <div key={item.id} style={textStyle}>
                            <div style={{paddingLeft:"420px",}}>
                                <input style={buttonStyle} type="image" alt="add button" onClick={() => addGroupTabs(item.title, item.url, item.icon, item.id)} src="icons/add-button-48.png"/>
                                <div style={{marginRight: "28px"}}><input style={buttonStyle} type="image" alt="copy button" onClick={() => copyURL(item.url)} src="icons/copy-button-48.png"/></div>
                            </div>
                            <div style={borderStyle}><img src={item.icon} width="22" height="22" style={iconStyle}></img></div>
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
    const getGroupItems = function(currentTabGroup, currentNameGroup, currentIconGroup) {

        let groupList = [];

        for (let i = 0; i < currentTabGroup.length; i++)
        {
            let tempURL = currentTabGroup[i];
            let tempName = currentNameGroup[i];
            let tempIcon = currentIconGroup[i];

            groupList.push({
                id: i,
                title: tempName,
                url: tempURL,
                icon: tempIcon
            });
        }

        console.log(groupList);

        let content = [];
        for (let item of groupList) {
            content.push(
                <p style={{marginTop: "-10px",}}>
                    <ListComponentContainer>
                        <div key={item.id} style={textStyle}>
                            <div style={{paddingLeft:"420px",}}>
                                <input onClick={() => {deleteGroupTabs(item.title, item.url, item.icon, item.id)}} style={buttonStyle} type="image" alt="delete-button" src="icons/delete-button-48.png" />
                                <div style={{marginRight: "28px"}}><input style={buttonStyle} type="image" alt="copy button" onClick={() => copyURL(item.url)} src="icons/copy-button-48.png"/></div>
                            </div>
                            <div style={borderStyle}><img src={item.icon} width="22" height="22" style={iconStyle}></img></div>
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
    const getGroups = function(currentGroups, currentGroupTitle, currentGroupColors) {
        let groups = [];

        for (let i = 0; i < currentGroupTitle.length; i++)
        {
            let tempUrlArr = currentGroups[i];
            let tempTitle = currentGroupTitle[i];
            let tempColor = currentGroupColors[i].value;

            groups.push({
                id: i,
                name: tempTitle,
                urlArr: tempUrlArr,
                color: tempColor
            });
        }

        console.log(groups);

        let content = [];
        let currentColor = "";
        for (let item of groups) {
            currentColor = getColor(item.color);

            content.push(
                <p>
                    <div key={item.id} class="groupBtns">
                        <button className={currentColor} type="button" onClick={() => {createTabs(item.urlArr)}}>{item.name}</button>
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

        console.log(document.querySelector('#grpName').value);

        const groupURLs = [currentTabGroup];
        const groupTitle = document.querySelector('#grpName').value;

        document.querySelector('#grpName').value = "";

        addNewGroup(groupURLs);
        addNewGroupTitle(groupTitle);

        setNewTabInGroup([]);
        setNewNameInGroup([]);
        setNewIconInGroup([]);

        chrome.storage.sync.set({'groupURLs': []}, function() {
            console.log("'groupURLS' is updated to '[]'");
        });
        chrome.storage.sync.set({'groupNames': []}, function() {
            console.log("'groupNames' is updated to '[]'");
        });
        chrome.storage.sync.set({'groupIcons': []}, function() {
            console.log("groupIcons is updated to '[]'");
        });
        
        const groupsNow = [...currentGroups];
        const groupTitlesNow = [...currentGroupTitle]

        groupsNow.push(groupURLs);
        groupTitlesNow.push(groupTitle);

        chrome.storage.sync.set({'groups': groupsNow}, function() {
            console.log("groups has been updated to ");
            console.log(groupsNow);
        });

        chrome.storage.sync.set({'groupTitles': groupTitlesNow}, function() {
            console.log("groupTitles has been updated to ");
            console.log(groupTitlesNow);
        });

        console.log('form submitted');
    }

    // Adding the selected colour into memory
    const handleChange = (selectedOption) => {
        addNewGroupColor(selectedOption);
        const newColors = [...currentGroupColors];

        newColors.push(selectedOption);
        chrome.storage.sync.set({'groupColors': newColors}, function() {
            console.log("groupColors has been updated to ");
            console.log(newColors);
        });

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

                <p>
                    {getGroups(currentGroups, currentGroupTitle, currentGroupColors)}
                </p>

            </div>

            <h2>Your Tabs:</h2>
            <div style={alignCenter}> 

                <p>
                    {getAllItems(currentTabs, currentNames, currentIcons)}
                </p>
            </div>
            
            <h2>Create a Group:</h2>
            <div style={alignCenter}>
                <p style={{marginBottom: "10px"}}>
                    <form onSubmit={handleSubmit} style={{width: "500px",}}>
                        <input type="text" placeholder="Enter Group Name" id="grpName"></input>
                        {colourDropDown()}
                        <button type="submit">Create +</button>
                    </form>
                </p>

                <p>
                    {getGroupItems(currentTabGroup, currentNameGroup, currentIconGroup)}
                </p>

            </div>
        </AppContainer>
    );
}

export default App;