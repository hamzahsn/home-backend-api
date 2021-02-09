## Home backend API :fire: :rocket: :zap:

## Introduction

This is a small backend api app which provides landlords a control over their apartments where I used [Fastify](https://www.fastify.io/) for NodeJs with Typescript because it have the highest benchmark against Express, Koa... Well, the name already gives a hint :grin:

If anyone want to test the benchmark, then you can use `wrk` by installing it into your machine if you are using MacOS: `brew install wrk` or if you are using Linux `sudo apt-get install wrk` and then run `wrk -t12 -c400 -d30s http://127.0.0.1:4000/contracts/17689/payments?startDate=2016-07-05T00:00:00.00Z&endDate=2016-12-09T00:00:00.00Z`

For my own machine I got the following results:

```bash
Running 30s test @ http://127.0.0.1:4000/contracts/17689/payments?startDate=2016-07-05T00:00:00.00Z&endDate=2016-12-09T00:00:00.00Z
  12 threads and 400 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    22.62ms    9.84ms 231.75ms   97.33%
    Req/Sec     0.91k   360.12     1.76k    63.64%
  325707 requests in 30.06s, 210.91MB read
  Socket errors: connect 155, read 214, write 0, timeout 0
Requests/sec:  10835.18
Transfer/sec:      7.02MB
```

## Quick start

### Server

To use this project, you have to clone it first:

```bash
git clone git@github.com:hamzahsn/home-backend-api.git
```

Then open it and install dependencies:

```bash
npm install or npm i
```

Then run it:

```bash
npm start
```

Then you can use a client like [Postman](https://www.postman.com/) to see the results :sunglasses:

## Commands:

| Command                 |        description        |
| ----------------------- | :-----------------------: |
| `npm run start`         |     start the project     |
| `npm run build `        | run build for the project |
| `npm run lint`          | run lint against project  |
| `npm run lint:fix`      |        fix linting        |
| `npm run test`          |    run test of project    |
| `npm run test:watch`    | watching tests of project |
| `npm run test:coverage` |     run coverage test     |
| `npm run test:update`   |    update the coverage    |

### API documentation

In order to use the APIs here how you can do it:

Retrieve the contracts from a start payment date until end payment date with the corresponding contract ID which is represented here by `17689` in this example, and for this I just compared between months as I saw it more logic to see rents status for a a whole year, additionally, a new sum will be calculated based on the time interval which a user provided:

```bash
GET: http://127.0.0.1:4000/contracts/17689/payments?startDate=2016-07-05T00:00:00.00Z&endDate=2016-12-09T00:00:00.00Z

RESPONSE:
[
    {
        "sum": 100,
        "items": [
            {
                "id": "1366",
                "contractId": 17689,
                "description": "new one",
                "value": 200,
                "time": "2016-09-05T00:00:00.00Z",
                "isImported": false,
                "isDeleted": false
            },
            {
                "id": 1365,
                "contractId": 17689,
                "description": "Rent to be paid",
                "value": -100,
                "time": "2016-07-09T00:00:00.00Z",
                "isImported": false,
                "createdAt": "2016-12-09T12:57:09.708Z",
                "updatedAt": "2016-12-09T12:57:09.709Z",
                "isDeleted": false
            }
        ]
    }
]
```

Creating a new contract:

```bash
POST: http://127.0.0.1:4000/contracts

BODY:
{
    "contractId": 17689,
    "description": "new payment",
    "value": 400,
    "time": "2016-08-05T00:00:00.00Z",
}
```

Updating existing contract by ID of payment:

```bash
PUT: http://127.0.0.1:4000/contracts/1366

BODY:
{
    "contractId": 17689,
    "description": "modify old payment",
    "value": 200,
    "time": "2016-08-05T00:00:00.00Z",
}
```

Deleting existing contract:

```bash
DELETE: http://127.0.0.1:4000/contracts/1365
RESPONSE CODE: 204
```

## Additional

Something that could be improved in this API is to create an Endpoint like the following:

```bash
GET: http://127.0.0.1:4000/contracts
```

to allow to landlords to see all contracts with every contractID available, in another word, list everything to the specific landlord.
