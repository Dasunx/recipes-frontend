import React from 'react';
import { Link } from 'react-router-dom';
const RecipeItem = ({ item }) => {
	return (
		<div key={item._id} className='card m-2' style={{ width: '18rem' }}>
			<div
				height='100px'
				className='card-img-top'
				style={{
					backgroundImage: `url("${item.image}")`,
					height: '200px'
				}}
				alt='Card image cap'></div>
			<div className='card-body'>
				<h5 className='card-title'>{item.recipeName}</h5>
				<p className='card-text'>
					{`${item.description.substring(0, 80)}...`}
				</p>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						Estimated Calories : {item.estCalories}
					</li>
					<li className='list-group-item'>
						By : {item.user.fullName} &nbsp;
						<i
							className='bi bi-check-circle-fill'
							style={{
								color: '#5a8ef7'
							}}></i>
					</li>
				</ul>
				<div className='card-body'>
					<Link
						to={`/recipe/${item._id}`}
						className='btn btn-primary'>
						view recipe
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RecipeItem;
