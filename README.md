# Front-end for CuisineConnoisseurs

Fully responsive front end for a food rating web app built with ReactJS. View the back-end api [here](https://github.com/kmatic/cuisine-connoisseurs-api)

Users can create accounts and rate restaurants they have been to recently. They can also interact with others in the community by following and interacting with their posts.

## Demo

[Demo the web app](https://cuisineconnoisseurs.onrender.com)

https://user-images.githubusercontent.com/3086068/212775794-a9db77c2-67e3-454d-b5e1-96693381e074.mp4

## Built with

- ReactJS
- [React Router](https://reactrouter.com/en/main/start/overview)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Stars Component](https://www.npmjs.com/package/react-rating-stars-component)
- [React Spinners](https://www.npmjs.com/package/react-spinners)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [Tailwind CSS](https://tailwindcss.com/) (CSS)

## Reflection

React was chosen to create a componentized application architecture. The front-end uses fetch to connect to the RESTful API implemented on the back-end using Node & express. This is my first time implementing the use of custom hooks in my react code and noticing the benefits it provides in terms of clean-code and not needing to re-write the same functions for fetching data. In addition to this, I really focused on making sure the web-app was fully responsive and gained a lot of knowledge in designing web-apps for this purpose. Tailwind CSS was the CSS framework that was chosen for this project. Its quite easy to pick-up and start designing components with.

## Running Locally

### Running the project

1. Clone the repo

```
git clone https://github.com/kmatic/cuisine-connoisseurs-client
```

2. Navigate to folder and install npm packages

```
npm install
```

3. Run the local server: 

```
npm start
```

Local server will be hosted at http:localhost:3000 (see the back-end api repo for instructions on how to host the api for full web app functionality)
