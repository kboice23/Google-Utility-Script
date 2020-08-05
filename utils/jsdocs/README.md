
<br>

[![CircleCI](https://img.shields.io/circleci/build/github/kboice23/Google-Utility-Script?logo=CircleCI&token=03bb2aa6c5c825f09e352373a96b9651f2180162)](https://app.circleci.com/pipelines/github/kboice23/Google-Utility-Script)

<br>

# Home

Welcome to the Google Utility Script project.

This is a NodeJS utility script and set of microservices that I created to run common Google cleanup functions on a nightly schedule as well as on-demand via webhooks.

<br>

## Features and Functionality

- Automatically cleans up old Google Contacts and Users from your account on a daily basis
- Webhook endpoints for triggering cleanup from external events or command line rather than a schedule
- Granular configuration to turn specific cleanup activities off or on from a single file
- Multi-channel alerts and notifications upon successful runs and errors/exceptions
- Monitor and log all activity in popular tools like SegmentIO, New Relic, PM2 and Rollbar
- Enhanced error handling w/ logging and tracing
- Jest test coverage and reporting in JSON, text, HTML and markdown
- CircleCI CI/CD for automating DevOps and deployments

<br>

## Requirements

| Node.js Version | NPM Version | CircleCI       | Docker Repo | Database | Cloud Platform |
| --------------- | ----------- | -------------- | ----------- | -------- | -------------- |
| 12+             | 6+          | _Free Account_ | _Any_       | _None_    | _Any_          |

<br>

## Getting Started

### Clone the project, and install the dependencies

```bash
$ git clone https://github.com/kboice23/Google-Utility-Script
$ cd Google-Utility-Script
$ npm install
```

<br>

### Configure your environment

> **Update with your own Google  IDs, Keys and Tokens**: _and update keys for any monitoring tools you'd like_


```bash
$ mv .env.sample .env
$ nano .env
```

```bash
# Google Cleanup
CONFIG_CLEAN_CHAT_ROOMS=true
CONFIG_CLEAN_CHAT_USERS= true

# Monitoring and Logging
CONFIG_TRACK_IN_SEGMENT = true;

# Google Account
GOOGLE_ACCOUNT_SID=ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_AUTH_TOKEN=fdXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
GOOGLE_CHAT_SERVICE_SID=ISXXXXXXXXXXXXXXXXXXXXXXXX

# Monitoring and Logging Accounts
MONITORING_SEGMENT_KEY_NODEJS=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

<br>

### Verify all is working by populating some test contacts in Google 

```bash
$ npm run populate
```

```bash
Created Google Contact CHf9c7563e5a7942dda6b18d578e5b662e
```

<br>

#### You can double check that the room was created in the Google console via a web browser

![Google Contact Console Rooms List](https://kboice23.github.io/Google-Utility-Script/images/readme-Google-console-572px.png)

<br>

### Start the node server

#### Development mode

```bash
$ npm run dev
```

```bash
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node index.js`
    Waiting until 2AM each day to delete all old contacts
[nodemon] restarting due to changes...
[nodemon] starting `node index.js`
```

<br>

#### Debug mode

```bash
$ npm run debug
```

```bash
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node --inspect index.js`
Debugger listening on ws://127.0.0.1:9229/5cbb7824-c467-489f-868a-972892282165
For help, see: https://nodejs.org/en/docs/inspector
    Waiting until 2AM each day to delete all old contacts
[nodemon] restarting due to changes...
[nodemon] starting `node --inspect index.js`
Debugger listening on ws://127.0.0.1:9229/e5514ff8-ceae-4e2f-80e7-bcd3bbe6a557
For help, see: https://nodejs.org/en/docs/inspector
    Waiting until 2AM each day to delete all old contacts
```

<br>

#### Production mode

```bash
$ npm run server
```

```bash
    Waiting until 2AM each day to delete all old contacts
```

<br>

### Run the node server with scheduling disabled

> **Tip**: _good for development and testing_

#### Development mode

```bash
$ npm run devNow
```

```bash
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
    Successfully deleted all old contacts
[nodemon] restarting due to changes...
```

<br>

#### Debug mode

```bash
$ npm run debugNow
```

```bash
[nodemon] 2.0.4
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
Debugger listening on ws://127.0.0.1:9229/5cbb7824-c467-489f-868a-972892282165
For help, see: https://nodejs.org/en/docs/inspector
    Successfully deleted all old contacts
[nodemon] restarting due to changes...
Debugger listening on ws://127.0.0.1:9229/e5514ff8-ceae-4e2f-80e7-bcd3bbe6a557
For help, see: https://nodejs.org/en/docs/inspector
    Successfully deleted all old contacts
```

<br>

#### Production mode

```bash
$ npm run serverNow
```

```bash
    Successfully deleted all old contacts
```

<br>

### Run Jest tests

```bash
$ npm run test
```

<br>

### Generate documentation using JSDocs

```bash
$ npm run docs
```

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>

<br>