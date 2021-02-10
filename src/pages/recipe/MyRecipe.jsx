import React, { useEffect, useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthenticationContext';
import { NotificationContext } from '../../context/NotificationContext';

const MyRecipe = () => {
	const auth = useContext(AuthContext);
	const [re, setRe] = useState(false);
	const notification = useContext(NotificationContext);
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecipes] = useState();

	useEffect(async () => {
		try {
			const response = await axios.get(
				'http://localhost:5000/api/recipe'
			);
			setIsLoading(false);
			console.log(response.data.recipes);

			setRecipes(response.data.recipes);
		} catch (error) {}
	}, []);

	const deleteItem = async (id) => {
		console.log(auth.token);
		const config = {
			headers: {
				'x-auth-token': `${auth.token}`,
				'Content-Type': 'application/json'
			}
		};
		try {
			const body = {
				recipeId: id
			};
			const response = await axios.post(
				'http://localhost:5000/api/recipe/delete',
				body,
				config
			);

			if (response.status == 205) {
				notification.showNotification('Successfully deleted', false);
			} else {
				notification.showNotification('Cannot delete. try again', true);
			}
		} catch (error) {
			notification.showNotification('Cannot delete. try again', true);
		}

		<Redirect to='/' />;
	};

	const setRecipeCount = (b) => {
		setRe(b);
	};
	return (
		<React.Fragment>
			<div
				className='container-fluid home-intro-image'
				style={{
					backgroundImage:
						'url("https://lovefoodhatewaste.ca/wp-content/uploads/2020/11/FoodBackgroundNomeat.jpg")',
					height: '20vh'
				}}>
				<div className='row pt-5 text-start justify-content-center home-intro-row'>
					<div className='col-md-10 align-self-center home-intro-col'>
						<span className='home-intro-text'>
							<span className='mark'>My Recipes</span>
						</span>
					</div>
				</div>
			</div>
			<div className='container mt-5'>
				<div className='row justify-content-center'>
					{isLoading
						? 'Loading'
						: recipes &&
						  recipes.map((e) => {
								if (e.user._id == auth.userId) {
									if (!re) {
										setRecipeCount(true);
									}
									return (
										<div
											key={e._id}
											className='card m-2'
											style={{ width: '18rem' }}>
											<div
												height='100px'
												className='card-img-top'
												style={{
													backgroundImage: `url("${e.image}")`,
													height: '200px'
												}}
												alt='Card image cap'></div>
											<div className='card-body'>
												<h5 className='card-title'>
													{e.recipeName}
												</h5>
												<p className='card-text'>
													{`${e.description.substring(
														0,
														80
													)}...`}
												</p>
												<ul className='list-group list-group-flush'>
													<li className='list-group-item'>
														Estimated Calories :{' '}
														{e.estCalories}
													</li>
													<li className='list-group-item'>
														By : {e.user.fullName}{' '}
														&nbsp;
														<i
															className='bi bi-check-circle-fill'
															style={{
																color: '#5a8ef7'
															}}></i>
													</li>
												</ul>
												<div className='card-body'>
													<Link
														to={`/recipe/${e._id}`}
														className='btn btn-primary'>
														view recipe
													</Link>
													<button
														className='btn btn-danger m2'
														onClick={() => {
															if (
																window.confirm(
																	'Delete the item?'
																)
															) {
																deleteItem(
																	e._id
																);
															}
														}}>
														<i class='bi bi-trash-fill d-inline m2'></i>
													</button>
												</div>
											</div>
										</div>
									);
								}
						  })}
				</div>
				{!isLoading && (
					<React.Fragment>
						{!re && (
							<div className='container add-recipe p-5'>
								You haven't add any recipes
								<br />
								<Link
									className='btn btn-success mt-4'
									to='/create'>
									Add Recipe now
								</Link>
							</div>
						)}
					</React.Fragment>
				)}
			</div>
		</React.Fragment>
	);
};

export default MyRecipe;
