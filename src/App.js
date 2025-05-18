// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyGoalsPage from './pages/MyGoalsPage';
import MyTrackingPage from './pages/MyTrackingPage';
import MyRecordsPage from './pages/MyRecordsPage';
import './styles/main.css';

function App() {
	return (
		<Router>
			<Layout>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/mygoals' element={<MyGoalsPage />} />
					<Route path='/mytracking' element={<MyTrackingPage />} />
					<Route path='/myrecords' element={<MyRecordsPage />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
