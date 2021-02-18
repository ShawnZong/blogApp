# Full Stack Blog App 😄

App website: https://junshengtan-blog-app.herokuapp.com

Author: Junsheng Tan

Portfolio website: https://junshengtan.webflow.io

# Introudction

Blog website. You can create your account and post blog. Everyone can "👍 like" other blogs and the homepage will show the popular blogs. Also, you can add comments to the blog and communicate with other users. Users' statiscs is also shown.

It also has API endpoints: /api/blogs and /api/users return blog statistics and user statistics

# Techonologies

## Overview

### Front End

I use ***React*** to render UI components. For state management, I apply ***Redux*** to store current logined user info, blogs info, etc. For form parsing and validation, I utilize ***Yup*** to create form schemas, and ***Formik*** to validate inputs.

***Npm*** is used for package management.

***Cypress*** is used for automatic testing

***Bootstrap*** for UI style

### Backend

I use ***Express*** as backend server, ***MongoDB-Mongoose*** as database. To protect user info, I use ***bcrypt*** to encrypt data. 

***Jest*** is used for testing server's response, and ***Morgan*** is for logging as debug tools.

### Deployment

I deployed the application on ***Heroku***, the website is https://junshengtan-blog-app.herokuapp.com

## Technology List

* Deployment: 
  + Heroku
  + MongoDB Atlas

* Front End:
  + React
  + Redux
  + Npm
  + Bootstrap
  + Cypress
  + Formik
  + Yup

* Back End:
  + Express
  + MongoDB-Mongoose
  + Bcrypt
  + Lodash
  + Morgan
  + Jest
