import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewRecipe = (props) => {
	const [isLoading, setIsLoading] = useState(true);
	const [recipe, setRecipe] = useState();
	const [error, setError] = useState();
	useState(async () => {
		try {
			const response = await axios.get(
				`https://recipes-backend-2021.herokuapp.com/api/recipe/get/${props.match.params.id}`
			);

			if (response.status == 200) {
				setRecipe(response.data.recipe);
			} else {
				setError('No recipe found');
			}
		} catch (error) {
			setError('No recipe found');
		}
		setIsLoading(false);
	}, []);
	return (
		<React.Fragment>
			{isLoading ? (
				'Laoding'
			) : (
				<div className='container mt-4 add-recipe mb-4'>
					{error != null ? (
						<div className='alert alert-danger'>{error}</div>
					) : (
						<div>
							<span className='recipe-view-title'>
								{recipe.recipeName}
							</span>

							<div className='row justify-content-center'>
								<div className='col-md-8'>
									<div
										className='recipe-view-image'
										style={{
											backgroundImage: `url("${recipe.image}")`,
											height: '50vh'
										}}></div>
								</div>
							</div>

							<div className='row justify-content-center mt-3'>
								<div className='col-md-8 text-start'>
									<h5>Ingredients</h5>

									<div className='row'>
										<div className='col-sm-12 col-md-12 col-12  col-xs-12 col-lg-6'>
											{recipe.ingredients.length > 0 && (
												<ul className='list-group mt-2'>
													{recipe.ingredients &&
														recipe.ingredients.map(
															(e, i) => {
																return (
																	<li
																		className='list-group-item'
																		key={i}>
																		{e.name}{' '}
																		-{' '}
																		{
																			e.amount
																		}{' '}
																		{
																			e.scale
																		}{' '}
																	</li>
																);
															}
														)}
												</ul>
											)}
										</div>
									</div>
								</div>
							</div>

							<div className='row justify-content-center mt-3 mb-5'>
								<div className='col-md-8 text-start'>
									<h5>Instructions</h5>

									{recipe.description}
									<br />
									{recipe.method}
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</React.Fragment>
	);
};

export default ViewRecipe;
