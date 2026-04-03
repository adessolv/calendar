# Calendar Application Documentation

## Project Overview
A sophisticated, high-performance React calendar application designed with a premium dark-themed aesthetic. The application is built to handle high-density data while maintaining a smooth and responsive user experience.

### Key Features
- **Dynamic Calendar View**: Interactive month-grid with intuitive navigation.
- **Side Navigation**: Year and month selector with event density indicators (counts) per month.
- **Event Management**:
  - Add new events with title, description, time, and custom theme color.
  - Edit existing event details via a context-aware dropdown.
  - Delete events with confirmation prompts.
- **Chronological Sorting**: Events are automatically sorted by time within the daily view.
- **Modern UI/UX**: Premium dark mode design featuring glassmorphism, smooth transitions, and high-quality typography.
- **Responsive Layout**: Optimized for desktop workflows with a focus on data density.

---

## Technical Stack
- **Core**: React 19 (TypeScript)
- **State Management**: Custom React Hooks for calendar logic and event state.
- **Date Utilities**: [Day.js](https://day.js.org/)
- **Styling**: Vanilla CSS Modules (to ensure design flexibility and performance).
- **Tooling**: Vite (Build tool), ESLint (Linting).
- **Testing**: Vitest + React Testing Library (Unit and Integration tests).

---

## Setup Instructions

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd calendar

# Install dependencies
npm install
```

### Running Locally
```bash
# Start the development server
npm run dev
```
The application will be available at `http://localhost:5173`.

### Building for Production
```bash
# Generate a production build
npm run build
```
The output will be in the `dist/` directory.

### Running Tests
```bash
# Execute unit and integration tests
npm test

# Run tests in UI mode for interactive debugging
npm run test:ui
```

---

## Usage Guide

### 1. Navigation
- Use the **Sidebar arrows** to switch between years.
- Click on any **Month** in the sidebar to jump to that month.
- Click on any **Day cell** in the grid to view its specific events in the right panel.

### 2. Adding an Event
- Select a day from the grid.
- Click the **Plus (+)** button in the bottom-right corner of the Daily Panel.
- Fill in the event details (Title is required) and pick a theme color.
- Click **Create Event**.

### 3. Modifying Events
- In the Daily Panel, click the **More options (...)** button on any event card.
- Select **Edit** to open the modification modal or **Delete** to remove the event.

### 4. Viewing density
- The small **dots** in the calendar grid cells indicate the presence of events on those days.
- The **numbers** next to months in the sidebar show the total event count for that month in the current year.
