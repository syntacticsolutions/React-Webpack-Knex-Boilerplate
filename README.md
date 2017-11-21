
# react-webpack-bootstrap-boilerplate
Integration of 'webpack-react-redux' with 'reactstrap'
A boilerplate for playing around with react, redux and react-router with the help of webpack.
Also has knex for connecting to your database of choice with scrips for inserting test data.

Contains: 

* a working example of a user management system.
* ES6 - 7 Support with Babel
* Redux dev tools to help you keep track of the app's state
* Routing
* hot module replacement support so you can change modules or react components without having to reload the browser
* a webpack production config so you can build the app and make it ready for production
* Sass support, just import your styles wherever you need them
* eslint to keep your js readable
* much more...



![](http://jpsierens.com/wp-content/uploads/2016/06/filterableTable-1.gif)


## Initialize the App

0. ```npm install```

## Test the Backend

0. Make a table in MySQL or your preferred database of choice.
0. Edit your `knexfile.js` in the root directory

0. `module.exports = {`
    `client: 'mysql',`
    `connection: {`
        `host: '127.0.0.1',`
        `user: <your_user>,`
        `password: '<your_password>',`
        `database: '<your_tablename>'`
    `}`
`};`

0. In your terminal:
    ```node backend```

0. Your will see the output:
    ```Server running on http://localhost:7555```

0. Navigate in your browser to `http:localhost:7555/init`

    This will initialize all of your test data.

## Test the Frontend

0. ```npm start```

Once running, if you want to hide the redux dev monitor: ```CTRL+H```

Yes, it takes a while to load the first time you open the app.

## Build the app
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.

![](http://i.imgur.com/uUg2A3S.png)

It should look something like the above image.



