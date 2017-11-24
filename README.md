
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


## Initialize the App

0. ```npm install```

## Test the Backend

0. Make a table in MySQL or your preferred database of choice.

0. Edit your `knexfile.js` in the root directory

    If you are not using MySQL then you will have to use the corresponding client value used by Knex.js

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

0. You will see the output:
    ```Server running on http://localhost:7555```

0. Navigate in your browser to `http:localhost:7555/init`

    This will initialize all of your test data. 'OK' will be displayed on the page.

0. Navigate your browser to `http://localhost:7555/` to get to the app.

    You will have to click on the hamburger menu button to navigate to the User Management portion of the app.

    This is here to show you that it is a single page app using React-Router.

    You will notice that the page never reloads.


## Test the Frontend

0. ```npm start```

0. Webpack is run by a Webpack Express server that serves content differently than the backend.

hot module reloading, and webpack updates can be tested at `http://localhost:3000/`

Once running, if you want to hide the redux dev monitor: ```CTRL+H```

Yes, it takes a while to load the first time you open the app.

## Build the app
```npm run build```

This will build the app into the "dist" directory in the root of the project. It contains the index.html along with the minified assets, ready for production.

![](http://i.imgur.com/uUg2A3S.png)

It should look something like the above image.


## Once the app is up.

0. New users can be added by clicking on the floating action button.

![alt text](https://github.com/syntacticsolutions/react-webpack-bootstrap-boilerplate/blob/master/example_images/addusers.png)

0. Users can be edited and deleted using the action buttons at the left side of the table.

![alt text](https://github.com/syntacticsolutions/react-webpack-bootstrap-boilerplate/blob/master/example_images/editUsers.png)

0. Users can then be saved by clicking on the check circle button. Editing can also be canceled by clicking on the red x button.

![alt text](https://github.com/syntacticsolutions/react-webpack-bootstrap-boilerplate/blob/master/example_images/editUserFields.png)

0. Users can be filtered in ascending and descending order for each value in the table.

![alt text](https://github.com/syntacticsolutions/react-webpack-bootstrap-boilerplate/blob/master/example_images/filterUsers.png)

0. The page can be changed using either the pagination buttons at the bottom or by entering an existing page in the "Go To Page" input field.

![alt text](https://github.com/syntacticsolutions/react-webpack-bootstrap-boilerplate/blob/master/example_images/changePage.png)

0. This table is also responsive and the action buttons will stay to the left of the screen even when scrolling-x through the table.

![alt text](https://github.com/syntacticsolutions/react-webpack-bootstrap-boilerplate/blob/master/example_images/responsive.png)





