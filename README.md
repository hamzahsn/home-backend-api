## TodoApp :fire: :rocket: :zap:

## Introduction

This is a small backend api app which provides landlords a control over their apartments where I used [Fastify](https://www.fastify.io/) for NodeJs with Typescript because it have the highest benchmark against Express, Koa... Well, the name already gives a hint :grin:

If anyone want to test it then you can serve you can run `wrk -t12 -c400 -d30s http://127.0.0.1:4000/contracts/abcd/payments?startDate=2016-07-05T00:00:00.00Z&endDate=2016-12-09T00:00:00.00Z` but for me I got the following results:

```bash
Running 30s test @ http://127.0.0.1:4000/contracts/abcd/payments?startDate=2016-07-05T00:00:00.00Z&endDate=2016-12-09T00:00:00.00Z
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

Retrieve the contracts from a start date until end date with the corresponding contract ID which is represented here by `abcd`, and for this example I just compared between months as I saw it more logic to see rents status for a a whole year:

```bash
GET: http://127.0.0.1:4000/contracts/abcd/payments?startDate=2016-07-05T00:00:00.00Z&endDate=2016-12-09T00:00:00.00Z
RESPONSE:
[
    {
        "id": 1366,
        "contractId": 17689,
        "description": "Rent payment",
        "value": 100,
        "time": "2016-12-09T00:00:00.00Z",
        "isImported": false,
        "createdAt": "2016-12-09T12:57:31.393Z",
        "updatedAt": "2016-12-09T12:57:31.393Z",
        "isDeleted": false
    },
    {
        "id": 1365,
        "contractId": 17689,
        "description": "Rent to be paid",
        "value": -100,
        "time": "2016-12-09T00:00:00.00Z",
        "isImported": false,
        "createdAt": "2016-12-09T12:57:09.708Z",
        "updatedAt": "2016-12-09T12:57:09.709Z",
        "isDeleted": false
    }
]
```

Creating a new contract:

```bash
POST: http://127.0.0.1:4000/contracts
BODY:
{
    "id": 894,
    "contractId": 894,
    "description": "r payment",
    "value": 100,
    "time": "2016-08-05T00:00:00.00Z",
    "isImported": false,
    "createdAt": "2016-12-09T12:57:31.393Z",
    "updatedAt": "2016-12-09T12:57:31.393Z",
    "isDeleted": false
}
```

Updating existing contract:

```bash
PUT: http://127.0.0.1:4000/contracts/1366
BODY:
{
    "id": 894,
    "contractId": 894,
    "description": "testing",
    "value": 200,
    "time": "2016-08-05T00:00:00.00Z",
    "isImported": false,
    "createdAt": "2016-12-09T12:57:31.393Z",
    "updatedAt": "2016-12-09T12:57:31.393Z",
    "isDeleted": false
}
```

Deleting existing contract:

```bash
DELETE: http://127.0.0.1:4000/contracts/1365
RESPONSE: 1365
```

## Additional

II is also possible to execute the APIs on swagger through this link: `http://127.0.0.1:4000/documentation`
