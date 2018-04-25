Nodejs Server API Server 개발2
==================================

> - **Note**
> - TDD 방법론을 활용한 Nodejs API Server 개발 1 => https://github.com/phantasmicmeans/nodejs_API_tutorial

api/user/로 API 분리
--------------------

### 1. 기존 API Server는 Project folder의 index.js에 통짜구조를 가짐. ###

>  기존 Project folder의 index.js예시 

**{Projectfolder}/index.js**

```javascript
    const express = require('express')
    const logger = require('morgan')
    const bodyParser = require('body-parser')
    const app = express()

    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    //유저 전체 get
    app.get('/users', (req,res) => {
        req.query.limit = req.query.limit || 10;
        const limit = parseInt(req.query.limit, 10)
        console.log("limit:", limit)
        if (Number.isNaN(limit)){
            res.status(400).end()
        }
        else {
            res.json(users.slice(0, limit));
        }
    })
    //유저 get
    app.get('/users/:id', (req,res) =>{

        const id  = parseInt(req.params.id, 10)
        if (Number.isNaN(id))
        {
            return res.status(400).end()
        }
        const user = users.filter(user => user.id === id)[0]

        if (!user){
            return res.status(404).end()
        }

        res.json(user)
    })
```

### 2. {Projectfolder}/api/user/로 API분리 ###

> /api/user/index.js로 API분리 예시

**a. {Projectfolder}/index.js**

```javascript
    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');
    var app = express();
    var user = require('./api/user');

    if (process.env.NODE_ENV !== 'test')
    {
        app.use(morgan('dev'));
    }

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use(user);

    module.exports = app;
```

**b. {Projectfolder}/api/user/index.js**

```javascript
    const express = require('express');
    const router = express.Router();

    router.get('/users', (req,res) => {

        req.query.limit = req.query.limit || 10;
        const limit = parseInt(req.query.limit, 10);
        console.log("limit:", limit)
        if (Number.isNaN(limit)){
            res.status(400).end();
        }
        else {
            res.json(users.slice(0, limit));
        }
    });

    router.get('/users/:id', (req,res) =>{

        const id  = parseInt(req.params.id, 10);
        if (Number.isNaN(id))
        {
            return res.status(400).end();
        }
        const user = users.filter(user => user.id === id)[0];

        if (!user){
            return res.status(404).end();
        }

        res.json(user);
    });

    module.exports = router;
```


### 다음 단계에서는 API 의 Controller를 분리한다. ###
Nodejs_API_tutorial 3 => https://github.com/phantasmicmeans/nodejs_API_tutorial3
