// src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// If you have a logo, uncomment the next line
// import logo from '../../assets/images/logo-placeholder.svg';

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const isHomePage = location.pathname === '/';

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const isActive = (path) => {
		return location.pathname === path ? 'navbar__item--active' : '';
	};

	return (
		<nav className='navbar' role='navigation' aria-label='Main navigation'>
			<div className='navbar__logo'>
				{/* If you have a logo, uncomment the next line */}
				{/* <img src={logo} alt="CAFY Logo" /> */}

				{/* Only show CAFY text if not on home page */}
				{!isHomePage && (
					<Link to='/' className='navbar__logo-text'>
						CAFY
					</Link>
				)}
			</div>

			<button
				className='navbar__toggle'
				onClick={toggleMenu}
				aria-expanded={isMenuOpen}
				aria-controls='main-menu'
				aria-label='Toggle menu'
			>
				{isMenuOpen ? '✕' : '☰'}
			</button>

			<div
				id='main-menu'
				className={`navbar__menu ${isMenuOpen ? 'navbar__menu--active' : ''}`}
			>
				<Link
					to='/mygoals'
					className={`navbar__item ${isActive('/mygoals')}`}
					onClick={() => setIsMenuOpen(false)}
				>
					My Goals
				</Link>
				<Link
					to='/mytracking'
					className={`navbar__item ${isActive('/mytracking')}`}
					onClick={() => setIsMenuOpen(false)}
				>
					My Tracking
				</Link>
				<Link
					to='/myrecords'
					className={`navbar__item ${isActive('/myrecords')}`}
					onClick={() => setIsMenuOpen(false)}
				>
					My Records
				</Link>
			</div>
		</nav>
	);
};

export default Navbar;
