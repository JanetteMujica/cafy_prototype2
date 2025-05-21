// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import TextToSpeechButton from '../components/common/TextToSpeechButton';

const HomePage = () => {
	return (
		<>
			{/* Main content wrapper */}
			<div id='readableContent'>
				{/* Hero Section */}
				<Hero />

				{/* Main Content */}
				<main className='ho-main'>
					<div className='ho-width-container'>
						<HowItWorks />
					</div>
				</main>
			</div>

			{/* Compact floating TTS button */}
			<TextToSpeechButton contentSelector='#readableContent' />
		</>
	);
};

export default HomePage;
