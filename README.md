# Streaming platform 
## by Pedro Schlickmann Mendes
I made this application to pratice my fullstack skills. It is a Streaming Platform that has a number of features, authentication, sign-up, filter stream by category, follow or subscribe to a streamer, live chat, profile management, password change and many others! All the Technologies used are specified [here](#tech)
# Table of Contents
1. [Interface](#inter)
2. [How to run this project](#run)
3. [Technologies used](#tech)
3. [Report a Bug](#bug)
4. [Contact](#contact)
5. [License](#license)

<a name="inter"></a>
# Interface
### I made a youtube video showing the app interface. You can watch it here: https://youtu.be/VVLdeg-23YM  
<img height="500" src="https://github.com/p-schlickmann/streaming-platform/blob/master/client/he.png" >  

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
5. Install [CORS Chrome Extension](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf)
6. And finally, run `npm start`

<a name="tech"></a>
# Technologies used
## Back-end
1. Python
2. Django
3. djangorestframework
4. SQLite3
## Front-end
1. HTML
2. Semantic UI
3. Javascript
4. Axios
5. React.js
6. Redux
7. React Router
8. React Cookie

<a name="bug"></a>
# Report a bug
If you found a bug, you can report it directly to [me](#contact), or make a pull request following the [commit pattern](https://udacity.github.io/git-styleguide/)

<a name="contact"></a>
# Contact
In case you have any doubts, or you want to contact me for any other reason, here is my email: *windowsxpedro@gmail.com*

<a name="license"></a>
# License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
