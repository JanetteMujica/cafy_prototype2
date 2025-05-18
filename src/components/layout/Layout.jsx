// src/components/layout/Layout.jsx
import React from 'react';
import Navbar from '../common/Navbar';
import Footer from '../layout/Footer';

const Layout = ({ children }) => {
	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
