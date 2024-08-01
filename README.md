# Trivia Game Management System

This project is a web-based application built using Angular, TypeScript, and Angular Material. It allows users to manage trivia game data, including adding, editing, and validating game types and trivia questions. The application interacts with a backend API(Trivia-Game-BackEnd) to fetch and update game details.  

## Features

1. Add Game Type: Users can add new game types with validation to ensure the game type name is required and does not exceed 30 characters.
2. Edit Game Type: Users can edit existing game types with similar validation rules.
3. Add Trivia Question: Users can add trivia questions with fields for difficulty, question, and answer, each with appropriate validation.
4. Form Validation: Ensures that all required fields are filled and adhere to specified constraints before submission.
5. Responsive Dialogs: Dialog boxes are styled to accommodate longer text and provide a better user experience.
## Technologies Used

1. Angular: Framework for building the front-end application.
2. TypeScript: Superset of JavaScript used for type safety and better code management.
3. Angular Material: UI component library for implementing Material Design in Angular applications.
4. RxJS: Library for reactive programming using Observables, used for handling asynchronous operations.
5. CSS: Styling the application and customizing Angular Material components.
## Installation

1. Clone the repository:  <pre>https://github.com/DLee211/Trivia-Game-FrontEnd.git cd trivia-game-management </pre>
2. Install dependencies:  <pre>npm install </pre>
3. Run the application:  <pre>ng serve </pre>
