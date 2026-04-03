# Testing Guide - React Calendar

This document outlines the testing strategy, setup, and best practices for the React Calendar application.

## 🛠️ Testing Stack

- **[Vitest](https://vitest.dev/)**: Next generation testing framework powered by Vite. Used for unit and component tests.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: Simple and complete testing utilities that encourage good testing practices.
- **[jsdom](https://github.com/jsdom/jsdom)**: A pure-JavaScript implementation of many web standards, used as the test environment.

## 🏃 Running Tests

To run all tests in the terminal:
```bash
npm run test
```

To run tests with a beautiful UI dashboard:
```bash
npm run test:ui
```

To run tests and watch for changes (dev mode):
```bash
npm run test -- --watch
```

## 🧪 Testing Strategy

### 1. Unit Tests (Logic Only)
Located in `*.test.ts` files. These tests focus on pure functions and custom hooks.
- **Ex**: `src/utils/eventHelpers.test.ts` (event grouping logic).
- **Ex**: `src/components/DayPanel/subcomponents/useEventForm.test.ts` (validation logic).

### 2. Component Tests (UI & Interactions)
Located in `*.test.tsx` files. These tests verify that components render correctly and respond to user events.
- **Ex**: `src/components/DayPanel/subcomponents/EventItem.test.tsx` (button clicks, dropdown visibility).

### 3. Mocks
- **LocalStorage**: Moked globally in `src/test-setup.ts` to ensure tests don't depend on browser state.
- **Date/Time**: For tests involving the current date, use `vi.setSystemTime` if needed.

## 📝 Best Practices

1.  **Test Behavior, Not Implementation**: Focus on what the user sees and does (e.g., clicking a button) rather than internal component state.
2.  **Use Mock Data**: Always use predictable mock data for your tests.
3.  **Clean Up**: Vitest handles cleanup automatically with `afterEach`, but be mindful of global state or timers.
4.  **Descriptive Names**: Use clear `describe` and `it` blocks that explain the expected behavior.

## ➕ Adding New Tests

1.  Create a file named `Filename.test.ts(x)` next to the source file.
2.  Import `describe`, `it`, `expect` from `vitest`.
3.  Write your tests using React Testing Library's `render` and `screen` utilities.
