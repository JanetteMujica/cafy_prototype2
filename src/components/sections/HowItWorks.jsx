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
						<h2 className='ho-heading-l'>What can CAFY do for you?</h2>
						<p className='ho-body'>
							Living with Parkinson's has its challenges, but you don't have to
							face them alone. CAFY helps you stay engaged in your care by
							identifying your care priorities, setting personal goals, and
							tracking what affects your well-being. Whether it’s symptoms,
							treatments, or simply staying active, CAFY supports you every step
							of the way.
						</p>
					</div>

					<div className='how-it-works__section'>
						<h3 className='ho-heading-m'>
							1. Set simple goals that matter to you
						</h3>
						<p className='ho-body'>
							Choose what's important in your physical health, mental wellbeing,
							or daily activities. We'll guide you through easy steps to track
							how you're feeling and send helpful tips just for you.
						</p>
						<p className='ho-body'>
							<Link to='/mygoals' className='ho-link'>
								Start setting my goals
							</Link>
						</p>
					</div>

					<div className='how-it-works__section'>
						<h3 className='ho-heading-m'>
							2. Keep track of your care priorities
						</h3>
						<p className='ho-body'>
							Notice changes in how you feel, move, or think? Jot them down in a
							few taps. Connect your Fitbit if you have one for sleep and
							activity insights. The more you track, the better we can support
							your care with tailored suggestions.
						</p>
						<p className='ho-body'>
							<Link to='/mytracking' className='ho-link'>
								Begin tracking now
							</Link>
						</p>
					</div>

					<div className='how-it-works__section'>
						<h3 className='ho-heading-m'>3. See your journey over time</h3>
						<p className='ho-body'>
							Watch your journey unfold in simple, easy-to-read charts. Spot
							patterns in your symptoms, see what helps, and celebrate small
							victories. Create summaries to share with your doctor or support
							group with just one click.
						</p>
						<p className='ho-body'>
							<Link to='/myrecords' className='ho-link'>
								View my journey
							</Link>
						</p>
					</div>
				</div>

				{/* Side panel */}
				<div className='ho-grid-column-one-third'>
					<div className='ho-panel'>
						<h2 className='ho-heading-m'>Need a helping hand?</h2>
						<p className='ho-body'>
							We're here for you whenever you have questions about using CAFY.
						</p>
						<p>
							<Link
								to='/help'
								className='ho-button ho-button--secondary ho-width-full'
							>
								Reach out for support
							</Link>
						</p>
						<h3 className='ho-heading-s'>Helpful resources </h3>
						<ul className='ho-list ho-list--bullet'>
							<li>
								<a href='#' className='ho-link'>
									Review my care tips
								</a>
							</li>
							<li>
								<a href='#' className='ho-link'>
									Find care ressources
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
