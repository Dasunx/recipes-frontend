import React, { useEffect, useState, useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../context/AuthenticationContext';
import RecipeItem from '../components/shared/RecipeComponents/RecipeItem';

const Home = () => {
	const auth = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [recipes, setRecipes] = useState();

	useEffect(async () => {
		try {
			const response = await axios.get(
				'https://recipes-backend-2021.herokuapp.com/api/recipe'
			);
			setIsLoading(false);
			console.log(response.data.recipes);

			setRecipes(response.data.recipes);
		} catch (error) {}
	}, []);

	return (
		<React.Fragment>
			<div
				className='container-fluid home-intro-image'
				style={{
					backgroundImage:
						'url("https://lovefoodhatewaste.ca/wp-content/uploads/2020/11/FoodBackgroundNomeat.jpg")',
					height: '60vh'
				}}>
				<div className='row pt-5 text-start justify-content-center home-intro-row'>
					<div className='col-md-10 align-self-center home-intro-col'>
						<span className='home-intro-text'>
							Find <span className='mark'>healthy</span> and{' '}
							<br /> <span className='mark'>yummy</span> food
							recipes <br /> by expert chefs
						</span>
					</div>
				</div>
			</div>
			<div className='container mt-4'>
				<div className='row justify-content-center'>
					{isLoading
						? 'Loading'
						: recipes &&
						  recipes.map((e) => {
								return <RecipeItem item={e} key={e._id} />;
						  })}
				</div>
			</div>
		</React.Fragment>
	);
};

export default Home;
