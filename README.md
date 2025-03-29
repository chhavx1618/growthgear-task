# The Task

The task is to make a lightweight REST API for mimicing an AI querying engine using in memory database (sqlite3), NodeJs and ExpressJs for the logic. 

Our tool empowers non-technical teams to:

-Ask complex business questions directly
- Get instant, accurate insights from databases
- Eliminate dependency on data teams
- Make faster, data-driven decisions

### My Working

To build this API, I first considered the real worl AI architecture -

1. The input query is processed, the natural language is convered into structured queries, and ML models are used to predict the correct SQL needed.

2. The predicted query is used to pull the data from database, and various optimizations such as caching, vector search, etc. are applied.

3. AI models, LLMs, handle the queries and provide the final answer with explanations, additional suggestions, etc.

Since the goal here is to mimic this working,

1. I allowed user input by the API to be processed by a regex engine that maps user's questions to the relevant queries. 

*Better Approach*: I would integrate AI models, either OpenAI or Llama. The queries would be sent to these models, and their response would be the final SQL output needed. This helps to generate the queries *dynamically*.

Suggested code: 

```sh 
function getSql(naturalQuery) {
     const response = await axios.post("<link_to_openAI/other_api>", {
          model:"<chosen model>"
          messages:[{role: "system", content: "convert natural language to SQL"}]
     }, {
          headers: { Authroization: `Bearer this-is-your-api-key` }
     });

     return response.data.message.content;
}
```

*Better Approach - Local Processing*: Using spacy library might help for a faster response with no internet dependency. It will generate NLP based SQL queries, that can be run in the background and the final output can be easily provided to the user.

2. Once the query is generated, I run it in a in-memory database. In-memory database has been used to ensure that the API remains lightweight (No I/O operations help in this case). The queries are run in the database and the output is sent back to our API.

I have implemented *rule-based mapping* using regex in order to mimic the working of SQL on a database.

3. Finally, the relevant explanation along with the correcct output is provided as the output for the user.

# Documentation

## Overview

Mini-query-engine is a simple, lightweight REST API aimed at mimicing the real world AI behaviour pipeline. It uses NodeJs for the backend, ExpressJs to build the API and sqlite3 for an in memory database.

Mini-query-engine is deployed onto Railway.

This project is currently maintained.

## Key features

It allows users to input multiple different queries relevant to their business database, allowing the non technical users to simply ask questions in natural language, and get the relevant output as well as explanations. This leaves no hassle for the non-technical teams to manage or work with actual SQL queries. 

It allows validation of requests, meaning it validates whether a particular natural language query is relevant to the existing database.

It also has a history feature in order to check the previous requests on the API.


## How to run this repository

1. Clone this repository using `git clone (link)` command in your terminal or download the ZIP file.
2. Navigate to the root directory of the repo and run the command `npm i` or `npm install` to install all the libraries, dependencies and packages required.
3. Run `npm start` to run your server. Congratulations! You are now running the server! You should see "Running on <PORT>".
4. Test the API by opening http://localhost:5000.


### Run it using Docker

You can run Mini-query-engine inside a Docker <https://docs.docker.com/> container. This approach doesn't require you to install any dependencies other than Docker Desktop on Windows and Mac, and Docker Compose on Linux.


1. Run `docker build -t mini-query-engine .` to build the image after cloning the repo

2. Run `docker run -p 5000:5000 mini-query-engine` to run the image.


### Queries implemented 

- The API supports natural language queries and translates them into SQL queries. Below are some of the supported queries:

- Total Revenue: "What is the total revenue?"

- Total Sales: "How many sales transactions were made?"

- Average Revenue per Sale: "What is the average revenue per sale?"

- Highest Revenue Transaction: "What is the highest revenue recorded?"

- Lowest Revenue Transaction: "What is the lowest revenue recorded?"

- Total Number of Customers: "How many unique customers made purchases?"

- Most Sold Product: "Which product was sold the most?"

- Least Sold Product: "Which product was sold the least?"

- Sales by Category: "How many sales per category?"

- Revenue by Category: "What is the total revenue per category?"


## API Endpoints

1. Query Execution

Endpoint: /api/query
Method: POST
Request Body:

{
    "question": "What is the total revenue?"
}

Response:

{
    "result": [{ "total_revenue": 23000 }]
}

2. Explain Query

Endpoint: /api/explain
Method: POST
Request Body:

{
    "question": "What is the total revenue?"
}

Response:

{
    "explanation": "Calculate the total revenue from all sales."
}

3. Validate Query

Endpoint: /api/validate
Method: POST
Request Body:

{
    "question": "What is the total revenue?"
}

Response:

{
    "checkValid": true,
    "sqlQuery": "SELECT SUM(revenue) AS total_revenue FROM sales;"
}

4. Query History

Endpoint: /api/history
Method: GET
Response:

{
    "history": [
        {
            "id": 1,
            "question": "What is the total revenue?",
            "sqlQuery": "SELECT SUM(revenue) AS total_revenue FROM sales;",
            "timestamp": "2024-03-28 14:30:00"
        }
    ]
}


## Authentication

The API is secured using an API key. You must include the API key in the Authorization header as follows:

`-H "Authorization: Bearer this-is-your-api-key"`

If the key is missing or incorrect, you will receive a 401 Unauthorized response.


## Testing Commands

You can test the API using `curl` or Postman.

#### Using `curl`
```sh
curl -X POST http://localhost:5000/api/query \
     -H "Authorization: Bearer this_is_secure_enough,right?" \
     -H "Content-Type: application/json" \
     -d '{"question": "What is the total revenue?"}'
```
#### Using Postman

Set the request type to POST

Enter the URL: ` http://localhost:5000/api/query `

Add the header:

```sh
Authorization: Bearer this_is_secure_enough,right?
Content-Type: application/json
```

In the body, add the JSON:

```sh
{
    "question": "What is the total revenue?"
}
```

Click Send to see the response.


### Additional Tasks 

1. Docker build - Docker has been used in order to allow the API to work locally on any machine, avoiding any dependency conflicts or heavier computing.

2. Jest Testing - Simple routes and endpoints testing has been implemented using jest. This is done to ensure that the API is running correctly, allowing proper authentication, correct responses, and blocking unsafe or incorrect requests.

3. History table -  A history table has also been made in order to allow for logging of the user activity, tables, rows and information accessed. This can be proven to be useful while debugging, or when needing to refer to the past logs.


### Tech Stack 

1. Backend: Node.js, Express.js

2. Database: SQLite3 (in-memory for query simulation)

3. Authentication: API Key-based security

4. Containerization: Docker

5. Testing: Jest

