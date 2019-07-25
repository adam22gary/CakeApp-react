# Cake Calculator

---

## Collaborators

- [Antonella](https://github.com/Antoonella)
- [Adam](https://github.com/adam22gary)
- [Tyson](https://github.com/TysonEketone)

## Project Links

- [Live link](http://mern-project-22.s3-website-ap-southeast-2.amazonaws.com/login)

- [Express Back End](https://github.com/adam22gary/CakeApp-express)
- [React Front End](https://github.com/adam22gary/CakeApp-react)

---

## Purpose

The purpose of this app is to provide a solution to Ornella's Cakes business with use of technology. The app allows our client to provide customers more accurate pricing for their cake orders based on the number of people, ingredient costs and profit margins. By utilising this app, our client is now able to move away from pen and paper orders and be more organised with the order management and have more time preparing orders than writing it down.

---

## Functionality/Features

#### Security

- Provides a secure registration and login feature with password encryption
- Authorisation and validation functions have been incorporated to ensure the client is able to navigate through the site without their data being comprimised.

#### Dashboard

- This is the home page where the user is able to select one of four options, create an order, view their current orders, create or view their cake recipes, view or add ingredients.

#### Ingredients

- In this feature, our client is able to add, view, edit and/or delete ingredients.
- They are able to enter in the quantity and measurements of their unit costs and add the pricing for each ingredient.

#### Base Cakes

- Displays list of Base Cake recipes the clients bakes. 
- Shows a detailed summary of each base cake recipe, including the total ingredient costing.
- Our client is able to a add, edit and/or delete each base cake recipe

#### Create New Orders

- Our client is able to create or delete orders. 
- After base recipe is selected for the order, the order from calculates their quote based on the number people they are baking for, total costs of ingredients and also includes the profit margin. 

#### Orders and History

- Displays the current list of orders by showing current orders and past orders. 

#### Responsive Design

- The App has integrated responsive design into the app, giving the client ease of use on their mobile or desktop devices.

---

### App Screenshots

#### Login Page

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/login_page.png)

#### Main Dashboard

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/main_dashboard.png)

#### Create Order

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/create_order.png)

#### Orders History

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/oodesign-Diagram.png)

#### Ingredients Page

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/ingredients_list.png)

#### Base Cake Recipes

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/basecakes_list.png)

---

## Tech Stack

#### Application and Data

HTML5 | CSS3 | JavaScript | React | MongoDB/Mongo Atlas | Express | Node JS | Amazon S3 | Heroku

#### DevOps

GitHub | Cypress

#### Business Tools

Cacoo | Balsamiq Mockups 3 | Slack | Trello | Google Docs

---

## How to use

In order to get started, clone both the Express repo and the react repo or you can fork both repos, see available links at the top.

Once both have been cloned to your local device, in your terminal, run npm install inside the root directory for each app to install all dependencies:

```
npm install
```

After you have run this command, open both applications in your code base and set up your environment variables in a .env files. An example .env file has been included to for reference as well as the code below:

.env React Front End:

```
REACT_APP_API_URL=http://localhost:3005
```

.env Express Back End:

```
DB_HOST=mongodb://localhost/[database-name]
PORT=3005
JWT_SECRET=
```

Make sure both the port on your Express app and React_app_api_url are the same as this is what connects them together.

Once you have completed these steps. You are now able to run the app in development:

React:

```
npm start
```

Express:

```
npm run dev server
```

---

## Design documentation

### Design process

There were four main steps we took when designing the app:

(1) We met with the client to discuss the overall direction of the project by understanding their current problem and how the app will be able to improve their business. By defining the client requirements for the project, we were able to put their concerns as user stories and what features will be needed to meet those requirements.
(2) We then mapped out how the features will be connected together by drawing up a User Journey diagram and design wireframes for both desktop and mobile.
(3) From here, we translated the wireframes into our Object Relationship Diagram, allowing us to have a visual look into our database structure and how every will be connected.
(4) Once all this had been completed, we were then able to design and map our routes for the project according to the data flow structure.

#### User Stories

- As a user I want to a way to create my orders using technology, so that I don't need to use pen and paper any longer.
- As a user I want to be able to save all my cake recipes on the app, so that will be easier to create new orders.
- As a user I want to be able to add new base cake recipes, so that I can have all my recipes available online.
- As a user I want to be able to edit or delete ingredients, so that I can change the recipe to fit special customer requests.
- As a user I want to have my base cake recipe ingredients listed, so that I know what ingredients are needed for each order.
- As a user I want a way to view all my current orders so that I know how many cakes I need to bake.
- As a user I want to be able to delete my current orders, based on the customer request.
- As a user I want to be able to add the price for each ingredient, so that it is easier to calculate.
- As a user I want a way to see the total order price so that I can give a quote to my customers.

### User Journey

![User Journey](https://github.com/adam22gary/CakeApp-react/blob/master/docs/user_journey_diagram.png)

### Wireframes

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/wireframe-1.png)

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/wireframe-2.png)

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/wireframe-4.png)

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/wireframe-5.png)

See all wireframes in master/docs folder.

### Object Relational Diagram

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/object-relational-Diagram.png)

### Data Flow Diagram

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/data-flow-diagram.png)

### OO Diagram

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/oodesign-Diagram.png)

---

## Project plan

### Client Side

After meeting with the client we listed down all his requirements, evaluated those requirements with the time we had in hand. We streamlined the requirements and communicated with the client on his final approval.

We designed wireframes based on the client requirements, and sent wireframe for his approval and once approved, we set up a trello board.

We evaluated the strengths and weaknesses of each team member, their interests when it came to the work division. Our focus was to divide the work in a way that each team member gets to exposure of all the features and functions of the website.

We set up tasks in the trello board and created repository in GitHub for front and back end. We updated trello board on our way to the development of the project.

Project duration was for the 2 weeks and three days
Project Start Date: 8/07/19
Project End Date: 25/07/19

### Client Meetings

#### Date Time Description

8th July 3:30 PM
Confirmed the agreement with the client. The client shared her current problem/situation and what features she would like on her App.

10th July 12:00 PM
Spoke with client on the structure of the App and showed the designs e.g wireframes. Client was happy with the initial design structure. We also confirmed the color theme.

18th July 11:00 AM
Showed the client a prototype with full functionality of the app and asked if her needs anything to be improved.

20th July 12:30 PM
Spoke to the client on setting up account on AWS, Heroku/MongoDB Atlas.

24 July 7:00 PM
Showed the client the final product and sent her link of AWS where the project was deployed. We also walked them through the website and explained the App functionality.

25 July 1:00 PM
Confirmed sign off on project and survey 

### Project Sprints

#### First Sprint

Mon 8 - Sun 14

- Meeting with the client
- Understand the problem and provide a solution
- Set up a trello board & assign roles
- Mockup wireframes
- Design Object Relational Diagram
- Data Flow Diagram
- OO design diagram
- Workflow Diagram for User Journey
- Create Express & React Apps
- Setup Database Schema & Models
- Setup Controllers & Routes
- Create Login and Registration Feature

#### Second Sprint

Mon 15 - 21 Sun

- Build the functionality for Ingredients Pages (Express & React)
- Build the functionality for Cake Pages (Express & React)
- Build the functionality for Orders Pages ( Express & React)
- Validations & Error handling
- Implement Styling on working pages using Semantic UI

#### Third Sprint

Mon 22 - 24 Wed

- End to End testing
- Work on the Short Answer Questions
- Setup Deployment on AWS, Herouku/Mongo Atlas
- Fix bugs and errors after tests
- Gather all documentation for README.md
- Finish Short Answer Questions
- Finish README.md
- Write presentation
- Prepare to submit

### Client Relations

We kept our client updated on the progress made after completion of the sprints of the project, was asked to review the App and give us feedback, discuss with her on progress and plans for the next few days to come

Following were our steps on this regard:

1. Plan information gathering activities to determine project requirements, constraints and risks
2. Record interactions with your client in a diary format
3. Develop project charter, including preliminary statement of project scope and obtain sign-off
4. Prepare project work breakdown and schedule
5. Allocate roles and responsibilities to team members, based on project solution requirements
6. Monitor each other’s assigned work
7. Reassess ongoing project scope changes, risks and issues
8. Manage system testing and hand over activities. Prepare maintenance or support plans for client
9. As a team, conduct post project review

### Screenshots of Trello board

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/trello_1.png)

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/trello_2.png)

### Screenshots for Testing

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/test_screenshot1.png.png)

![N|Solid](https://github.com/adam22gary/CakeApp-react/blob/master/docs/test_screenshot2.png)

---

## Short Answer Questions

### 1. What are the most important aspects of quality software?

Software quality can be based on 8 important aspects: flexibility, efficiency, scalability, maintainability, security, testability, usability and accessibility.

Software should have the flexibility to add, remove and update functionality without damaging any current systems in place. By incorporating code efficiency and testing during the early stages of the development, this will allow developers to maintain and scale software more effectively and enhance the performance and response time of the software while minimizing bugs or errors in the user’s experience that may arise.

Quality software should also be usable across as many platforms possible should be usable to all types of users including those with disabilities.

Lastly, data security measurements should be in place to ensure there are no unauthorized access points available for those who have malicious intentions and ensure user information is being protected.  

By combining these 8 aspects as guideline ensure the standards of quality software is being met.

### 2. What libraries are being used in the app and why?

The list below outlines the libraries that were used and what their purposes were in the development of this project. These libraries were specifically chosen based on our current coding knowledge and understanding of their use, and They also allowed us develop the app faster and more efficiently.

#### Front-End Development

1. React - A JS library for building user interfaces
2. Semantic UI - A JavaScript CSS framework
3. ReactDOM - Provides DOM-specific methods that is being used at the top level of our application
4. React-router-dom - A routing library for React
5. Redux - Storing state
6. Redux Forms - Manages state in redux
7. Cypress - for testing

#### Back-End Development

1. Node JS
2. Express
3. Celebrate - for email and password validation
4. Authentication
5. Passport, Passport local, passport-local-mongoose and passport-jwt strategies - for authentication
6. JWT for authentication
7. MongoDB/Mongoose

### 3.A team is about to engage in a project, developing a website for a small business. What knowledge and skills would they need in order to develop the project?

As a team, members would need:

- Understanding of the clients current problem and how it can be solved with the use of technology
- Programming language knowledge and how they can develop the project using that knowledge
- Sufficient planning skills and knowledge for agile methodology and how to incorporate it into their project
- Able to identify the key issues when they arise and how to solve them
- Understanding best coding practices and principles
- Skills or knowledge in automated testing
- Ability to communicate effectively with other team members
- Knowledge in how to find resources to sue for the app if needed

### 4. Within your own project what knowledge or skills were required to complete your project, and overcome challenges?

Within our project we used the following knowledge and skills:

#### Communication

Consistent Communication played crucial role in the completion of our project. Due to our group having work commitments outside the project and always working late, we relied heavily on communication services such as slack or using our own personal mobiles. This way, we were able to instantly inform each other on what we were working on at all times and what was needed to be completed.

#### Task Delegation

In order to complete the project, we delegated tasks based on current coding knowledge and interests. Being a group of 3 members, we had one developer focus purely on front-end development while the remaining two members worked on both back-end and front-end development. This worked well as each tasks were clear and did not overlap each other.

### 5. Evaluate how effective your knowledge and skills were this project, using examples, and suggest changes or improvements for future projects of a similar nature?

As a group, we felt we had rushed the planning stage of our project which led to problems arising when sending and retrieving information to MongoDB.

For example, when a new base cake recipe was created, each ingredient id selected was then stored inside an array list. This created issues when retrieving the data and so to overcome this challenge we changed the array data type into an object.

Over all, our knowledge and communication skills were crucial to the development of the project and allowed us to meet the deadline.
