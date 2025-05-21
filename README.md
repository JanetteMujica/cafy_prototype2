CAFY - Care Assistant For You
Afficher l'image
CAFY is a digital assistant designed to empower people living with Parkinson's. It helps users set goals, track their daily experiences, and monitor their health data in an accessible and user-friendly interface.
Features

Goal Setting: Create and manage personal health goals
Daily Tracking: Log symptoms, medication changes, and experiences
Data Visualization: View health data in easy-to-understand charts
Device Integration: Connect with fitness trackers and health devices
Report Generation: Create summaries for healthcare providers

Getting Started
These instructions will help you set up a copy of the project on your local machine for development and testing purposes.
Prerequisites

Node.js (v16 or later)
npm (v8 or later)

Installation

Clone this repository:
bashgit clone https://github.com/your-username/cafy-app.git
cd cafy-app

Install dependencies:
bashnpm install

Start the development server:
bashnpm start

Open your browser and navigate to http://localhost:3000

Project Structure
cafy-app/
├── public/ # Static files
├── src/ # Source files
│ ├── assets/ # Images, fonts, etc.
│ ├── components/ # Reusable React components
│ │ ├── common/ # Shared UI components (buttons, etc.)
│ │ ├── layout/ # Layout components (header, footer)
│ │ └── sections/ # Page sections
│ ├── pages/ # Page components
│ ├── styles/ # CSS styles
│ │ ├── base/ # Base styles (variables, reset, typography)
│ │ ├── components/ # Component-specific styles
│ │ └── pages/ # Page-specific styles
│ ├── utils/ # Utility functions and helpers
│ ├── App.js # Main app component
│ └── index.js # Entry point
└── README.md # Project documentation
Development Guidelines
Accessibility
This project prioritizes accessibility for users with varying abilities:

Use semantic HTML elements
Ensure proper ARIA attributes
Maintain keyboard navigation
Test with screen readers
Ensure sufficient color contrast
Support text scaling and zooming

CSS Methodology
The project uses a component-based CSS approach:

Base styles define variables, typography, and reset styles
Component styles are modular and self-contained
Utility classes follow a consistent naming convention (ho-\*)
Media queries ensure responsive design
CSS custom properties (variables) for consistent theming

Responsive Design
The application is designed to work on multiple devices:

Mobile-first approach
Flexible layouts using CSS Grid and Flexbox
Responsive typography
Appropriate touch targets for mobile devices
Conditional rendering for different screen sizes

Deployment
To build the project for production:
bashnpm run build
This creates a build directory with optimized files for deployment.
Deployment Options

GitHub Pages: Use the gh-pages package
bashnpm install --save-dev gh-pages
Add to package.json:
json"homepage": "https://your-username.github.io/cafy-app",
"scripts": {
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
}
Deploy with:
bashnpm run deploy

Netlify: Connect your GitHub repository to Netlify for continuous deployment
Vercel: Similar to Netlify, provides an easy way to deploy React applications

Contributing

Fork the repository
Create a feature branch: git checkout -b feature/your-feature-name
Commit your changes: git commit -m 'Add some feature'
Push to the branch: git push origin feature/your-feature-name
Open a pull request

License
This project is licensed under the MIT License - see the LICENSE file for details.
Acknowledgments

Created to support people living with Parkinson's
Designed with accessibility as a priority
Built with React and modern web technologies

## Git

git add .
git commit -m "xxx"
git push origin main

## NPM

### run locally:

npm start

### Deploy to github page:

npm run deploy
