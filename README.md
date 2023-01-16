# TabOrg
A Tab Organizer Chrome Extension. Designed to help save google chrome tabs into groups for later use using React. 

## How I worked on this project
My goal was to create a chrome extension with simple functionality that provides a great user exprience.
  * I worked with tasks on a Trello board to keep myself on track.
  * I built the extension from scratch using React, JavaScript, HTML and CSS.
  * I also learned how to use Chrome's tabs and storage API to save and load data and add functionality. The API references can be found here: [Tabs API](https://developer.chrome.com/docs/extensions/reference/tabs/), [Storage API](https://developer.chrome.com/docs/extensions/reference/storage/).
  
## Why I built the project this way
I wanted to learn how to use React and improve the initial version of this extension to include user interface design fundamentals that I learned in academic courses that I took.

## Future Improvements
I had to reduce the scope of the original vision I had for the extension once I realized how much time it would take me to develop it. Once I have enough time to continue working on the website, these are the primary changes and improvements I will make to the extension:

  * Figuring out a way to put the "Create a Tab Group" section of the extension to an external settings page that can be opened in a new tab through a button (I already initially tried to do this, but I couldn't figure out how to do it at the time).
  * Giving the extension more personality through the use of colours and improving the design of the Tab Group Buttons.
  * Improving the organization and readability of the code, particularily creating components in a folder called "components" for functions in this [file](./extension/src/app.js).
  * Adding more functionality such as being able to edit and delete Tab Groups, as well as reorder them in the "Create a Tab Group" section.
  * Re-adding functionality like the "Delete Duplicates" button.
  * Swapping the icons to use the material-ui library for further customization with colours.
  
