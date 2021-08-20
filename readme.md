# Cafe App | Capstone CS50W



## Distinctiveness and Complexity

# Overview

This project contains a Django Python Framework with JQuery,JS,JSON. I call this the Cafe App. Users will be able to signup and login to their account. Then they will be able to reserve a table. Users will be able to discover the menus and view their reservations. When the users click on their latest order, they will be able to view all their previous reservation made with the app.
To avoid spam, users need to login or sign up to book a table and see the menu in advance.
The App is MOBILE RESPONSIVE as well.



# Justification

I consider that this project meets all the expectations raised in the assignment of the CS50W final project, as it is a web platform that implements most of the concepts and techniques taught in the course.

The whole application is based on the Django framework, which allowed managing user authentication, database models, http requests, static files and the page rendering.

On the other hand, user interface was designed with JS,JQuery. The web application is mobile responsive. I have included bootstrap library to make my react components / front end mobile responsive.

The difference between this web application and previous projects is that this application makes use and manages the data to mae reservations and view the reservations instantly. With the potential to include more features in the future with respect to other services such as submission date, due date and, more.

- [x] Write the press release This gives freedom to potential visitors to book a table anytime they want. It also maximises your sales because you are not limited to your working hours. 

- [x]  Hassle-Free Management of this reservation system will make the staff more efficient. They won’t be tied to a phone waiting for guest calls. 

- [x] This system comes with various analytics tools. They can keep track of each reservation and all the related details. Thus you will have all the information to better understand your guests, their preferences and what upgrades you sell the most. With this, you will be able to outline the areas where you need to focus on and grow your business.

- [x] Prospective guests who reserve online are much more likely to show up. And in the cases when someone doesn't show up, the online booking system will automatically free the reserved room, making it available for booking. 


- [x] Online reservation systems reduce workloads for your staff and optimize customer service. These platforms can make sure that bookings are synced and the availability is updated with each booking processing. A good restaurant reservation system makes the work process carefree.


# Structure

The web platform is structured as follows

- **static** This folder contains the front end part that displays the landing page that allows the users to interact with the application.
- **cafe:** The home folder is the main Django app
- **capstone:** This folder contains the urls patterh and projects settings which can be called from the front end. 
- **templates:** This folder app handles the html templates to render the functions.
- **db.sqlite3** This folder contains and stores all the users data.



# File Contents

## Front End:

- `./cafe/static/`:

- `css` - Contains all CSS files to customise and style accordingly the html pages 
- `images` - Contains all media files used accross the website
- `fonts` - Contains all font files used to style text.


- `./cafe/static/`:

  - `main.js` - Handles the reservations
  - `side.js` - Handles specific reservations of a user
  - `cookie.js` - Handles the information stored by the user

- `./cafe/static/js`:

  - `bootstrap.min.js` - Handles the Bootstrap css.
  - `custom.js` - Handles pre-loader function when the main page is loaded.
  - `jquery-3.2.1.slim.js` - This file handles CSS animation of the all web pages.
  - `jquery.magnific-popup.min` - This file handles CSS animation of the all web pages.
  - `jquery.js` - This file handles CSS animation of the all web pages.
  - `jquery.stellar.min.js` - This file adds a parallax scrolling effect to your website.
  - `owl.carousel.min.js` - This file handles preloder CSS animation of the main page.
  - `popper.min.js` - This file handles CSS animation of the all web pages.  
  - `script.js` - This file handles div animation of the all web pages.
  - `wow.js` - This file handles mobile responsive CSS animation of the all web pages.
  - `smoothscroll.js` - This file handles CSS animation of the all web pages.



## Back End:
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="posts")
    name=models.TextField(max_length=25,default="")
    email = models.EmailField(default="")
    menu=models.TextField(max_length=250,default="")
    customisations=models.TextField(max_length=250,default="")
    table_for=models.TextField(default="")
    timestamp = models.DateTimeField(auto_now_add=True)
    time=models.TextField(default="01:56 AM")
### Models in the app


There are 6 models for the web application's database.

1. `author` - A fully featured User model with admin-compliant permissions.
2. `name`- Holds the name of users.
3. `email`- Holds the email of users.
4. `menu`- Holds the specific menu chosen by users.
5. `customisations`- Holds the customised notes of the users.
6. `table_for`- Holds the number of persons for reservation.
7. `timestamp`- Holds the time and date when the reservation was made.
8. `time`- Holds the arrival time for dine in of users.

### views.py and serializers.py files:

views.py contains the funtions for the web application. These view functions sends and receives http request and response. They also combine with serializers to deal with model instances and querysets.

### Manage.py file:

This file is used as a command-line utility and for deploying, debugging, or running the web application.This file contains code for runserver, makemigrations or migrations that we use in the shell.

### `_init_.py` files:

This file is empty and remains that way. they are present only to tell that this particular directory is a package.

### settings.py folder:

This file is present for adding all thr applications and the middleware application present. This also has informations about templates and databases. This is present in the main file of the Django web application.

### urls.py files:

This file handles all the URLs of our Django web application. This file contains the lists of all the endpoints that we will have for our web application. Also, this files is like a link to the views in the app with the host web URL.

### wsgi.py folder:

This file mainly concerns with the WSGI server and is used for deploying the web application on to the servers similar to apache, etc.

### admin.py files:

Similar to the name of the file, this file is used for registering the models into the django administration. The models that are present have a admin who can modify the data that is being stored. 

### apps.py files:

This file deals with the application configuration of the apps. 

### models.py files:

This file contains the models of our web application (classes). They are the blueprints of the database we are using and hence contain the information regarding attributes and the fields, etc of the database.

### views.py files:

This files are the crucial ones, it contains all the views. This file can be considered as the file that interacts with the client. This web application uses views with the concept of serializers in the Django Rest_Framework.

### test.py files:

This file containts the code that contains different test cases for the application. It is used to test the working of the application. (did not implement tests in this web application)



# Installation & how to run the application



## Backend


```
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```


# Diveshwar Madhav Totoo
### *`Github.com`*: madhav0001
### *`Edx`*: madhav100
