// src/pages/MyGoalsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const MyGoalsPage = () => {
	return (
		<main className='ho-main'>
			<div className='ho-width-container'>
				<h1 className='ho-heading-xl'>My Goals</h1>
				<p className='ho-body-l'>
					Set your goals and track your care-priorities to receive care-tips.
				</p>

				<Link to='' className='ho-button'>
					Set my goals
				</Link>

				<div className='ho-form-group'>
					<legend className='ho-fieldset-legend'>Tracking frequency</legend>
					<div className='ho-radios'>
						<div className='ho-radio'>
							<input
								type='radio'
								id='frequency-daily'
								name='frequency'
								value='daily'
								className='ho-radio__input'
								defaultChecked
							/>
							<label htmlFor='frequency-daily' className='ho-radio__label'>
								Daily
							</label>
						</div>
						<div className='ho-radio'>
							<input
								type='radio'
								id='frequency-weekly'
								name='frequency'
								value='weekly'
								className='ho-radio__input'
							/>
							<label htmlFor='frequency-weekly' className='ho-radio__label'>
								Weekly
							</label>
						</div>
						<div className='ho-radio'>
							<input
								type='radio'
								id='frequency-monthly'
								name='frequency'
								value='monthly'
								className='ho-radio__input'
							/>
							<label htmlFor='frequency-monthly' className='ho-radio__label'>
								Monthly
							</label>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default MyGoalsPage;
