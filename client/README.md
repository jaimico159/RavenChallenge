# Ravn Code Challenge

This project allows you to search GitHub users by login using your own GitHub Graphql Api Token

## Getting Started

These instructions will help you to get a copy of the project up and running on you local machine for testing purposes.



### Prerequisites

For Running this app you need npm, installing Node.js is recommended because npm is distributed with Node.js, [here is a link](https://nodejs.org/en/download/) for installing Node.js.

Also you need to generate a token from the GitHub GraphQL API, this is essential for querying in GitHub.

### Downloading the Zip

For downloading the zip file containing the code, just [follow this link](https://github.com/jaimico159/RavenChallenge) and click Clone or Download, then click Download Zip.

After downloading the Zip File:
1. Decompress the Zip in a folder.
2. Then open Terminal in that folder.

3. Run :

```
cd RavnChallenge
cd client
npm install
npm start
``` 
Running this React App doesn't handle any type of backend, according to the [React Web Page](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) "it just creates a frontend build pipeline, so you can use it with any backend you want".

### Clone

1. Open your Terminal and enter the directory where you would like to copy the repository.
2. Run: 

```
git clone https://github.com/jaimico159/RavenChallenge.git
cd RavnChallenge
cd client
npm install
npm start
``` 
### Replacing the Token

You'll need to generate a token, if you don't have any [follow this link](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) for aditional instruction.

The token is defined in client/src/components/App.js.
Replace :
 ```
const token = 'TOKEN';
``` 
for:
```
const token = 'YOUR_TOKEN';
``` 
## Design

There're 4 components that interact for showing the search result: 

1. User
2. Repo
3. Nav
4. App

The User component queries over GitHub users and retrieves a list of GitHub users, shows an preloader when retrieving the data and an error message if there's a network problem, the data is shown in clickable cards, the query is limited to 100 objects.

The Repo component is similar to User component, this component queries over an specific GitHub user and retrieves a list of his/her repositories, information and the number of Pull Requests of the Repository

The Nav component acts like a parent component, it has a search bar that fires the user search query as its value changes, gives properties to User and Repo for rendering the retreived data, connects the app to GitHub server and provides a client for using this connection. While searching it will show the list of users and on clicking a user it will show the user repositories and its infomation.

The App component shows the Nav component.

##Style

For the project style Materialize designed by Google is used, it is defined in client/public/index.html 


