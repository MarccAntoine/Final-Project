# <span style="color: #ECC49C"> FoodFlow (Final Project) - Marc-Antoine Tremblay </span>

This website was created as my 5th and last project in the Concordia Bootcamp. The goal of the project is to showcase my web development skills using all notions learned during the course. I am using the following languages and librairies to build this project; HTML, CSS, Javascript, React, NodeJs and MongoDb. This project originaly started with a white page and gradually transformed into a full website containing multiple pages, a server and a database. 

## ✏️ The Front End

I built the user-interface and experience using Figma and multiple online ressources for fonts and colors such as Adobe Color and Google Fonts. I kept a simple and minimal design to make the experience easy and simple to navigate. 

The website has been built keeping accessibility in mind, it is possible to navigate through keyboard navigation using the Tab key and, sometimes Arrow up and Arrow down to select elements in a list. All inputs have labels accessible to screen-readers and aria-labels are used on logo buttons. 

I built a complete front-end containing multiple pages with the React-Router-dom from React. Additional React hooks were used to make the website interactive and efficient like useState, useEffect, useContext and useNavigate. An example of the use of the useContext hook use was to make the user's information, particulary his stocks, available through the whole app while reducing the time and efforts to access those frequently used informations.

 ## 👤 Authentification

The authentification process is done with Auth0. I decided to use that service for authentification to ensure the most secure process for users and to have functions like password reset easily available. I integrated the Auth0 tools to my website and also connected it to my database.

  ## 🥄 Spoonacular API

I chose to integrate the spoonacular API to give users more options when it comes to recipes and an easy way to add them to their recipe book. I make two calls to this API: Recipe by ingredients and Detailed instructions. The first call is used to send the ingredients the user wants to use and receive recipes that use those. Then i use the reecipe Id to call the API and get the instructions. I transform the data to the same types of arrays im using on the database and users can then add it to theirs.

 ## 🖥️ The Back End

I built the back-end server using NodeJs and Express. I have around ten possible calls with the get, post and delete methods. I am also using the REST API principles to make the server precise, concise and consistent.

 ## 🗄️ Database

I built my database using mongoDb. I have multiple collections and documents to make it easy to find users, and their data. I have a collection of "kitchens" containing an array of the authorized users, their stocks, their recipe book containing only the recipe ids and two unique ids to connect them to their grocery list and planner. Then I have multiple other collections: UsersData, Planners, Recipes, Grocery Lists and Invitations. They are all interconnected with id's. 

 ## 🔜 Future of my project

There are some functionnalities and parts of the website i would have liked to build but did not have enough time during the last two weeks. In the future, when i will get back to this project to give it its final touches, I would like to complete the "blog" section. I want users to be able to make some of their recipes public and have them on that section for all to get inspiration. Then they can all add the recipe to their own account by clicking on a button. I would also want to add some functionnalities to the already present sections, particulary the recipe one. I would add the possibility to delete / edit recipes, search for recipes on the API by name, and even, as an ultimate goal, copy and paste recipes from other websites and process them for the user to separate all steps and ingredients.