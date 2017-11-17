import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import UserList from './components/UserList';

export default (
	<Switch>
		<Route exact path="/" component={ Home } />
		<Route path="/user_list" component={ UserList } />
	</Switch>
);
