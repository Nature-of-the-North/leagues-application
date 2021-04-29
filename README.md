![MIT LICENSE](https://img.shields.io/github/license/scottbromander/the_marketplace.svg?style=flat-square)
![REPO SIZE](https://img.shields.io/github/repo-size/scottbromander/the_marketplace.svg?style=flat-square)
![TOP_LANGUAGE](https://img.shields.io/github/languages/top/scottbromander/the_marketplace.svg?style=flat-square)
![FORKS](https://img.shields.io/github/forks/scottbromander/the_marketplace.svg?style=social)

# Nature of the North - Leagues Application

## Description

_Duration: 2 Week Sprint_

Nature of the North is a bouldering gym and outdoor community center in Fargo-Moorhead. This is an application for their bouldering leagues. Climbers in the league can track their climbs every week and submit certain climbs to go towards their team's score. The app also has a leaderboard so the teams have visibility into how their team is doing in comparison to other teams in the league. There is also admin functionality that allows the admin to see each team, their climbers, all of the climbs, and mark whether or not the team has paid their league dues. 

Check out the functioning app [HERE](https://notn-leagues-app.herokuapp.com/#/home)

## Screen Shot

<img src="./public/images/Start_Session.jpg" alt="Home page where user can start a climb session" width="280"/> 
<img src="./public/images/Climb_Session.jpg" alt="Captain view of the climb session" width="280"/> 
<img src="./public/images/Leaderboard.jpg" alt="Leaderboard of the league" width="280"/> 

<img src="./public/images/Admin_Teams.jpg" alt="Admin view of the teams page" width="900">



### Prerequisites
To start this project please have these set of software programs downloaded to your computer. 
- A code editor of your choice [VS Code ](https://code.visualstudio.com/) OR [Sublime Text](https://www.sublimetext.com/)
- [postgreSQL](https://www.postgresql.org/)
- [Node.js](https://nodejs.org/en/)

## Local Development

1. Clone code from Github
2. Open the project folder in an editor of your choice. 
3. Open a terminal and navigate to the project folder. Run an `npm install`
4. Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.

5. Open your database application of choice. This project is built with [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico create a database and to run the queries.
6. Create a database named `notn`.
7. The queries in the `database.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. 
8. Run `npm run server` in your terminal
9. Run `npm run client` in your terminal
10. The project will open in a new tab in your default browser! If not navigate in your local browser to `localhost:3000`

## Heroku Deployment

### Connecting to the existing deployed app

After cloning the code from GitHub, you will need to connect to the Heroku Application to push any changes that you make to the app to the deployed version. 

1. Navigate to the deployed app on the Heroku website
2. In the 'Deploy' tab, choose the Heroku Git CLI
3. There are steps on the site, but a summary of important steps are below.

    i. Use the terminal to login to Heroku `$ heroku login`

    ii. Navigate to the app's folder `$ cd leagues-application`

    iii. After you make changes to the code and are ready to push up to Heroku, do a `$ git add .` and a `$ git commit -am "made changes"`

    iv. Then you can push up the changes to the Heroku App with `$ git push heroku master`

### Config Variable

1. Navigate to the deployed app on the Heroku website.
2. In the 'Settings' tab, go to the 'Config Vars' section.
3. Click 'Reveal Config Vars'. 
4. If there is no SERVER_SESSION_SECRET variable, follow the steps below. 

    i. Set a new Config Var in Heroku using SERVER_SESSION_SECRET as the Key.

    ii. The value can be any random string of letters and/or numbers. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/)  

### Database

If you want to manually edit the database in Postico, follow the steps below.

1. Navigate to the deployed app on the Heroku website.
2. In the 'Settings' tab, go to the 'Config Vars' section.
3. Click 'Reveal Config Vars'
4. Copy the 'DATABASE_URL' value. Starts with 'postgres://'
5. Open Postico and click 'New Favorite'
6. If the Config Var is in your clipboard, it should automatically fill in the relevant information. Otherwise, use this [resource](https://medium.com/@danielnmai/how-to-set-up-postico-3-to-connect-to-a-remote-postgresql-server-heroku-f9704e1b7643).

## Application Usage

### Admin
1. Login using the provided Admin login. 
2. Create a new league using the 'Create League' button. Name the league, and choose the start and end dates for the league. 
3. Once you have created a league, you have the option to edit the league information (name and dates) with the 'Edit' button or delete the league with the 'Delete' button. If you click the 'Delete' button a dialogue will pop up asking you to confirm the league that you want to delete. 
4. Clicking on the 'Teams' link in the navigation bar will navigate you to a page that lists the teams that are in the current league. 
5. There is a dropdown that allows you to select past leagues. 
6. Clicking on a team name will show the climbers on that team, the paid status of the team, and all of the climbs that team has done.
7. If a team has not paid, an indicator will show beneath the team name that says 'Has not paid'. The admin will be able to click into the team and change the paid status of the team. 

### Climber
1. Register for an account.
2. Click the 'Create a Team' button and enter in a new team name.
3. If a league is open, click 'Join League' on the home page.
3. If a league is not open, the app will say so and you can check back later. 
4. When you join a league you must pay the league dues to NOTN, and they will mark your team as paid in the admin view.
5. Once your team has paid and the league has started, you and your team will be able to start a climbing session.
6. In the climbing session, click 'Add climbs' to add your climbs for the week. You can add as many climbs as you would like. 
7. Once you and your team have completed all of your climbs, the team captain can click the 'submit' checkbox on 10 of the climbs.

- Each climber must have 3 climbs submitted, and the 10th climb can come from any climber

8. Click on the 'team' link in the menu to see the climbers on your team and their total score for the current league.
9. Click on the 'leaderboard' link in the menu to see all of the teams in the current league and their respective scores. Your team will be highlighted. 
10. The 'Rules' page in the menu lists the rules for the league. 
11. The 'About' page in the menu lists information about NOTN and the leagues.
12. The 'Profile' link in the menu will take you to a page where you can see and edit the information associated with your user profile.

## Built With

HTML, CSS, JavaScript, Express.js, Node.js, React, Redux, Sagas, Material-UI, Moment.js
<!-- List technologies and frameworks here -->

## Known Bugs

- Logging out as an admin and trying to login as a user will direct you to a 404. Simply change the URL in the address bar to be only the base URL (https://notn-leagues-app.herokuapp.com/) to go back to the home screen of the app.
- ADMIN - Refreshing the 'Edit League' page will cause the league information to disappear.
- ADMIN - The list of teams on the 'Teams' page will sometimes re-order when changing the paid status of a team. 
- CLIMBER - The list of climbs in the 'Climbing Session' page will sometimes re-order when changing the submitted status of a climb. 
- CAPTAIN - Deleting a climber from your team while your team is in the middle of a climbing session will break the scoring for that session. 
- Extending the league could break the scoring and weeks of the league. A workaround would be to create a new league and end the current league early.

## License

MIT License

Copyright (c) [2021] [Nature Of The North]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Acknowledgement
Thank you to [Prime Digital Academy](www.primeacademy.io) who gave us the opportunity and taught us the skills needed to create an application for [Nature Of The North](http://natureofthenorth.co/). We wanted to take a moment to thank our cohort, Cullen, for being supportive and taking time to help one another every step of the way. Our instructors Edan and Chad for being adaptive and understanding of our own challenges and struggles throughout our own journey's. 
