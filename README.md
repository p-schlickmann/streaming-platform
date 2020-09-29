# Streaming platform 
## by Pedro Schlickmann Mendes
I made this application to pratice my fullstack skills. The back-end is made with Django and djangorestframework and the front-end with React and Redux. 
# Table of Contents
1. [Interface](#inter)
2. [How to run this project](#run)
3. [Report a Bug](#bug)
4. [Contact](#contact)
5. [License](#license)

<a name="inter"></a>
# Interface
### I made a youtube video showing the app interface. You can watch it here: https://www.youtube.com/watch?v=kPmlzAC3T34.  
### Otherwise, you can also [run your own project](#run)

<a name="run"></a>
# How to run this project
## Server
1. You'll need Python installed on your computer
2. Create a new Python project on your machine
3. Install the required libraries specified in the requirements.txt file
4. Clone this repository and paste the [server](server) files into your new Django project
5. Type the following commands `python manage.py makemigrations` and `python manage.py migrate`
6. Make sure to run your server with `python manage.py runserver`
## Client
1. For this, you'll need Node.js installed on your computer 
2. Create a new React app with the line `npx create-react-app client`
3. Clone this repository on your machine and copy the [client](client) files into the new React App
4. Install the required libraries with `npm install --save axios redux react-redux react-router-dom react-cookie redux-thunk redux-form`
5. Install [CORS Chrome Extension](#https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
6. And finally, run `npm start`


<a name="bug"></a>
# Report a bug
If you found a bug, you can report it directly to [me](#contact), or make a pull request following the [commit pattern](#https://udacity.github.io/git-styleguide/)

<a name="contact"></a>
# Contact
In case you have any doubts, or you want to contact me for any other reason, here is my email: *windowsxpedro@gmail.com*

<a name="license"></a>
# License
This project is licensed under the MIT License - see the [LICENSE](license) file for details.
