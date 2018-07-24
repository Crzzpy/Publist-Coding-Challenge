PUBLIST BACKEND CODING CHALLENGE

First off make sure to have the newest Node.JS and NPM Version installed.

Before you run "npm install" make sure to fill in valid database credentials to an psql database at 
'./database/client.js' otherwise you will get an error while initialising the database.

Than you can run "npm install" and afterwards "npm start" to start the application.


It should be accessable through http://localhost:3000

It only accepts POST requests, with an correct Authentication body.

{
	"authorization" : {
		"username": "coding",
		"password": "challenge"
	}
}

Currently there is only this user.

If provided the correct user it will return a list of all news headlines.

The tests currently only include the newslist and can be run with "npm test".

Lastly I want to tell you about some decisions I made and how I understood your requirements since I 
had some slight issues understanding it.

Requirements:
- "Create a simple API with Zeit’s micro library that you can log in to and get a list of news headlines. Creativity is encouraged and the details are yours to decide.",
    - I have created a simpe API with Zeit's micro library which return a list of news headlines.
    - I didn't quite understand what you ment with "that you can log in to" so I decided to implement a simple
    authentication using a username and password to "log into" the app. Althought I haven't used sessions or anything
    more than a basic username and password check.
- "Only need to interact with it using any REST client (Postman, Paw) or curl",
    - You can simply use postman to send a POST request with a valid authentication body to receive the news headlines
    as JSON
- "News articles must be pulled from a Postgres database"
    - I also had some issues understanding this aspect since you already provided an API returning the news articles.
    - But since that isn't directly "pulling from a postgres database". I decided to simply load your news headlines, insert them
    into a postgres database while initialising it and than afterwards loading them from the psql database.
- "Get articles by sending an HTTP request to our query endpoint (make sure to remove escaping in the body):"
    - I already mentioned that above.
- "Please send us clean code (we like prettier and eslint), tested-code (we like jest), and have some kind of structure."
    - I have setup a basic eslint config and formatted my code accordingly
    - I have implemented jest and have written a simple test, but unfortunatley my 2h time ran out, so I was unable to include more.
    That's also the case with the 3 Bonus requirements. I wanted to include them aswell as a simple UI but as I mentioned already, I was at my 2 hours 
     time limit.
  
Personal Notes:
  - I have mainly used callbacks instead of promises / async / await but I can adjust depending on how you like it.
  - I am still very young and I am willing to learn, grow and get better.
  - I am an extremly fast learner and adapt new tech really fast, so if you want to implement something new I am into it in almost no matter of time.
  - I am willing to give my best and work as hard as I can.
  - Altought I did the backend challenge, I am currently learning React.js aswell as Vue.js so I am sure I will also be able to support Frontend tasks later on.
  
This readme isn't included in the 2 hours I used, I have written it afterwards.
