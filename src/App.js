import React, { useContext, useCallback, useState, useEffect } from 'react';
import NavBar from './components/shared/NavBar';
import {
	BrowserRouter,
	Route,
	Router,
	Switch,
	Redirect
} from 'react-router-dom';
import Home from './pages/Home';
import CreateRecipe from './pages/recipe/CreateRecipe';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { AuthContext } from './context/AuthenticationContext';
import { NotificationContext } from './context/NotificationContext';
import './App.css';
import Notification from './components/shared/Notification';
import ViewRecipe from './pages/recipe/ViewRecipe';
import MyRecipe from './pages/recipe/MyRecipe';

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState();
	const [token, setToken] = useState();
	const [name, setName] = useState();
	const [userId, setUserId] = useState();
	const [isLoading, setIsLoading] = useState(true);
	const [notify, setNotify] = useState();
	const [message, setMessage] = useState();
	const [error, setError] = useState(false);

	const setNotification = useCallback((msg, error) => {
		setMessage(msg);
		setError(error);
		setNotify(true);
		setTimeout(() => {
			clearNotification();
		}, 5000);
	});

	const clearNotification = useCallback(() => {
		setNotify(false);
		setMessage(null);
		setError(false);
	});

	const authenticate = useCallback((token, name, id) => {
		setToken(token);
		setName(name);
		setUserId(id);
		localStorage.setItem(
			'authData',
			JSON.stringify({
				token,
				name,
				id
			})
		);
		setIsLoading(false);
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setName(null);
		localStorage.removeItem('authData');
		localStorage.clear();
		return <Redirect to={'/login'} />;
	}, []);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('authData'));
		if (storedData && storedData.token) {
			authenticate(storedData.token, storedData.name, storedData.id);
		}
		setIsLoading(false);
	}, [authenticate]);

	let routes;
	if (token) {
		routes = (
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/recipe/:id' component={ViewRecipe}></Route>
				<Route path='/create'>
					<CreateRecipe />
				</Route>
				<Route path='/my'>
					<MyRecipe />
				</Route>
				<Redirect to='/'></Redirect>
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route exact path='/'>
					<Home />
				</Route>
				<Route path='/recipe/:id' component={ViewRecipe}></Route>
				<Route path='/login'>
					<Login />
				</Route>

				<Route path='/register'>
					<Register />
				</Route>
				<Redirect to='/'></Redirect>
			</Switch>
		);
	}
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				fullName: name,
				userId: userId,
				authenticate,
				logout: logout
			}}>
			<NotificationContext.Provider
				value={{
					notify,
					message,
					error,
					showNotification: setNotification,
					clearNotification: clearNotification
				}}>
				<BrowserRouter>
					<div className='App'>
						<NavBar />
						<Notification />
						{!isLoading && routes}
					</div>
				</BrowserRouter>
			</NotificationContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
