// src/components/sections/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import cafyLogo from '../../assets/images/CAFY_darkgrey.svg';

const Hero = () => {
	return (
		<section className='hero' aria-labelledby='main-heading'>
			<div className='hero__container ho-width-container'>
				<div className='hero__title-container'>
					<img src={cafyLogo} alt='CAFY Logo' className='hero__logo' />
					<div className='hero__title-text'>
						<h1 id='main-heading' className='ho-heading-xl'>
							<span className='cafyp-emphasis'>CAFY</span>
						</h1>
						<h2 className='ho-heading-xl'>
							Help you take control of your daily life with Parkinson's, one
							small step at a time.
						</h2>
					</div>
				</div>

				<p className='ho-body-l'>
					Your companion for living well with Parkinson's
				</p>

				<div className='button-group'>
					<Link to='/mygoals' className='ho-button'>
						Start setting my goals
					</Link>
					<Link to='/mytracking' className='ho-button ho-button--secondary'>
						Track my care priorities
					</Link>
					<Link to='/myrecords' className='ho-button ho-button--secondary'>
						View my journey
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Hero;
