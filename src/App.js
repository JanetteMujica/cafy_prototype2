// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import MyGoalsPage from './pages/MyGoalsPage';
import MyTrackingPage from './pages/MyTrackingPage';
import MyJourneyPage from './pages/MyJourneyPage';
import './styles/main.css';

function App() {
	return (
		<Router basename='/cafy_prototype2'>
			<Layout>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/mygoals' element={<MyGoalsPage />} />
					<Route path='/mytracking' element={<MyTrackingPage />} />
					<Route path='/myjourney' element={<MyJourneyPage />} />
				</Routes>
			</Layout>
		</Router>
	);
}

export default App;
