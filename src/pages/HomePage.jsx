// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';

const HomePage = () => {
	return (
		<>
			{/* Hero Section */}
			<Hero />

			{/* Main Content */}
			<main className='ho-main'>
				<div className='ho-width-container'>
					<HowItWorks />
				</div>
			</main>
		</>
	);
};

export default HomePage;
