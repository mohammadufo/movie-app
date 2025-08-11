🎬 Movie PWA
A modern, responsive Progressive Web App (PWA) for browsing movies. This application is built with React and features performance optimizations like lazy loading for images and a clean, user-friendly interface.

✨ Features
Movie Browsing: View a list of popular movies.

Lazy Loading: Images are loaded on-demand as they enter the viewport to improve performance and reduce initial load time.

Loading Placeholders: Displays an animated placeholder while images are loading for a better user experience.

Responsive Design: Looks great on all devices, from mobile phones to desktops.

PWA Ready: Can be installed on a user's home screen for an app-like experience.

End-to-End =Testing: Includes a testing suite with Cypress to ensure reliability.

🚀 Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

Prerequisites
You need to have Node.js and pnpm installed on your system.

Installation
Clone the repository:

git clone [https://github.com/mohammadufo/movie-app](https://github.com/mohammadufo/movie-app)]
cd movie-pwa

Install dependencies using pnpm:

pnpm install

🏃‍♀️ Running the Application
To start the development server, run the following command:

pnpm start

This will open the application in your default browser, usually at http://localhost:3000. The server will automatically reload when you make changes to the code.

✅ Testing
This project uses Cypress for end-to-end tests.

End-to-End Tests
To open the Cypress Test Runner and run tests interactively:

pnpm run cypress:open

(Assuming you have a script "cypress:open": "cypress open" in your package.json)

🛠️ Technologies Used
React: A JavaScript library for building user interfaces.

React Testing Library: Simple and complete React DOM testing utilities that encourage good testing practices.

Cypress: Fast, easy, and reliable testing for anything that runs in a browser.

Tailwind CSS: A utility-first CSS framework for rapid UI development.
