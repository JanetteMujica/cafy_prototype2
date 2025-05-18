// src/components/sections/HowItWorks.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
	return (
		<div className='how-it-works'>
			<div className='ho-grid-row'>
				{/* First section */}
				<div className='ho-grid-column-two-thirds'>
					<div className='how-it-works__section'>
						<h2 className='ho-heading-l'>How CAFY works</h2>
						<p className='ho-body'>
							CAFY helps manage your daily life with Parkinson's. By setting
							goals and tracking your experiences, you can receive care-tips,
							spot patterns, make informed choices about your health, and share
							updates with caregivers, support groups, and healthcare providers.
						</p>
					</div>

					<div className='how-it-works__section'>
						<h3 className='ho-heading-m'>1. Set goals</h3>
						<p className='ho-body'>
							Select areas of your life related to physical health, mental
							well-being, or lifestyle. Then, use an easy form to track your
							experiences and receive personalized care tips.
						</p>
						<p className='ho-body'>
							<Link to='/mygoals' className='ho-link'>
								Set my goals
							</Link>
						</p>
					</div>

					<div className='how-it-works__section'>
						<h3 className='ho-heading-m'>
							2. Track your life with Parkinson's
						</h3>
						<p className='ho-body'>
							Evaluate different aspects of your life by documenting your
							thoughts, physical sensations, or changes in medication and
							symptoms. You can also connect your Fitbit for added insights.
						</p>
						<p className='ho-body'>
							<Link to='/mytracking' className='ho-link'>
								Start my tracking
							</Link>
						</p>
					</div>

					<div className='how-it-works__section'>
						<h3 className='ho-heading-m'>3. View your records</h3>
						<p className='ho-body'>
							View your data in a simple chart. Spot patterns in your
							Parkinson's journey and log them in your journal. You can also
							generate summaries for doctor visits or support group meetings.
						</p>
						<p className='ho-body'>
							<Link to='/myrecords' className='ho-link'>
								View my records
							</Link>
						</p>
					</div>
				</div>

				{/* Side panel */}
				<div className='ho-grid-column-one-third'>
					<div className='ho-panel'>
						<h2 className='ho-heading-m'>Help and support</h2>
						<p className='ho-body'>Get assistance with using CAFY.</p>
						<Link
							to='/help'
							className='ho-button ho-button--secondary ho-width-full'
						>
							Contact support
						</Link>
						<h3 className='ho-heading-s'>Useful resources</h3>
						<ul className='ho-list ho-list--bullet'>
							<li>
								<a href='#' className='ho-link'>
									Find a care provider
								</a>
							</li>
							<li>
								<a href='#' className='ho-link'>
									Find a support group
								</a>
							</li>
							<li>
								<a href='#' className='ho-link'>
									Read about Parkinson's
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
