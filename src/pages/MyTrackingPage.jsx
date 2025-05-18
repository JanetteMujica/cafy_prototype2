// src/pages/MyTrackingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MyTrackingPage = () => {
	return (
		<main className='ho-main'>
			<div className='ho-width-container'>
				<h1 className='ho-heading-xl'>My Tracking</h1>
				<p className='ho-body-l'>Track your daily experiences and symptoms.</p>

				<div className='ho-grid-row'>
					{/* Main content column */}
					<div className='ho-grid-column-two-thirds'>
						{/* Journal section */}
						<section className='ho-margin-top-6'>
							<h2 className='ho-heading-l'>Log your daily journal</h2>
							<p className='ho-body'>
								How are you today? What's going well? Are you having any issues
								or concerns?
							</p>

							{/* Daily log form would go here */}
							<div className='ho-panel'>
								<p className='ho-body'>Journaling space coming soon...</p>
							</div>
							<div className='button-group'>
								<button className='ho-button ho-button--secondary'>
									Send to records
								</button>
							</div>
						</section>

						{/* Goals section */}
						<section>
							<h2 className='ho-heading-l'>
								Take a short survey on your goals
							</h2>
							<p className='ho-body'>
								Assess your life with Parkinson's by answering a quick survey
								about your goals, noting your thoughts, physical sensations, or
								any changes in your medication or symptoms.
							</p>

							{/* Daily log form would go here */}
							<div className='ho-panel'>
								<p className='ho-body'>
									Tracking form available as soon as you set your goals
								</p>

								<Link to='/mygoals' className='ho-button'>
									Set my goals
								</Link>
							</div>
						</section>

						{/* Connect devices section */}
						<section className='ho-margin-top-6'>
							<h2 className='ho-heading-l'>Connect your devices</h2>
							<p className='ho-body'>
								Connect your smart watch to automatically import data.
							</p>

							<div className='button-group'>
								<button className='ho-button ho-button--secondary'>
									Connect Smart Watch
								</button>
							</div>
						</section>
					</div>

					{/* Tips column - will move to bottom on mobile */}
					<div className='ho-grid-column-one-third'>
						<div className='ho-panel'>
							<h2 className='ho-heading-m'>Tracking tips</h2>
							<p className='ho-body'>
								Here are some tips for effective tracking:
							</p>
							<ul className='ho-list ho-list--bullet'>
								<li>Note any changes in medication or treatment</li>
								<li>Record both physical and emotional experiences</li>
								<li>
									Track exercice, sleep patterns and quality with your smart
									watch
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default MyTrackingPage;
