/**
 * SEO Configuration for all exercise pages
 * Each exercise gets unique meta tags for better search engine visibility
 */

export interface SEOConfig {
    title: string;
    description: string;
    keywords: string;
}

export const exerciseSEO: Record<string, SEOConfig> = {
    // Core Exercises
    accordion: {
        title: 'Accordion Component - React Interview Exercise | TypeScript',
        description: 'Learn to build an interactive accordion component in React with TypeScript. Practice state management, conditional rendering, and collapsible UI patterns.',
        keywords: 'React accordion, TypeScript accordion, collapsible component, React state management, interview question'
    },
    colors: {
        title: 'Color Generator Tool - React Interview Exercise | HEX & RGB',
        description: 'Build a random color generator in React with HEX and RGB support. Learn clipboard API integration, string manipulation, and state management.',
        keywords: 'React color generator, random color tool, HEX RGB converter, clipboard API React, TypeScript color picker'
    },
    stars: {
        title: 'Star Rating Component - React Interview Exercise | Interactive UI',
        description: 'Create an interactive star rating component with hover and click states. Master mouse events, state management, and dynamic styling in React.',
        keywords: 'React star rating, interactive rating component, hover state React, TypeScript rating, UI component'
    },
    sliders: {
        title: 'Image Slider Carousel - React Interview Exercise | Async Data',
        description: 'Build an image carousel with navigation controls and async data fetching. Learn useEffect, API integration, and timer management in React.',
        keywords: 'React image slider, carousel component, async data fetching, useEffect React, TypeScript carousel'
    },
    loadmore: {
        title: 'Load More Pagination - React Interview Exercise | API Integration',
        description: 'Implement pagination with load more pattern. Practice API calls, loading states, and list concatenation in React with TypeScript.',
        keywords: 'React pagination, load more button, API integration React, infinite scroll, TypeScript pagination'
    },
    guess: {
        title: 'Color Guessing Game - React Interview Exercise | Game Logic',
        description: 'Create a color guessing game with HEX code matching. Master game state management, logic implementation, and user feedback in React.',
        keywords: 'React game logic, color guessing game, state management React, TypeScript game, interactive quiz'
    },

    // Logic & State
    todo: {
        title: 'Todo List App - React Interview Exercise | CRUD Operations',
        description: 'Build a complete todo list with add, delete, and completion toggling. Learn array manipulation, object state, and CRUD patterns in React.',
        keywords: 'React todo list, CRUD operations React, task management, TypeScript todo, state management'
    },
    mirrortext: {
        title: 'Mirror Text Input - React Interview Exercise | Controlled Components',
        description: 'Create synchronized text inputs demonstrating controlled components. Master two-way data binding and input handling in React.',
        keywords: 'React controlled components, input synchronization, two-way binding React, TypeScript forms'
    },
    renderlist: {
        title: 'Filtered List Rendering - React Interview Exercise | Data Filtering',
        description: 'Implement a list with multiple filter criteria. Practice client-side filtering, sorting, and performance optimization in React.',
        keywords: 'React list filtering, data filtering React, sort and filter, TypeScript filtering, list rendering'
    },
    counter: {
        title: 'Counter Component - React Interview Exercise | State Basics',
        description: 'Build a simple counter with increment and decrement. Learn fundamental React state management and event handling.',
        keywords: 'React counter, state management basics, increment decrement React, TypeScript counter, useState'
    },
    timer: {
        title: 'Countdown Timer - React Interview Exercise | useEffect & Intervals',
        description: 'Create a countdown timer with start, pause, and reset. Master setInterval, cleanup functions, and time management in React.',
        keywords: 'React timer, countdown component, setInterval React, useEffect cleanup, TypeScript timer'
    },
    selectall: {
        title: 'Select All Checkbox - React Interview Exercise | Checkbox Pattern',
        description: 'Implement master checkbox controlling multiple items. Learn checkbox synchronization and derived state in React.',
        keywords: 'React checkbox, select all pattern, checkbox group React, TypeScript checkbox, derived state'
    },

    // Forms & Layout
    attendee: {
        title: 'Registration Form - React Interview Exercise | Form Validation',
        description: 'Build a registration form with validation and error handling. Practice form state management and conditional rendering in React.',
        keywords: 'React form validation, registration form, error handling React, TypeScript forms, form state'
    },
    multistep: {
        title: 'Multi-Step Form - React Interview Exercise | Wizard Pattern',
        description: 'Create a multi-step wizard form preserving state across steps. Master progressive state management and navigation in React.',
        keywords: 'React multi-step form, wizard pattern, form navigation React, TypeScript wizard, progressive form'
    },
    phone: {
        title: 'Phone Number Input - React Interview Exercise | Input Masking',
        description: 'Implement phone number formatting with input masking. Learn regex patterns, input formatting, and controlled inputs in React.',
        keywords: 'React input mask, phone number formatting, regex React, TypeScript input mask, form validation'
    },
    children: {
        title: 'Props Children Pattern - React Interview Exercise | Composition',
        description: 'Master component composition using the children prop. Learn layout patterns and component reusability in React.',
        keywords: 'React children prop, component composition, layout patterns React, TypeScript composition, props'
    },
    nested: {
        title: 'Nested Select Dropdowns - React Interview Exercise | Dependent State',
        description: 'Create dependent dropdown menus where child options update based on parent selection. Practice cascading state in React.',
        keywords: 'React dependent dropdowns, nested select, cascading state React, TypeScript select, dynamic options'
    },

    // Mini Apps
    usersearch: {
        title: 'User Directory Search - React Interview Exercise | Debounce & API',
        description: 'Build a searchable user table with debounce and API integration. Learn search optimization and data fetching in React.',
        keywords: 'React search, debounce React, API integration, user search TypeScript, search optimization'
    },
    fruits: {
        title: 'Fruit Search Filter - React Interview Exercise | Client Filtering',
        description: 'Implement client-side filtering with category isolation. Practice data filtering and search patterns in React.',
        keywords: 'React search filter, client-side filtering, category filter React, TypeScript search, data filtering'
    },
    shoppingcart: {
        title: 'Shopping Cart - React Interview Exercise | E-commerce Logic',
        description: 'Create shopping cart with product selection and total calculation. Master cart logic and quantity management in React.',
        keywords: 'React shopping cart, e-commerce React, cart logic TypeScript, product management, total calculation'
    },
    subscribers: {
        title: 'Subscriber Manager - React Interview Exercise | CRUD Dashboard',
        description: 'Build a subscription management dashboard with CRUD operations. Practice list management and user actions in React.',
        keywords: 'React CRUD, subscriber management, dashboard React, TypeScript CRUD, list management'
    },
    issues: {
        title: 'Issue Tracker - React Interview Exercise | Status Filtering',
        description: 'Create an issue tracking dashboard with status filtering. Learn data aggregation and custom hooks in React.',
        keywords: 'React issue tracker, status filter, dashboard TypeScript, custom hooks React, data aggregation'
    },
    products: {
        title: 'Product Catalog - React Interview Exercise | Search & Filter',
        description: 'Build a product grid with search, sort, and category filters. Master complex filtering and UI patterns in React.',
        keywords: 'React product catalog, search and filter, e-commerce grid, TypeScript product list, sorting'
    },
    kanban: {
        title: 'Kanban Board - React Interview Exercise | Task Management',
        description: 'Create a kanban task board with status columns. Learn drag-and-drop patterns and workflow management in React.',
        keywords: 'React kanban, task board TypeScript, drag and drop React, workflow management, project board'
    },
    taskcounter: {
        title: 'Task Timers - React Interview Exercise | Multiple Timers',
        description: 'Manage multiple tasks with individual running timers. Practice complex state and interval management in React.',
        keywords: 'React multiple timers, task timer TypeScript, interval management, time tracking React'
    },
    video: {
        title: 'Video Dashboard - React Interview Exercise | useRef & DOM',
        description: 'Build custom video player controls using useRef hook. Master direct DOM interaction and media controls in React.',
        keywords: 'React video player, useRef hook, DOM manipulation React, custom controls TypeScript, media player'
    }
};
