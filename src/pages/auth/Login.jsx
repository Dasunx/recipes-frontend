import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthenticationContext';
import { NotificationContext } from '../../context/NotificationContext';
import { Link } from 'react-router-dom';

const Login = () => {
	const auth = useContext(AuthContext);
	const notification = useContext(NotificationContext);
	const [user, setUserData] = useState({
		email: '',
		password: ''
	});

	const { email, password } = user;
	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			email,
			password
		};

		try {
			const response = await axios.post(
				'https://recipes-backend-2021.herokuapp.com/api/auth/login',
				body,
				{ ContentType: 'application/json' }
			);

			if (response.data.token != null) {
				auth.authenticate(
					response.data.token,
					response.data.name,
					response.data.id
				);
			} else {
				notification.showNotification(
					'please check your credentials',
					true
				);
			}
		} catch (error) {
			notification.showNotification(
				'please check your credentials',
				true
			);
		}
	};

	const handleChange = (e) => {
		setUserData({
			...user,
			[e.target.name]: e.target.value
		});
	};
	return (
		<React.Fragment>
			<div className='container-fluid'>
				<div className='row'>
					<div
						className='col-md-6 d-none d-sm-none d-md-inline'
						style={{
							backgroundImage:
								'url("https://www.phoenixfm.com/wp-content/uploads/2020/08/heart-healthy-food-1580231690.jpg")',
							height: '94vh'
						}}></div>
					<div className='col-md-6'>
						<div className='container mt-5'>
							<div className='row justify-content-center'>
								<div className='col-md-6 col-8'>
									<form onSubmit={handleSubmit}>
										<div className='mb-3'>
											<label htmlFor='email'>Email</label>
											<input
												type='email'
												name='email'
												className='form-control'
												id='email'
												value={email}
												onChange={handleChange}
												required
												placeholder='john@gmail.com'
											/>
										</div>
										<div className='mb-3'>
											<label htmlFor='password'>
												password
											</label>
											<input
												type='password'
												name='password'
												className='form-control'
												id='password'
												value={password}
												onChange={handleChange}
												required
											/>
										</div>
										<div className='mb-3'>
											<button className='btn btn-primary w-100'>
												Login
											</button>
											<hr />
											<Link
												to='/register'
												className='btn btn-danger w-100'>
												Register
											</Link>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default Login;
