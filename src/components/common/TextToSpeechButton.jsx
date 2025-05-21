// src/components/common/TextToSpeechButton.jsx
import React, { useState, useRef, useEffect } from 'react';

const TextToSpeechButton = ({ contentSelector }) => {
	const [isSpeaking, setIsSpeaking] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [voices, setVoices] = useState([]);
	const [selectedVoice, setSelectedVoice] = useState(null);
	const [rate, setRate] = useState(0.9);
	const [volume, setVolume] = useState(0.8);
	const [showVoiceSelector, setShowVoiceSelector] = useState(false);
	const [currentHighlight, setCurrentHighlight] = useState(null);

	const speechSynthRef = useRef(window.speechSynthesis);
	const utteranceRef = useRef(null);
	const textNodesRef = useRef([]);

	// Load all available voices
	useEffect(() => {
		const loadVoices = () => {
			const availableVoices = speechSynthRef.current.getVoices();

			if (availableVoices.length > 0) {
				console.log(
					'Available voices:',
					availableVoices.map((v) => v.name)
				);
				setVoices(availableVoices);

				// Common female voice names across different platforms
				const femaleVoiceKeywords = [
					'female',
					'woman',
					'girl',
					'samantha',
					'victoria',
					'zira',
					'susan',
					'karen',
					'moira',
					'tessa',
					'fiona',
					'veena',
					'alex',
					'ava',
					'allison',
					'jenny',
					'lisa',
					'amy',
					'joanna',
					'salli',
					'kimberly',
					'ivy',
					'nora',
				];

				// Try to find a female voice
				// 1. First try looking for explicit "female" in the name
				let bestVoice = null;

				// Look for explicitly female labeled voices first
				for (const voice of availableVoices) {
					if (voice.name.toLowerCase().includes('female')) {
						bestVoice = voice;
						console.log('Found female voice:', voice.name);
						break;
					}
				}

				// If no explicit female voice, try common female names
				if (!bestVoice) {
					for (const keyword of femaleVoiceKeywords) {
						for (const voice of availableVoices) {
							if (voice.name.toLowerCase().includes(keyword.toLowerCase())) {
								bestVoice = voice;
								console.log('Found likely female voice:', voice.name);
								break;
							}
						}
						if (bestVoice) break;
					}
				}

				// If still no voice, try to avoid obviously male voices
				if (!bestVoice) {
					const maleKeywords = ['male', 'man', 'boy', 'david', 'mark', 'paul'];

					const nonMaleVoice = availableVoices.find(
						(voice) =>
							!maleKeywords.some((keyword) =>
								voice.name.toLowerCase().includes(keyword.toLowerCase())
							)
					);

					if (nonMaleVoice) {
						bestVoice = nonMaleVoice;
						console.log('Found non-male voice:', nonMaleVoice.name);
					}
				}

				// Last resort: use first English voice or any voice
				if (!bestVoice) {
					bestVoice =
						availableVoices.find((voice) => voice.lang.includes('en')) ||
						availableVoices[0];
					console.log('Fallback to voice:', bestVoice?.name);
				}

				if (bestVoice) {
					setSelectedVoice(bestVoice);
					console.log('Selected voice:', bestVoice.name);
				}
			}
		};

		loadVoices();

		// Chrome requires this event listener
		if (speechSynthesis.onvoiceschanged !== undefined) {
			speechSynthesis.onvoiceschanged = loadVoices;
		}

		// Cleanup
		return () => {
			if (isSpeaking) {
				speechSynthRef.current.cancel();
			}
			clearAllHighlights();
		};
	}, []);

	// Preprocess text to improve pronunciation
	const preprocessText = (text) => {
		if (!text) return '';

		// Replace acronyms and abbreviations
		const replacements = {
			CAFY: 'cafy', // Read CAFY as a word
			'C.A.F.Y.': 'cafy',
			'C.A.F.Y': 'cafy',
			'C-A-F-Y': 'cafy',
		};

		let processedText = text;

		// Apply all replacements
		Object.entries(replacements).forEach(([pattern, replacement]) => {
			processedText = processedText.replace(
				new RegExp(pattern, 'g'),
				replacement
			);
		});

		// Add natural pauses
		processedText = processedText.replace(/([.!?])\s+/g, '$1,\u200B ');

		// Remove symbols that might be read aloud
		processedText = processedText.replace(/[&*_~]/g, ' ');

		return processedText;
	};

	// Prepare DOM for highlighting
	const prepareForHighlighting = () => {
		const contentElement = document.querySelector(contentSelector);
		if (!contentElement) return;

		// Clear any existing highlights
		clearAllHighlights();

		// Find all paragraphs, headings, and list items
		const textElements = contentElement.querySelectorAll(
			'p, h1, h2, h3, h4, h5, h6, li, div'
		);

		// Add a class to each element for potential highlighting
		textElements.forEach((element) => {
			if (element.textContent.trim().length > 0) {
				element.classList.add('tts-ready');
			}
		});

		return Array.from(textElements).filter((el) =>
			el.classList.contains('tts-ready')
		);
	};

	// Split text content into words for highlighting progression
	const splitTextIntoSegments = (text) => {
		// First split into sentences
		const sentences = text.split(/(?<=[.!?])\s+/);

		// Create a mapping of position to sentence index
		const positionMap = [];
		let position = 0;

		sentences.forEach((sentence, index) => {
			const length = sentence.length;
			for (let i = 0; i < length; i++) {
				positionMap[position + i] = index;
			}
			position += length + 1; // +1 for the space
		});

		return { sentences, positionMap };
	};

	// Find and highlight current text segment
	const highlightCurrentSegment = (charIndex, text) => {
		const contentElement = document.querySelector(contentSelector);
		if (!contentElement) return;

		clearAllHighlights();

		// Simple estimation based on character position
		const { sentences, positionMap } = splitTextIntoSegments(text);
		const sentenceIndex = positionMap[charIndex] || 0;

		// Find all text elements
		const textElements = contentElement.querySelectorAll('.tts-ready');

		// Calculate which element might contain our sentence
		const totalElements = textElements.length;
		const estimatedElementIndex = Math.floor(
			(sentenceIndex / sentences.length) * totalElements
		);

		// Check a few elements around our estimate
		const rangeToCheck = 3;
		const startIndex = Math.max(0, estimatedElementIndex - rangeToCheck);
		const endIndex = Math.min(
			totalElements - 1,
			estimatedElementIndex + rangeToCheck
		);

		let highlightedElement = null;

		for (let i = startIndex; i <= endIndex; i++) {
			const element = textElements[i];
			if (!element) continue;

			const elementText = element.textContent;
			const currentSentence = sentences[sentenceIndex] || '';

			// If this element contains our current sentence, highlight it
			if (elementText.includes(currentSentence.substring(0, 15))) {
				element.classList.add('tts-highlight');
				highlightedElement = element;
				break;
			}
		}

		// If no element found, try a simpler approach - just highlight based on position
		if (!highlightedElement && textElements.length > 0) {
			const progressPercentage = charIndex / text.length;
			const elementIndex = Math.floor(progressPercentage * textElements.length);
			const element =
				textElements[Math.min(elementIndex, textElements.length - 1)];

			if (element) {
				element.classList.add('tts-highlight');
				highlightedElement = element;
			}
		}

		// Scroll highlighted element into view if needed
		if (highlightedElement) {
			const rect = highlightedElement.getBoundingClientRect();
			const isInView =
				rect.top >= 0 &&
				rect.bottom <=
					(window.innerHeight || document.documentElement.clientHeight);

			if (!isInView) {
				highlightedElement.scrollIntoView({
					behavior: 'smooth',
					block: 'center',
				});
			}
		}
	};

	// Clear all highlights
	const clearAllHighlights = () => {
		const highlights = document.querySelectorAll('.tts-highlight');
		highlights.forEach((el) => el.classList.remove('tts-highlight'));

		// Don't remove the .tts-ready class until reading is done
		if (!isSpeaking) {
			const readyElements = document.querySelectorAll('.tts-ready');
			readyElements.forEach((el) => el.classList.remove('tts-ready'));
		}
	};

	// Toggle speech on/off
	const toggleSpeech = () => {
		if (isSpeaking) {
			stopSpeech();
		} else {
			startSpeech();
		}
	};

	// Start reading aloud
	const startSpeech = () => {
		// Cancel any ongoing speech
		speechSynthRef.current.cancel();

		// Prepare elements for highlighting
		const textElements = prepareForHighlighting();

		// Prepare text
		const textToRead = prepareTextForReading();
		if (!textToRead) return;

		// Create utterance
		utteranceRef.current = new SpeechSynthesisUtterance(textToRead);

		// Apply settings
		if (selectedVoice) {
			utteranceRef.current.voice = selectedVoice;
		}

		utteranceRef.current.rate = rate;
		utteranceRef.current.volume = volume;

		// Event handlers
		utteranceRef.current.onstart = () => setIsSpeaking(true);

		utteranceRef.current.onend = () => {
			setIsSpeaking(false);
			clearAllHighlights();
		};

		// Handle boundary events for highlighting
		utteranceRef.current.onboundary = (event) => {
			if (event.name === 'word' || event.name === 'sentence') {
				highlightCurrentSegment(event.charIndex, textToRead);
			}
		};

		speechSynthRef.current.speak(utteranceRef.current);
	};

	// Extract text content for reading
	const prepareTextForReading = () => {
		const targetElement = document.querySelector(contentSelector);
		if (!targetElement) return '';

		// Clone element to avoid modifying original
		const tempElement = targetElement.cloneNode(true);

		// Remove elements we don't want to read
		const elementsToRemove = tempElement.querySelectorAll(
			'nav, footer, .skip-tts, script, style, .compact-tts'
		);
		elementsToRemove.forEach((el) => el.remove());

		let textContent = tempElement.textContent.trim();

		// Process for better pronunciation
		textContent = preprocessText(textContent);

		return textContent;
	};

	// Stop reading
	const stopSpeech = () => {
		speechSynthRef.current.cancel();
		setIsSpeaking(false);
		clearAllHighlights();
	};

	// Toggle expanded view
	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	// Toggle voice selector
	const toggleVoiceSelector = () => {
		setShowVoiceSelector(!showVoiceSelector);
	};

	// Handle voice change
	const handleVoiceChange = (e) => {
		const voiceName = e.target.value;
		const voice = voices.find((v) => v.name === voiceName);
		if (voice) {
			setSelectedVoice(voice);

			// If already speaking, update the voice
			if (isSpeaking && utteranceRef.current) {
				// Need to restart speech to change voice
				const currentText = utteranceRef.current.text;

				speechSynthRef.current.cancel();

				const newUtterance = new SpeechSynthesisUtterance(currentText);
				newUtterance.voice = voice;
				newUtterance.rate = rate;
				newUtterance.volume = volume;

				// Event handlers
				newUtterance.onstart = () => setIsSpeaking(true);
				newUtterance.onend = () => {
					setIsSpeaking(false);
					clearAllHighlights();
				};

				// Boundary event for highlighting
				newUtterance.onboundary = (event) => {
					if (event.name === 'word' || event.name === 'sentence') {
						highlightCurrentSegment(event.charIndex, currentText);
					}
				};

				utteranceRef.current = newUtterance;
				speechSynthRef.current.speak(utteranceRef.current);
			}
		}
	};

	// Handle rate change
	const handleRateChange = (e) => {
		const newRate = parseFloat(e.target.value);
		setRate(newRate);

		// If already speaking, update the rate
		if (isSpeaking && utteranceRef.current) {
			// Unfortunately, we need to restart speech to change rate
			const currentText = utteranceRef.current.text;

			speechSynthRef.current.cancel();

			const newUtterance = new SpeechSynthesisUtterance(currentText);
			newUtterance.voice = selectedVoice;
			newUtterance.rate = newRate;
			newUtterance.volume = volume;

			// Event handlers
			newUtterance.onstart = () => setIsSpeaking(true);
			newUtterance.onend = () => {
				setIsSpeaking(false);
				clearAllHighlights();
			};

			// Boundary event for highlighting
			newUtterance.onboundary = (event) => {
				if (event.name === 'word' || event.name === 'sentence') {
					highlightCurrentSegment(event.charIndex, newUtterance.text);
				}
			};

			utteranceRef.current = newUtterance;
			speechSynthRef.current.speak(utteranceRef.current);
		}
	};

	// Handle volume change
	const handleVolumeChange = (e) => {
		const newVolume = parseFloat(e.target.value);
		setVolume(newVolume);

		// If already speaking, update the volume
		if (isSpeaking && utteranceRef.current) {
			utteranceRef.current.volume = newVolume;
		}
	};

	// Sort voices to prioritize female voices
	const getSortedVoices = () => {
		// Keywords that suggest female voices
		const femaleKeywords = [
			'female',
			'woman',
			'girl',
			'samantha',
			'victoria',
			'zira',
			'susan',
			'karen',
			'moira',
			'tessa',
			'fiona',
			'veena',
			'alex',
			'ava',
			'allison',
			'jenny',
			'lisa',
			'amy',
			'joanna',
			'salli',
			'kimberly',
		];

		// Sort function that puts likely female voices first
		return [...voices].sort((a, b) => {
			const aNameLower = a.name.toLowerCase();
			const bNameLower = b.name.toLowerCase();

			// Check if names contain female keywords
			const aIsFemale = femaleKeywords.some((keyword) =>
				aNameLower.includes(keyword.toLowerCase())
			);

			const bIsFemale = femaleKeywords.some((keyword) =>
				bNameLower.includes(keyword.toLowerCase())
			);

			if (aIsFemale && !bIsFemale) return -1;
			if (!aIsFemale && bIsFemale) return 1;

			// Secondary sort by language (prefer English)
			const aIsEnglish = a.lang.includes('en');
			const bIsEnglish = b.lang.includes('en');

			if (aIsEnglish && !bIsEnglish) return -1;
			if (!aIsEnglish && bIsEnglish) return 1;

			// Alphabetical sort as last resort
			return a.name.localeCompare(b.name);
		});
	};

	return (
		<div
			className={`compact-tts ${isExpanded ? 'expanded' : 'collapsed'} ${
				isSpeaking ? 'speaking' : ''
			}`}
		>
			<div className='compact-tts-main'>
				<button
					className='compact-tts-toggle'
					onClick={toggleExpanded}
					aria-label={isExpanded ? 'Minimize controls' : 'Expand controls'}
				>
					{isExpanded ? '▼' : '▲'}
				</button>

				<button
					className='compact-tts-button'
					onClick={toggleSpeech}
					aria-pressed={isSpeaking}
					aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
				>
					{isSpeaking ? (
						<>
							<span className='visually-hidden'>Stop reading</span>
							<span aria-hidden='true'>■ Stop</span>
						</>
					) : (
						<>
							<span className='visually-hidden'>Read aloud</span>
							<span aria-hidden='true'>▶ Listen</span>
						</>
					)}
				</button>
			</div>

			{isExpanded && (
				<div className='compact-tts-settings'>
					<div className='compact-tts-control'>
						<label htmlFor='tts-volume' className='compact-tts-label'>
							Volume:
						</label>
						<input
							id='tts-volume'
							type='range'
							min='0'
							max='1'
							step='0.1'
							value={volume}
							onChange={handleVolumeChange}
							className='compact-tts-slider'
						/>
					</div>

					<div className='compact-tts-control'>
						<label htmlFor='tts-rate' className='compact-tts-label'>
							Speed:
						</label>
						<input
							id='tts-rate'
							type='range'
							min='0.5'
							max='1.5'
							step='0.1'
							value={rate}
							onChange={handleRateChange}
							className='compact-tts-slider'
						/>
					</div>

					{selectedVoice && (
						<div className='compact-tts-voiceinfo'>
							<div className='voice-display'>
								Voice: {selectedVoice.name}
								<button
									onClick={toggleVoiceSelector}
									className='voice-change-button'
									aria-label='Change voice'
								>
									⚙️
								</button>
							</div>

							{showVoiceSelector && voices.length > 0 && (
								<div className='voice-selector'>
									<label htmlFor='voice-select' className='compact-tts-label'>
										Select voice (female voices listed first):
									</label>
									<select
										id='voice-select'
										value={selectedVoice.name}
										onChange={handleVoiceChange}
										className='compact-tts-select'
									>
										{getSortedVoices().map((voice) => (
											<option key={voice.name} value={voice.name}>
												{voice.name} ({voice.lang})
											</option>
										))}
									</select>
								</div>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default TextToSpeechButton;
