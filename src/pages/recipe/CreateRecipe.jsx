import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthenticationContext';
import { NotificationContext } from '../../context/NotificationContext';

const CreateRecipe = () => {
	const notification = useContext(NotificationContext);
	const auth = useContext(AuthContext);
	const [ingredients, setIngredients] = useState([]);
	const [recipe, setRecipe] = useState({
		recipeName: '',
		description: '',
		image: '',
		method: '',
		estCalories: ''
	});

	const { recipeName, description, image, method, estCalories } = recipe;
	const [ingredient, setIngredient] = useState({
		name: '',
		amount: '',
		scale: 'gram'
	});
	const { name, amount, scale } = ingredient;

	const onIngridentChange = (e) => {
		setIngredient({
			...ingredient,
			[e.target.name]: e.target.value
		});
	};
	const onIngredientSubmit = async (e) => {
		e.preventDefault();
		setIngredients((ingredients) => [...ingredients, ingredient]);
		setIngredient({ name: '', amount: '', scale: 'gram' });
	};

	const onRecipeChange = (e) => {
		setRecipe({
			...recipe,
			[e.target.name]: e.target.value
		});
	};

	const onRecipeSubmit = async (e) => {
		e.preventDefault();
		const body = {
			...recipe,
			ingredients: ingredients
		};

		const config = {
			headers: {
				'x-auth-token': `${auth.token}`,
				'Content-Type': 'application/json'
			}
		};
		try {
			const response = await axios.post(
				'http://localhost:5000/recipe/add',
				body,
				config
			);

			if (response.data) {
				notification.showNotification('Successfully added', false);
			}

			setIngredient({ name: '', amount: '', scale: 'gram' });
			setRecipe({
				recipeName: '',
				description: '',
				image: '',
				method: '',
				estCalories: ''
			});
			setIngredients([]);
		} catch (error) {}
	};
	return (
		<div className='container mt-4 add-recipe'>
			<h2>Create a recipe</h2>
			{ingredients.length > 0 && (
				<div className='row justify-content-center '>
					<div className='col-md-4 text-start'>
						Added ingredients
						<ul className='list-group mt-2'>
							{ingredients &&
								ingredients.map((e, i) => {
									return (
										<li className='list-group-item' key={i}>
											{e.name} - {e.amount} {e.scale}{' '}
										</li>
									);
								})}
						</ul>
					</div>
				</div>
			)}
			<div className='row justify-content-center'>
				<div className='col-md-8 text-start'>
					<div className='ingredient-form '>
						<h4 className='text-center'>Ingredients</h4>
						<form onSubmit={onIngredientSubmit}>
							<div className='mb-3'>
								<label
									className='form-check-label'
									for='exampleCheck1'>
									name
								</label>
								<input
									type='text'
									name='name'
									value={name}
									onChange={onIngridentChange}
									className='form-control'
									id='name'
									required
								/>
							</div>
							<div className='row justify-content-between'>
								<div className='col-md-4'>
									<div className='mb-3'>
										<label
											className='form-check-label'
											for='exampleCheck1'>
											Amount
										</label>
										<input
											onChange={onIngridentChange}
											name='amount'
											value={amount}
											type='number'
											className='form-control'
											id='amount'
											required
										/>
									</div>
								</div>
								<div className='col-md-4'>
									<div className='mb-3'>
										<label
											className='form-check-label'
											for='exampleCheck1'>
											unit
										</label>
										<select
											className='form-select'
											name='scale'
											aria-label='Default select example'
											onChange={onIngridentChange}
											required>
											<option selected value='gram'>
												gram
											</option>
											<option value='tablespoons'>
												table spoons
											</option>
											<option value='teaspoons'>
												tea spoons
											</option>

											<option value='cups'>cups</option>
											<option value='items'>items</option>
										</select>
									</div>
								</div>
								<div className='col-md-2'>
									<div className='mb-3'>
										<div className='mb-3'>
											<label
												className='form-check-label'
												for='submitIngredient'>
												&nbsp;
											</label>
											<button className='btn btn-primary w-100'>
												Add
											</button>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className='add-recipe-form mt-4'>
				<div className='row justify-content-center'>
					<div className='col-md-8 text-start'>
						<form onSubmit={onRecipeSubmit}>
							<div className='mb-3'>
								<label for='recipeName' className='form-label'>
									Recipe name
								</label>
								<input
									type='text'
									name='recipeName'
									value={recipeName}
									onChange={onRecipeChange}
									className='form-control'
									id='recipeName'
									aria-describedby='emailHelp'
								/>
								<div id='emailHelp' className='form-text'>
									Ex: Chicken kurma
								</div>
							</div>
							<div className='mb-3'>
								<label for='description' className='form-label'>
									brief description.{' '}
									<span className='form-text'>
										80 characters minumum
									</span>
								</label>
								<textarea
									type='text'
									onChange={onRecipeChange}
									name='description'
									value={description}
									minLength='80'
									className='form-control'
									id='description'
								/>
							</div>
							<div className='mb-3'>
								<label className='form-check-label' for='image'>
									Image (url)
								</label>
								<input
									type='text'
									onChange={onRecipeChange}
									className='form-control'
									id='image'
									name='image'
									value={image}
								/>
							</div>
							<div className='mb-3'>
								<label
									for='instructionInput'
									className='form-label'>
									Instructions
									{/* <span className='form-text'>
										80 characters minumum
									</span> */}
								</label>
								<textarea
									rows='5'
									onChange={onRecipeChange}
									type='text'
									value={method}
									name='method'
									// minLength='180'
									className='form-control'
									id='instructionInput'
								/>
							</div>
							<div className='mb-3'>
								<label
									className='form-check-label'
									for='calories'>
									Estimated Calories
								</label>
								<input
									onChange={onRecipeChange}
									type='number'
									name='estCalories'
									value={estCalories}
									className='form-control'
									id='calories'
								/>
							</div>
							<button type='submit' className='btn btn-primary'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateRecipe;
