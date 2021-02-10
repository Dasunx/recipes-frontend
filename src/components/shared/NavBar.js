import React, { Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthenticationContext';
import { Redirect } from 'react-router-dom';

const NavBar = () => {
	const auth = useContext(AuthContext);

	const signOut = () => {
		auth.logout();
		<Redirect to={'/login'} />;
	};
	return (
		<div>
			<nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
				<div className='container'>
					<Link className='navbar-brand' id='navbar-brand' to='/'>
						Unique Recipe
					</Link>
					<button
						className='navbar-toggler'
						type='button'
						data-bs-toggle='collapse'
						data-bs-target='#navbarSupportedContent'
						aria-controls='navbarSupportedContent'
						aria-expanded='false'
						aria-label='Toggle navigation'>
						<span className='navbar-toggler-icon'></span>
					</button>
					<div
						className='collapse navbar-collapse'
						id='navbarSupportedContent'>
						<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
							<li className='nav-item'>
								<Link
									className='nav-link active'
									aria-current='page'
									to='/'>
									Home
								</Link>
							</li>
							{auth.isLoggedIn && (
								<React.Fragment>
									<li className='nav-item'>
										<Link className='nav-link' to='/create'>
											Create Recipe
										</Link>
									</li>
									<li className='nav-item'>
										<Link className='nav-link' to='/my'>
											My Recipes
										</Link>
									</li>
								</React.Fragment>
							)}

							{!auth.isLoggedIn && (
								<Fragment>
									<li className='nav-item'>
										<Link
											className='nav-link '
											to='/login'
											tabIndex='-1'>
											Login
										</Link>
									</li>
									<li className='nav-item'>
										<Link
											className='nav-link '
											to='/register'>
											Register
										</Link>
									</li>
								</Fragment>
							)}
						</ul>

						{auth.isLoggedIn && (
							<React.Fragment>
								<li className='nav-item'>
									<span className='text-white'>
										{auth.fullName}
									</span>
								</li>
								<button
									className='btn btn-outline-danger m-2'
									onClick={signOut}>
									Logout
								</button>
							</React.Fragment>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
};

export default NavBar;
