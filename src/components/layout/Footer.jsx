// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer className='footer'>
			<div className='ho-width-container'>
				<div className='footer__content'>
					{/* CAFY Column */}
					<div className='footer__section'>
						<h3 className='cafyp-emphasis'>
							<span style={{ color: 'var(--color-primary)', fontSize: '140%' }}>
								CAFY
							</span>
						</h3>
						<p className='ho-body-s'>
							A digital assistant designed to empower people living with
							Parkinson's.
						</p>

						<ul className='footer__links'>
							<li>
								<a href='#' className='ho-link'>
									Get assistance about this app
								</a>
							</li>
						</ul>
					</div>

					{/* Quick Links Column */}
					<div className='footer__section'>
						<h3 className='ho-heading-s'>Quick Links</h3>
						<ul className='footer__links'>
							<li>
								<Link to='/mygoals' className='ho-link'>
									My Goals
								</Link>
							</li>
							<li>
								<Link to='/mytracking' className='ho-link'>
									My Tracking
								</Link>
							</li>
							<li>
								<Link to='/myrecords' className='ho-link'>
									My Records
								</Link>
							</li>
						</ul>
					</div>

					{/* Resources Column */}
					<div className='footer__section'>
						<h3 className='ho-heading-s'>Resources</h3>
						<ul className='footer__links'>
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

				<div className='footer__bottom'>
					<p className='ho-body-s'>
						&copy; {new Date().getFullYear()} CAFY. All rights reserved.
					</p>
					<div className='footer__legal'>
						<Link to='/privacy' className='ho-link ho-body-s'>
							Privacy Policy
						</Link>
						<Link to='/terms' className='ho-link ho-body-s'>
							Terms of Use
						</Link>
						<Link to='/accessibility' className='ho-link ho-body-s'>
							Accessibility
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
