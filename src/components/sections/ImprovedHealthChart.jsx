// Updated ImprovedHealthChart.jsx with left-aligned event labels and bold text

import React, { useState } from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	ReferenceLine,
} from 'recharts';

const ImprovedHealthChart = ({
	categories,
	dataPoints,
	events,
	initialCategory,
	timeRange,
	onTimeRangeChange,
}) => {
	const [selectedCategory, setSelectedCategory] = useState(
		initialCategory || 'tremor'
	);
	const [showAllCategories, setShowAllCategories] = useState(false);

	// Prepare data for Recharts
	const chartData = dataPoints.map((point) => {
		const dayData = {
			date: point.date,
			dateStr: point.date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric',
			}),
			hasEvent: point.events.length > 0,
		};

		// Add individual category values
		categories.forEach((category) => {
			dayData[category] = point.values[category];
		});

		// Add event information
		if (point.events.length > 0) {
			dayData.event = point.events[0].type;
			dayData.eventDescription = point.events[0].description;

			// Set color based on event type
			const eventType = point.events[0].type.toLowerCase();
			if (eventType.includes('medication')) {
				dayData.eventColor = '#E65100'; // Orange for medication
			} else if (
				eventType.includes('doctor') ||
				eventType.includes('therapy')
			) {
				dayData.eventColor = '#2196F3'; // Blue for medical appointments
			} else if (eventType.includes('fall')) {
				dayData.eventColor = '#F44336'; // Red for falls
			} else if (eventType.includes('family') || eventType.includes('social')) {
				dayData.eventColor = '#4CAF50'; // Green for social events
			} else {
				dayData.eventColor = '#FF9800'; // Default orange
			}
		}

		return dayData;
	});

	// Get color for category
	const getCategoryColor = (category) => {
		const colorMap = {
			tremor: '#8884d8',
			lightheadedness: '#82ca9d',
			constipation: '#ffc658',
			sleep: '#0088FE',
			mood: '#FF8042',
			energy: '#00C49F',
		};
		return colorMap[category] || '#000000';
	};

	// Custom tooltip to show data values only (not events)
	const CustomTooltip = ({ active, payload, label }) => {
		if (active && payload && payload.length) {
			return (
				<div
					className='custom-tooltip'
					style={{
						backgroundColor: 'white',
						padding: '10px',
						border: '1px solid #ccc',
						borderRadius: '8px',
						boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
					}}
				>
					<p
						className='date'
						style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}
					>
						{payload[0].payload.dateStr}
					</p>

					{payload.map((entry, index) => {
						// Only show category values, not the event or date fields
						if (
							[
								'date',
								'dateStr',
								'event',
								'eventDescription',
								'eventColor',
								'hasEvent',
							].includes(entry.dataKey)
						) {
							return null;
						}

						return (
							<p
								key={`item-${index}`}
								style={{ margin: '3px 0', color: entry.color }}
							>
								<span
									style={{ fontWeight: 'bold', textTransform: 'capitalize' }}
								>
									{entry.dataKey}:{' '}
								</span>
								<span>Level {entry.value}</span>
							</p>
						);
					})}
				</div>
			);
		}
		return null;
	};

	// Generate event labels below the chart instead of on it
	const EventLabels = () => {
		// Group events by date
		const eventsByDate = {};
		chartData.forEach((point) => {
			if (point.hasEvent) {
				eventsByDate[point.dateStr] = {
					event: point.event,
					description: point.eventDescription,
					color: point.eventColor,
				};
			}
		});

		return (
			<div
				className='event-labels'
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'flex-start', // Left-aligned
					alignItems: 'flex-start',
					marginTop: '5px', // Reduced spacing between chart and labels
					marginBottom: '20px',
					gap: '8px',
					paddingLeft: '10px', // Match chart padding
				}}
			>
				{Object.keys(eventsByDate).map((dateStr, index) => {
					const event = eventsByDate[dateStr];
					return (
						<div
							key={`event-label-${index}`}
							style={{
								backgroundColor: 'white',
								border: `1px solid ${event.color}`,
								borderLeft: `4px solid ${event.color}`,
								borderRadius: '4px',
								padding: '4px 8px',
								maxWidth: '140px',
								fontSize: '12px',
								boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
							}}
						>
							<div style={{ fontWeight: 'bold', color: event.color }}>
								{dateStr} <span style={{ marginLeft: '2px' }}>★</span>
							</div>
							<div style={{ fontWeight: 'bold' }}>{event.event}</div>{' '}
							{/* Made text bold */}
							<div
								style={{
									fontWeight: 'bold',
									fontSize: '10px',
									marginTop: '2px',
								}}
							>
								{' '}
								{/* Made text bold */}
								{event.description}
							</div>
						</div>
					);
				})}
			</div>
		);
	};

	// Events for reference lines - Still using this for the chart
	const createEventReferenceLines = () => {
		return events.map((event) => {
			// Find matching color based on event type
			let eventColor = '#FF9800'; // Default orange

			const eventType = event.type.toLowerCase();
			if (eventType.includes('medication')) {
				eventColor = '#E65100'; // Orange for medication
			} else if (
				eventType.includes('doctor') ||
				eventType.includes('therapy')
			) {
				eventColor = '#2196F3'; // Blue for medical appointments
			} else if (eventType.includes('fall')) {
				eventColor = '#F44336'; // Red for falls
			} else if (eventType.includes('family') || eventType.includes('social')) {
				eventColor = '#4CAF50'; // Green for social events
			}

			return (
				<ReferenceLine
					key={event.id}
					x={event.date.toLocaleDateString('en-US', {
						month: 'short',
						day: 'numeric',
					})}
					stroke={eventColor}
					strokeWidth={2}
					strokeDasharray='3 3'
				/>
			);
		});
	};

	const handleCategoryToggle = (category) => {
		if (selectedCategory === category) {
			// If clicking the already selected category, show all
			setShowAllCategories(!showAllCategories);
		} else {
			// Otherwise, select this category and turn off show all
			setSelectedCategory(category);
			setShowAllCategories(false);
		}
	};

	// Generate insights based on data
	const generateInsights = () => {
		const insights = [];

		// Check for medication changes and their effects
		const medicationEvents = events.filter((e) =>
			e.type.toLowerCase().includes('medication')
		);
		medicationEvents.forEach((event) => {
			const eventDate = event.date;
			const beforeEventData = chartData.filter(
				(d) => new Date(d.date) < eventDate
			);
			const afterEventData = chartData.filter(
				(d) =>
					new Date(d.date) > eventDate &&
					new Date(d.date) <
						new Date(eventDate.getTime() + 7 * 24 * 60 * 60 * 1000)
			); // 7 days after

			if (beforeEventData.length && afterEventData.length) {
				// Check tremor changes
				const avgTremorBefore =
					beforeEventData.reduce((sum, point) => sum + point.tremor, 0) /
					beforeEventData.length;
				const avgTremorAfter =
					afterEventData.reduce((sum, point) => sum + point.tremor, 0) /
					afterEventData.length;

				if (Math.abs(avgTremorAfter - avgTremorBefore) >= 0.5) {
					insights.push(
						`Your <strong>tremor symptoms</strong> ${
							avgTremorAfter < avgTremorBefore ? 'improved' : 'increased'
						} after ${event.description} on ${eventDate.toLocaleDateString(
							'en-US',
							{ month: 'short', day: 'numeric' }
						)}`
					);
				}

				// Check sleep changes
				const avgSleepBefore =
					beforeEventData.reduce((sum, point) => sum + point.sleep, 0) /
					beforeEventData.length;
				const avgSleepAfter =
					afterEventData.reduce((sum, point) => sum + point.sleep, 0) /
					afterEventData.length;

				if (Math.abs(avgSleepAfter - avgSleepBefore) >= 0.5) {
					insights.push(
						`Your <strong>sleep quality</strong> ${
							avgSleepAfter < avgSleepBefore ? 'improved' : 'worsened'
						} following the ${event.description.toLowerCase()}`
					);
				}
			}
		});

		// Check for other correlations
		categories.forEach((category) => {
			if (category !== 'tremor' && category !== 'sleep') {
				// Check if this symptom correlates with any events
				events.forEach((event) => {
					const eventDate = event.date;
					const afterEventData = chartData.filter(
						(d) =>
							new Date(d.date) >= eventDate &&
							new Date(d.date) <
								new Date(eventDate.getTime() + 5 * 24 * 60 * 60 * 1000)
					);

					if (afterEventData.length > 0) {
						const categoryValues = afterEventData.map((d) => d[category]);
						const avgValue =
							categoryValues.reduce((sum, val) => sum + val, 0) /
							categoryValues.length;

						// If average is notably low (better) after an event
						if (avgValue <= 2 && !insights.find((i) => i.includes(category))) {
							insights.push(
								`Your <strong>${category}</strong> levels show improvement following the ${event.type.toLowerCase()} on ${eventDate.toLocaleDateString(
									'en-US',
									{ month: 'short', day: 'numeric' }
								)}`
							);
						}
					}
				});
			}
		});

		// Add a general recommendation if we have insights
		if (insights.length > 0) {
			insights.push(
				'Consider discussing these observed patterns with your healthcare provider at your next appointment'
			);
		}

		// If no specific insights, add general observations
		if (insights.length === 0) {
			insights.push(
				'Try tracking your symptoms consistently to identify patterns over time'
			);
			insights.push(
				'Look for correlations between symptom changes and medication timing'
			);
			insights.push(
				'Regular exercise like your physical therapy sessions may help manage symptoms'
			);
		}

		return insights;
	};

	const insights = generateInsights();
	// Create event reference lines inside render to access it
	const eventReferenceLines = createEventReferenceLines();

	return (
		<div className='visualization-container ho-panel visualization-chart high-contrast'>
			<div className='control-group' style={{ marginBottom: '20px' }}>
				<label
					style={{
						display: 'block',
						marginBottom: '10px',
						fontWeight: 'bold',
						fontSize: '16px',
					}}
				>
					View Categories:
				</label>
				<div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
					<button
						onClick={() => setShowAllCategories(!showAllCategories)}
						style={{
							padding: '8px 16px',
							backgroundColor: showAllCategories ? '#f0f0f0' : 'white',
							border: '1px solid #ccc',
							borderRadius: '4px',
							cursor: 'pointer',
							fontSize: '16px',
							fontWeight: showAllCategories ? 'bold' : 'normal',
						}}
					>
						View All
					</button>

					{categories.map((category) => (
						<button
							key={category}
							onClick={() => handleCategoryToggle(category)}
							style={{
								padding: '8px 16px',
								backgroundColor:
									selectedCategory === category && !showAllCategories
										? '#f0f0f0'
										: 'white',
								border: '1px solid #ccc',
								borderRadius: '4px',
								cursor: 'pointer',
								fontSize: '16px',
								fontWeight:
									selectedCategory === category && !showAllCategories
										? 'bold'
										: 'normal',
							}}
						>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</button>
					))}
				</div>
			</div>

			<div
				className='legend'
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginBottom: '15px',
					flexWrap: 'wrap',
					gap: '15px',
				}}
			>
				<div
					className='severity-legend'
					style={{
						display: 'flex',
						gap: '15px',
						flexWrap: 'wrap',
						backgroundColor: '#f8f8f8',
						padding: '10px',
						borderRadius: '4px',
					}}
				>
					<div style={{ fontWeight: 'bold', fontSize: '16px' }}>
						Severity Levels:
					</div>
					{/* Removed the blue boxes as requested, keeping just the numbers and descriptions */}
					{[1, 2, 3, 4, 5].map((level) => (
						<div
							key={level}
							style={{ alignItems: 'center', marginLeft: '10px' }}
						>
							<span style={{ fontSize: '16px' }}>
								{level} -{' '}
								{level === 1
									? 'Minimal'
									: level === 2
									? 'Mild'
									: level === 3
									? 'Moderate'
									: level === 4
									? 'Significant'
									: 'Severe'}
							</span>
						</div>
					))}
				</div>

				<div
					className='event-legend'
					style={{
						display: 'flex',
						gap: '15px',
						backgroundColor: '#FFF8E1',
						padding: '10px',
						borderRadius: '4px',
						borderLeft: '3px solid #FF9800',
					}}
				>
					<div style={{ fontWeight: 'bold', fontSize: '16px' }}>Events:</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<span
							style={{ color: '#FF9800', fontWeight: 'bold', fontSize: '18px' }}
						>
							★
						</span>
						<span style={{ fontSize: '16px' }}>Event marker</span>
					</div>
					<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
						<span
							style={{
								width: '20px',
								height: '0px',
								display: 'inline-block',
								borderTop: '2px dashed #FF9800',
							}}
						></span>
						<span style={{ fontSize: '16px' }}>Event timeline</span>
					</div>
				</div>
			</div>

			<div style={{ height: '550px' }}>
				{/* Chart section */}
				<div style={{ height: '70%' }}>
					<ResponsiveContainer width='100%' height='100%'>
						<LineChart
							data={chartData}
							margin={{
								top: 30,
								right: 30,
								left: 10,
								bottom: 50,
							}}
						>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis
								dataKey='dateStr'
								tick={{ fontSize: 12 }}
								padding={{ left: 10, right: 10 }}
							/>
							<YAxis
								domain={[0, 5]}
								ticks={[1, 2, 3, 4, 5]}
								label={{
									value: 'Severity Level',
									angle: -90,
									position: 'insideLeft',
									style: { textAnchor: 'middle' },
								}}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Legend />

							{/* Always show event reference lines */}
							{eventReferenceLines}

							{/* Show stars for event days - no labels on chart */}
							{chartData.map(
								(point, index) =>
									point.hasEvent && (
										<ReferenceLine
											key={`event-marker-${index}`}
											x={point.dateStr}
											isFront={true}
											label={{
												value: '★',
												position: 'top',
												fill: point.eventColor || '#FF9800',
												fontSize: 18,
												offset: 10,
											}}
											stroke={point.eventColor || '#FF9800'}
											strokeWidth={2}
											strokeDasharray='3 3'
										/>
									)
							)}

							{/* Draw selected category or all categories */}
							{showAllCategories ? (
								categories.map((category) => (
									<Line
										key={category}
										type='monotone'
										dataKey={category}
										stroke={getCategoryColor(category)}
										strokeWidth={2}
										activeDot={{ r: 8 }}
										dot={{ r: 4 }}
										name={category.charAt(0).toUpperCase() + category.slice(1)}
									/>
								))
							) : (
								<Line
									type='monotone'
									dataKey={selectedCategory}
									stroke={getCategoryColor(selectedCategory)}
									strokeWidth={3}
									activeDot={{ r: 8 }}
									dot={{ r: 4 }}
									name={
										selectedCategory.charAt(0).toUpperCase() +
										selectedCategory.slice(1)
									}
								/>
							)}
						</LineChart>
					</ResponsiveContainer>
				</div>

				{/* Event labels below the chart - reduced gap and left-aligned */}
				<EventLabels />
			</div>

			{/* Key Insights section - with increased spacing from event labels */}
			<div
				className='chart-insights'
				style={{
					marginTop: '25px', // Adjusted margin
					padding: '15px',
					backgroundColor: 'rgba(255, 152, 0, 0.05)',
					borderLeft: '3px solid #FF9800',
					borderRadius: '4px',
				}}
			>
				<h3 style={{ margin: '0 0 10px 0' }}>Key Insights:</h3>
				<ul style={{ margin: '0', paddingLeft: '20px' }}>
					{insights.map((insight, index) => (
						<li
							key={index}
							style={{ marginBottom: '8px' }}
							dangerouslySetInnerHTML={{ __html: insight }}
						></li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default ImprovedHealthChart;
