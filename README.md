# Overview
Welcome to the repository.  It includes a starter HTML page, a JavaScript file, and sample JSON data to help you get started. The development setup utilizes the lightweight web server lite-server and incorporates the user-friendly CSS library - Semantic UI, Bootstrap

# Setup
## Prerequisites
I'd like to point out that the following software needs to be installed.
- Latest Node.js from https://nodejs.org/en/
- VS Code from https://code.visualstudio.com/
- git from https://git-scm.com/downloads
- Chrome browser is preferred but Mozilla Firefox should also work.

## Configure Project
- On a command prompt, clone the repository using the command `git clone https://github.com/harish634/Final-Project.git` in a directory of your choice. It will create a directory `Final-Project` with the contents of this repository. 
- In VS Code, use `File > Open Folder` (Windows) or `File > Open` (Mac) to open the `Final-Project` folder.
- Open the integrated terminal window in VS Code and run the command `npm install`. This will download the dependencies into the `node_modules` folder.

## Running the Project
- Execute the command `npm start` on the terminal window. This will start the `lite-server` on port 3000 and open a new tab on your default browser to show the project home - index.html. 
- The server automatically watches for changes in any HTML, JavaScript, and CSS files and automatically refreshes the browser tab. This allows you a seamless development experience.

## Instructions for Using the Movies App
# Select Movie Language
1. Click on the radio button to choose your preferred movie language.
2. The movie list will be updated to display movies in the selected language.
# Choose Decade
1. After selecting the language, choose a decade from the available options.
2. The movie list will be filtered to include only those from the selected decade.
# Select Genre
1. Explore the "Select Genres" section with checkboxes representing different movie genres.
2. Choose the genres you're interested in.
3. The movie list will dynamically update based on your genre selections.
# Search Box
1. Using the Search box, we can search movies based on the Movie names or Cast names.
2. It will give Suggestions based on our input search.
# Select a movie(Drop-Down)
1. To the movie details and cast details, we can select from the dropdown
2. Popup will come with all the movie and cast details. 


# Understanding Starter Code & Data Files
- `index.html`
  - refers to `radio.js`
  - refers to `demo.js`
  - refers to `styles.css` - You can add your styles here.
  - refers to `https://getbootstrap.com/` - for styling.
  - refers to `semantic-ui` CSS from a CDN. This is really not required for this training, but, having a nice UI feels good. Also, learning some standard CSS library is always useful. This will be useful in picking up other CSS libraries as well. 



# Acknowledgements
- Movies data sourced from https://www.kaggle.com/datasets/rounakbanik/the-movies-dataset/data. The data has been further massaged and simplified for use in the learning environment. A smaller volume of data is used. 
- Languages, Countries, and Genres data sourced from https://www.themoviedb.org. 
