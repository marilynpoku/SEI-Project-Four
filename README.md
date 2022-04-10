
![alt text](https://i.imgur.com/lzVI3d8.png)

# General Assembly: Software Engineering Immersive

## Otisx

https://otisx.herokuapp.com/

### Overview

My final project at GA. The backend was built using Python, Django and PostgreSQL and React for the frontend. The app was created to resemble a sneaker blog site for the latest sneaker drops and articles posts. Users can view the latest sneaker drops, view articles and create their own articles. The app is intended for mobile use. 

### Project members 

Mehtaab Masood - https://github.com/mmay95 

### Site screenshots 

#### Homepage

Users can see two random articles on the homepage and the top 10 new product releases which are filtered by the release date. 

 ![alt text](https://i.imgur.com/wpijGpw.jpg)
 

#### All products page

Users can view all products and filter by the name and brand of the product.

 ![alt text](https://i.imgur.com/2ZFN0lS.jpg)
 

#### Single Product Page

Users can post and delete a 
review when logged in. The write a review prompts the user to log in if logged out. The ecommerce aspect of the website is not finalised. At present users can add a product 
to the basket which will update the number 
of items in the basket. The go to basket button does not work and is something I plan to incorporate in my side project after the course.

 ![alt text](https://i.imgur.com/Tryu0bj.jpg)

#### Single Article Page

Users can post comments.

![alt text](https://i.imgur.com/IWvWOz4.jpg)

### Project Brief

- Build a full-stack application by making your own backend and your own front-end
- Use a Python Django API using Django REST Framework to serve your data from a Postgres database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Be deployed online so it's publicly accessible
- Project to be complted in one week

### Technologies used

- React
- Python 
- Django
- PostgreSQL
- SASS
- Axios
- TablePlus
- Insomnia
- Git/GitHub

### Approach taken 

#### Planning

We started the project by brainstorming ideas and planning our relationships, models, reviewing similar apps such as Adidas, Nike Snkrs and creating a to-do list on Trello.

#### Wireframe

The wireframe was designed using Balsamiq.

![alt text](https://i.imgur.com/PuF8CYW.jpg)

#### Relationships

We planned our different relationships using quick base diagrams. Our app includes a few one to many relationships. For example the products model has a one to many relationship with the product comments whereby a single product could have more than one comment.

![alt text](https://i.imgur.com/RyLdpKv.jpg)

#### Trello board 

We used trello to keep track of our tasks during the project.

![alt text](https://i.imgur.com/0D8aBv1.jpg)

#### Backend 

The final module which covered Python was very intense and fast paced. Both Mehtaab and I wanted to consolidate our knowledge on Python and see the overall picture of the backend functionality. So we decided to code the backend together using our notes from class with one person screen sharing. 

We started building our products app working on the models, serializers, views and urls to create a SQL database with RESTful features. We spent the most time on this app ensuring we both understood how everything linked together before creating the other apps for our application. We used TablePlus to visualise the PostgreSQL database and insomnia to test our requests and relationships. The products, articles, brands and user models were the main models for our app. 

#### Frontend 

We decided to split the frontend components of the webpage

I took ownership of the following:

- Homepage 
- All products page 
- Single product page

A lot of the functionality on these pages are areas I had worked on during project three such as generating random items from an array within a while loop or using the slice method to get a set number of items and working with carousels. These have been discussed in depth in my ReadMes for project three. If I were to redo this project I would definitely have prioritised ecommerce as the core functionality of the app. This would have given me the opportunity to work on something new and complete the basket functionality using local storage and the likes functionality. At present, local storage keeps track of the number of items in your basket, but when the user goes to another page. The items in the basket are set back to nill.

#### Featured code - Review functionality - callback function

![alt text](https://i.imgur.com/MNuleAm.jpg)

I created a separate component for the review form and imported this on the single product page. When testing out the post review functionality I noticed the review did not appear on the page until the page was refreshed. I used TablePlus to confirm that the axios request was successful. 

To solve this problem I wrapped the getData async function with a useCallback rather than a useEffect. This allowed me to invoke the getData function within a useEffect that will check for 
updates on the getData array. 

I passed down refreshData as prop to call the getData function once the user had posted a review.

#### Styling 

Both Metaab and I really liked the UI design of both the Adidas Confirmed and Nike SNKRS app and used this as a template/inspiration for our app.

We used a combination of Chakra, React bootstrap and SASS for the styling and settled on a monochrome colour palette consisting of white, greys and black for the app.

![alt text](https://i.imgur.com/BY6I54I.jpg)

### Challenges 

- Working with a new language that we had just learnt near the end of the course was very challenging particularly because I felt I still needed more time to get my head around Python before working on backend
- Getting the comments to show on the page when they were posted as discussed above
- Working with serializers and populated serializers
- Populating our models with the contents of the owner field rather than just the primary key of the owner 

### Bugs 

- The like functionality only displays the number of likes and does not allow used to add or delete a like themselves
- The basket functionality is a dummy basket at present

 
### Wins 

I really enjoyed collaborating with Mehtaab on the backend and building our understanding of Python by finding solutions when things broke and getting excited when we resolved an error and got a new one. This allowed us to see how everything linked together and also understand the importance of when to use a serializer vs populated serializer.

### Future improvements 

- Adding error handling to all forms and improved feedback such as spinners when there are delays in loading the data
- Improved styling for mobile up
- Complete the intended functionality on the profile page by adding the users favourites and articles posted by the user and also allow the users to edit their profile. The backend is set up for this functionality

### Key learnings 

- I had the opportunity to solidify my knowledge on the foundational concepts of Python such as list, objects, classes etc
- Whilst I enjoyed the challenge of working with a language I was not confident with. I would have changed the MVP to focus on products solely and the e-commerce aspect of the app to reduce the volume of work at the backend so we had more time to work on the frontend functionality



