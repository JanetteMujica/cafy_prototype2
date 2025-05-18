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
							Helps set your goals, track your life and view your records.
						</h2>
					</div>
				</div>

				<p className='ho-body-l'>
					A digital assistant designed to{' '}
					<span style={{ color: 'var(--color-blue-light)', fontWeight: 700 }}>
						empower
					</span>{' '}
					people living with Parkinson's.
				</p>

				<div className='button-group'>
					<Link to='/mygoals' className='ho-button'>
						Set my goals
					</Link>
					<Link to='/mytracking' className='ho-button ho-button--secondary'>
						Track my life
					</Link>
					<Link to='/myrecords' className='ho-button ho-button--secondary'>
						View my records
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Hero;
