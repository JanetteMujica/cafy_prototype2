// src/utils/accessibility.js

/**
 * Focus trap utility - keeps focus within a specific DOM element
 * Useful for modals, dialogs, and other components that need to trap focus
 */
export const setupFocusTrap = (elementRef) => {
	const focusableElements =
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
	const element = elementRef.current;

	if (!element) return;

	const focusableContent = element.querySelectorAll(focusableElements);
	const firstFocusableElement = focusableContent[0];
	const lastFocusableElement = focusableContent[focusableContent.length - 1];

	const handleTabKey = (e) => {
		if (e.key === 'Tab') {
			if (e.shiftKey && document.activeElement === firstFocusableElement) {
				e.preventDefault();
				lastFocusableElement.focus();
			} else if (
				!e.shiftKey &&
				document.activeElement === lastFocusableElement
			) {
				e.preventDefault();
				firstFocusableElement.focus();
			}
		}
	};

	element.addEventListener('keydown', handleTabKey);

	// Return cleanup function
	return () => {
		element.removeEventListener('keydown', handleTabKey);
	};
};

/**
 * Skip to main content utility - adds a skip link for keyboard users
 */
export const addSkipToMainLink = () => {
	const skipLink = document.createElement('a');
	skipLink.href = '#main-content';
	skipLink.className = 'skip-link';
	skipLink.textContent = 'Skip to main content';

	document.body.insertBefore(skipLink, document.body.firstChild);
};

/**
 * Announce changes to screen readers using ARIA live regions
 */
export const announceToScreenReader = (message, priority = 'polite') => {
	const announcer = document.getElementById('screen-reader-announcer');

	if (!announcer) {
		const newAnnouncer = document.createElement('div');
		newAnnouncer.id = 'screen-reader-announcer';
		newAnnouncer.className = 'ho-visually-hidden';
		newAnnouncer.setAttribute('aria-live', priority);
		newAnnouncer.setAttribute('aria-atomic', 'true');
		document.body.appendChild(newAnnouncer);

		// Wait a moment for the announcer to be recognized by screen readers
		setTimeout(() => {
			newAnnouncer.textContent = message;
		}, 100);
	} else {
		// Clear content first to ensure it's announced even if the same message is repeated
		announcer.textContent = '';

		setTimeout(() => {
			announcer.textContent = message;
		}, 100);
	}
};

/**
 * Enhance form fields with better accessibility
 */
export const enhanceFormAccessibility = () => {
	// Find all form elements without associated labels
	const formElements = document.querySelectorAll('input, select, textarea');

	formElements.forEach((element) => {
		// Check if there's a label associated with this element
		const id = element.id;
		const hasLabel = id && document.querySelector(`label[for="${id}"]`);

		if (
			!hasLabel &&
			!element.hasAttribute('aria-label') &&
			!element.hasAttribute('aria-labelledby')
		) {
			console.warn(
				`Form element missing accessible label: ${element.outerHTML}`
			);
		}

		// Ensure required fields are properly marked
		if (element.required && !element.hasAttribute('aria-required')) {
			element.setAttribute('aria-required', 'true');
		}

		// Ensure error messages are associated with fields
		if (
			element.hasAttribute('aria-invalid') &&
			element.getAttribute('aria-invalid') === 'true'
		) {
			const errorMessageId = `${id}-error`;
			const errorMessage = document.getElementById(errorMessageId);

			if (errorMessage && !element.hasAttribute('aria-describedby')) {
				element.setAttribute('aria-describedby', errorMessageId);
			}
		}
	});
};
