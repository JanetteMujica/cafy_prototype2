// Updated MyRecordsPage.jsx - removed visualization controls

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import ImprovedHealthChart from '../components/sections/ImprovedHealthChart';

const MyRecordsPage = () => {
	const [timeRange, setTimeRange] = useState('month');
	const [loading, setLoading] = useState(true);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
	const [journalEntries, setJournalEntries] = useState([]);
	const [filteredEntries, setFilteredEntries] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [entryType, setEntryType] = useState('all');
	const [sortBy, setSortBy] = useState('date-desc');
	const printContentRef = useRef(null);
	const [journalEntry, setJournalEntry] = useState('');

	// Demo data
	const categories = [
		'tremor',
		'lightheadedness',
		'constipation',
		'sleep',
		'mood',
		'energy',
	];

	// Sample events with very concise descriptions
	const demoEvents = [
		{
			id: 'event-1',
			date: new Date('2025-03-08'),
			type: 'Doctor Visit',
			description: 'Medication timing adjustment',
		},
		{
			id: 'event-2',
			date: new Date('2025-03-10'),
			type: 'Medication Change',
			description: 'Earlier morning dose',
		},
		{
			id: 'event-3',
			date: new Date('2025-03-12'),
			type: 'Physical Therapy',
			description: 'Balance exercises',
		},
		{
			id: 'event-4',
			date: new Date('2025-03-15'),
			type: 'Family Visit',
			description: 'Grandchildren visit',
		},
		{
			id: 'event-5',
			date: new Date('2025-03-20'),
			type: 'Medication Change',
			description: 'Evening dose adjustment',
		},
		{
			id: 'event-6',
			date: new Date('2025-03-28'),
			type: 'Fall',
			description: 'Minor fall in bedroom',
		},
	];

	// Journal entries - longer experiences, shorter events
	const JOURNAL_ENTRIES = [
		// Experience entries - original length
		{
			id: 'journal-1',
			type: 'experience',
			timestamp: '2025-03-01T20:15:00.000Z',
			content:
				"Wine tasting event today with the local sommelier club. Noticed my tremor was more pronounced while trying to hold the glass. My friend John suggested using stemless glasses which worked better. I need to remember this adaptation for future tastings. Despite the tremor challenges, I was still able to distinguish the subtle notes in the Cabernet - my sense of taste hasn't been affected.",
			tags: ['wine tasting', 'tremor', 'adaptation'],
		},
		{
			id: 'journal-2',
			type: 'experience',
			timestamp: '2025-03-03T21:30:00.000Z',
			content:
				'Felt very lightheaded this morning when getting out of bed. Had to sit back down for about 2 minutes before standing again more slowly. This has been happening more frequently in the mornings. I should mention this pattern to Dr. Williams at my appointment on the 8th. Timing my first medication dose better might help with this.',
			tags: ['lightheadedness', 'morning', 'medication timing'],
		},
		{
			id: 'journal-3',
			type: 'event',
			eventType: 'exercise_session',
			timestamp: '2025-03-05T11:45:00.000Z',
			content:
				"Parkinson's exercise class. Focused on balance and core strength. Stiffness reduced for several hours after.",
			tags: ['exercise', 'balance', 'stiffness'],
		},
		{
			id: 'journal-4',
			type: 'experience',
			timestamp: '2025-03-07T19:00:00.000Z',
			content:
				"Preparing for tomorrow's neurology appointment. I've been tracking my symptoms more carefully this month. Main concerns to discuss: 1) Morning tremor is consistently worse before first medication dose, 2) Lightheadedness upon standing has increased, 3) Sleep disruption - waking around 5am with increased tremor. My goals are to adjust medication timing and discuss strategies for the lightheadedness.",
			tags: ['appointment prep', 'symptoms', 'medication'],
		},
		{
			id: 'journal-5',
			type: 'event',
			eventType: 'doctor_appointment',
			timestamp: '2025-03-08T16:00:00.000Z',
			content:
				'Dr. Williams suggested earlier morning dose (6am vs 8am) for tremor and moving evening dose to 7pm for sleep.',
			tags: ['appointment', 'medication timing', 'tremor'],
		},
		{
			id: 'journal-6',
			type: 'experience',
			timestamp: '2025-03-10T09:30:00.000Z',
			content:
				'Started the new medication schedule today. Taking first dose at 6am required setting an alarm, but I was able to go back to sleep afterward. By the time I got up at 7:30, I noticed less tremor than usual. Will continue monitoring this change. Had some constipation issues this morning - need to increase my water and fiber intake.',
			tags: ['medication', 'tremor', 'constipation'],
		},
		{
			id: 'journal-7',
			type: 'event',
			eventType: 'medication_change',
			timestamp: '2025-03-10T08:00:00.000Z',
			content:
				'Started taking first Carbidopa/Levodopa dose at 6am instead of 8am to address morning tremors.',
			tags: ['medication', 'tremor', 'treatment'],
		},
		{
			id: 'journal-8',
			type: 'experience',
			timestamp: '2025-03-14T19:45:00.000Z',
			content:
				'Margaret and I worked in the garden today. I found that the repetitive motions of planting seedlings actually helped reduce my tremor temporarily. The gardening gloves with extra grip were helpful when handling small seeds. I did notice increased fatigue after about an hour. Need to remember to take breaks every 30-45 minutes during physical activities.',
			tags: ['gardening', 'tremor', 'fatigue', 'adaptation'],
		},
		{
			id: 'journal-9',
			type: 'event',
			eventType: 'family_activity',
			timestamp: '2025-03-15T18:30:00.000Z',
			content:
				'Grandchildren visit. Tremor less noticeable during board games. Mental engagement seems to help temporarily.',
			tags: ['family', 'tremor', 'mental engagement'],
		},
		{
			id: 'journal-10',
			type: 'experience',
			timestamp: '2025-03-18T21:15:00.000Z',
			content:
				"The new medication schedule is definitely helping with morning tremors. They're still present but less severe. Sleep is still disrupted though - waking around 4:30-5am with increased tremor. I'm going to try moving my last dose to exactly 7pm as Dr. Williams suggested to see if that helps. Started using a weighted blanket last night which seemed to help with the restlessness in my legs.",
			tags: ['medication', 'tremor', 'sleep', 'adaptation'],
		},
		{
			id: 'journal-11',
			type: 'event',
			eventType: 'medication_change',
			timestamp: '2025-03-20T08:45:00.000Z',
			content:
				'Adjusted evening medication dose to 7pm exactly as recommended for improved sleep.',
			tags: ['medication timing', 'sleep', 'self-management'],
		},
		{
			id: 'journal-12',
			type: 'experience',
			timestamp: '2025-03-21T17:30:00.000Z',
			content:
				"Went grocery shopping today. Used the cart for support which helped with stability. I've started organizing my shopping list by store layout to minimize unnecessary walking - an efficient strategy I learned from the Parkinson's support group. Noticed tremor increases when reaching for items on higher shelves. May need to ask for assistance with those items in the future.",
			tags: ['shopping', 'adaptation', 'tremor', 'energy conservation'],
		},
		{
			id: 'journal-13',
			type: 'event',
			eventType: 'fall_incident',
			timestamp: '2025-03-28T08:30:00.000Z',
			content:
				'Minor fall when getting out of bed too quickly. No injuries. Forgot to sit at edge before standing.',
			tags: ['fall', 'lightheadedness', 'morning', 'safety'],
		},
		{
			id: 'journal-14',
			type: 'experience',
			timestamp: '2025-03-30T14:00:00.000Z',
			content:
				'Sunday afternoon with Margaret. We went for a short walk in the neighborhood - about 20 minutes. I used my walking stick for stability. Noticed less freezing of gait when I focused on taking slightly wider steps as the physical therapist suggested. The visual cues of sidewalk cracks also seemed to help prevent freezing. Beautiful spring day, which lifted my mood considerably.',
			tags: ['walking', 'freezing', 'adaptation', 'mood'],
		},
		{
			id: 'journal-15',
			type: 'event',
			eventType: 'broken_hip',
			timestamp: '2025-03-31T10:25:00.000Z',
			content:
				'Fell while walking in garden. Rushed to ER. X-rays confirmed broken hip. Surgery scheduled for tomorrow.',
			tags: ['fall', 'broken hip', 'emergency', 'hospital'],
		},
		{
			id: 'journal-16',
			type: 'event',
			eventType: 'nutrition_change',
			timestamp: '2025-04-01T10:15:00.000Z',
			content:
				'Started prune juice and psyllium husk supplement to manage constipation.',
			tags: ['nutrition', 'constipation', 'self-management'],
		},
	];

	// Generate sample data - modified to better show impact of events
	const generateDataPoints = () => {
		const dateRange = 30; // Show 30 days of data
		const today = new Date('2025-04-01'); // Fixed date for demo
		const dataPoints = [];

		// Generate dates
		for (let i = 0; i < dateRange; i++) {
			const date = new Date(today);
			date.setDate(today.getDate() - dateRange + i + 1);

			// Pattern-based data (not just random)
			const dayOfWeek = date.getDay(); // 0 is Sunday, 6 is Saturday

			// Find events for this date
			const eventsForDate = demoEvents.filter(
				(event) => event.date.toDateString() === date.toDateString()
			);

			// Make data reflect impact of medication changes (events on 3/10 and 3/20)
			const dayNum = date.getDate();
			const monthNum = date.getMonth();

			// Tremors worse in morning, better with medication after 3/10
			let tremorValue = 3;
			if (monthNum === 2) {
				// March
				if (dayNum < 10) tremorValue = 4;
				else if (dayNum < 20) tremorValue = 2;
				else tremorValue = 1;
			}

			// Sleep issues - show improvement after 3/20 evening dose adjustment
			let sleepValue = 3;
			if (monthNum === 2 && dayNum >= 21) {
				sleepValue = 2;
			}

			// Energy levels - pattern related to sleep
			const energyValue = sleepValue > 2 ? 2 : 4;

			// Mood - better on weekends, improved after family visit on 3/15
			let moodValue = 3;
			if (dayOfWeek === 0 || dayOfWeek === 6) moodValue = 2;
			if (monthNum === 2 && dayNum >= 15)
				moodValue = dayOfWeek === 0 || dayOfWeek === 6 ? 1 : 2;

			// Add visualization point
			dataPoints.push({
				date,
				events: eventsForDate,
				values: {
					tremor: tremorValue,
					lightheadedness: monthNum === 2 && dayNum > 10 ? 2 : 3,
					constipation: monthNum === 2 && dayNum > 12 ? 1 : 3,
					sleep: sleepValue,
					mood: moodValue,
					energy: energyValue,
				},
			});
		}

		return dataPoints;
	};

	const dataPoints = generateDataPoints();

	useEffect(() => {
		// Simulate loading data
		setLoading(true);
		setTimeout(() => {
			setJournalEntries(JOURNAL_ENTRIES);
			setFilteredEntries(JOURNAL_ENTRIES);
			setTrackedCategories(categories);
			setSelectedCategory('tremor');
			setLoading(false);
		}, 800);
	}, []);

	// Set tracking categories state
	const [trackedCategories, setTrackedCategories] = useState([]);

	// Handle time range selection change
	const handleTimeRangeChange = (e) => {
		setTimeRange(e.target.value);
	};

	// Handle category selection change
	const handleCategoryChange = (e) => {
		setSelectedCategory(e.target.value);
	};

	// Format date for display
	const formatDate = (timestamp) => {
		const date = new Date(timestamp);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		});
	};

	// Get color for severity level - kept for reference
	const getSeverityColor = (severity) => {
		switch (severity) {
			case 1:
				return '#000000';
			case 2:
				return '#333333';
			case 3:
				return '#666666';
			case 4:
				return '#999999';
			case 5:
				return '#CCCCCC';
			default:
				return '#EEEEEE';
		}
	};

	// Journal entries filtering logic
	useEffect(() => {
		let filtered = [...journalEntries];

		// Filter by search term
		if (searchTerm) {
			const term = searchTerm.toLowerCase();
			filtered = filtered.filter(
				(entry) =>
					entry.content.toLowerCase().includes(term) ||
					entry.tags.some((tag) => tag.toLowerCase().includes(term))
			);
		}

		// Filter by entry type
		if (entryType !== 'all') {
			filtered = filtered.filter((entry) => entry.type === entryType);
		}

		// Sort entries
		filtered.sort((a, b) => {
			const dateA = new Date(a.timestamp);
			const dateB = new Date(b.timestamp);

			if (sortBy === 'date-asc') {
				return dateA - dateB;
			} else if (sortBy === 'date-desc') {
				return dateB - dateA;
			}
			return 0;
		});

		setFilteredEntries(filtered);
	}, [journalEntries, searchTerm, entryType, sortBy]);

	// Print functionality
	const handlePrint = () => {
		window.print();
	};

	// Handle download of journal entries as CSV
	const handleDownloadCSV = () => {
		// Create CSV content
		let csvContent = 'data:text/csv;charset=utf-8,';
		csvContent += 'Date,Type,Content,Tags\n';

		filteredEntries.forEach((entry) => {
			const formattedDate = formatDate(entry.timestamp);
			const type =
				entry.type === 'event'
					? `Event (${entry.eventType || 'Other'})`
					: 'Experience';
			const content = `"${entry.content.replace(/"/g, '""')}"`;
			const tags = entry.tags.join(', ');

			csvContent += `${formattedDate},${type},${content},${tags}\n`;
		});

		// Create download link and trigger click
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute(
			'download',
			`cafy-journal-${new Date().toISOString().split('T')[0]}.csv`
		);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	// Handle journal entry submission
	const handleJournalSubmit = (e) => {
		e.preventDefault();

		if (!journalEntry.trim()) return;

		// Create a new entry
		const newEntry = {
			id: `journal-${Date.now()}`,
			type: 'experience',
			timestamp: new Date().toISOString(),
			content: journalEntry,
			tags: ['observation', 'data-pattern'],
		};

		// Add to journal entries
		const updatedEntries = [newEntry, ...journalEntries];
		setJournalEntries(updatedEntries);

		// If currently showing experiences or all entries, update filtered entries
		if (entryType === 'all' || entryType === 'experience') {
			setFilteredEntries([newEntry, ...filteredEntries]);
		}

		// Clear the input
		setJournalEntry('');

		// Show success message
		setStatusMessage({
			text: 'Your observation has been added to your journal!',
			type: 'success',
		});

		// Clear message after 5 seconds
		setTimeout(() => {
			setStatusMessage({ text: '', type: '' });
		}, 5000);
	};

	return (
		<main className='ho-main'>
			<div className='ho-width-container'>
				<h1 className='ho-heading-xl'>My Records</h1>
				<p className='ho-body-l'>View and analyze your health data patterns.</p>

				{/* Status Message */}
				{statusMessage.text && (
					<div className={`status-message ${statusMessage.type}`} role='alert'>
						{statusMessage.text}
					</div>
				)}

				<div className='ho-grid-row'>
					<div className='ho-grid-column-full'>
						<h2 className='ho-heading-l'>Data Visualization</h2>

						{loading ? (
							<div className='ho-panel'>
								<p className='ho-body'>Loading your data...</p>
							</div>
						) : (
							<>
								{/* Removed visualization controls section as requested */}

								{/* Improved Health Chart Component */}
								<ImprovedHealthChart
									categories={categories}
									dataPoints={dataPoints}
									events={demoEvents}
									initialCategory={selectedCategory}
									timeRange={timeRange}
									onTimeRangeChange={handleTimeRangeChange}
								/>

								{/* Observations Form */}
								<div className='ho-panel observations-section'>
									<h3 className='ho-heading-m'>Record Your Observations</h3>
									<p className='ho-body'>
										Document your insights about the patterns you observe in
										your data. What changes have you noticed? How do these
										patterns relate to your activities or medication?
									</p>

									<form
										className='observations-form'
										onSubmit={handleJournalSubmit}
									>
										<div className='ho-form-group'>
											<label htmlFor='journal-entry' className='ho-label'>
												Your observations:
											</label>
											<textarea
												id='journal-entry'
												value={journalEntry}
												onChange={(e) => setJournalEntry(e.target.value)}
												placeholder='Do you notice any patterns? How do your symptoms relate to your daily activities or medication?'
												rows={4}
												className='ho-textarea'
												aria-label='Observations about your data patterns'
											></textarea>
										</div>
										<button
											type='submit'
											className='ho-button'
											disabled={!journalEntry.trim()}
										>
											Save to record
										</button>
									</form>
								</div>
							</>
						)}

						{/* Journal Entries Section - fully restored */}
						<h2 className='ho-heading-l'>Journal Entries</h2>
						<div className='ho-panel journal-section'>
							<div className='journal-controls'>
								<div className='journal-filter-row'>
									<div className='search-container'>
										<input
											type='text'
											placeholder='Search entries...'
											value={searchTerm}
											onChange={(e) => setSearchTerm(e.target.value)}
											className='search-input ho-input'
										/>
									</div>

									<div className='filter-buttons'>
										<button
											className={`filter-button ${
												entryType === 'all' ? 'active' : ''
											}`}
											onClick={() => setEntryType('all')}
										>
											All
										</button>
										<button
											className={`filter-button ${
												entryType === 'experience' ? 'active' : ''
											}`}
											onClick={() => setEntryType('experience')}
										>
											Experiences
										</button>
										<button
											className={`filter-button ${
												entryType === 'event' ? 'active' : ''
											}`}
											onClick={() => setEntryType('event')}
										>
											Events
										</button>
									</div>

									<div className='sort-options'>
										<select
											value={sortBy}
											onChange={(e) => setSortBy(e.target.value)}
											className='ho-select'
										>
											<option value='date-desc'>Newest first</option>
											<option value='date-asc'>Oldest first</option>
										</select>
									</div>
								</div>

								<div className='export-options'>
									<button
										className='ho-button ho-button--secondary'
										onClick={handlePrint}
									>
										Print Entries
									</button>
									<button
										className='ho-button ho-button--secondary'
										onClick={handleDownloadCSV}
									>
										Export as CSV
									</button>
								</div>
							</div>

							<div className='journal-entries' ref={printContentRef}>
								{filteredEntries.length > 0 ? (
									filteredEntries.map((entry) => (
										<div
											key={entry.id}
											className={`journal-entry ${
												entry.type === 'event'
													? 'event-entry'
													: 'experience-entry'
											}`}
										>
											<div className='entry-header'>
												<div className='entry-meta'>
													{entry.type === 'event' && (
														<span className='entry-star'>★</span>
													)}
													<span className='entry-type'>
														{entry.type === 'event'
															? `Event (${
																	entry.eventType
																		? entry.eventType.replace('_', ' ')
																		: 'Other'
															  })`
															: 'Experience'}
													</span>
													<span className='entry-date'>
														{formatDate(entry.timestamp)}
													</span>
												</div>
											</div>
											<div className='entry-content'>
												<p>{entry.content}</p>
											</div>
											<div className='entry-tags'>
												{entry.tags.map((tag, idx) => (
													<span key={idx} className='tag'>
														{tag}
													</span>
												))}
											</div>
										</div>
									))
								) : (
									<p className='ho-body'>
										No journal entries match your current filters.
									</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default MyRecordsPage;
