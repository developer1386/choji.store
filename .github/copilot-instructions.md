# AI Agent Instructions for choji.store

## Project Overview
This is a React + TypeScript e-commerce landing page for premium homemade cat food, built with Vite and styled with Tailwind CSS. The site features a simple, single-page design with WhatsApp integration for order placement.

## Key Technologies
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Lucide React for icons

## Project Structure
```
src/
  App.tsx      # Main application component with all UI logic
  index.css    # Global styles and Tailwind imports
  main.tsx     # Application entry point
```

## Development Workflow

### Getting Started
```bash
npm install    # Install dependencies
npm run dev    # Start development server
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Key Patterns and Conventions

### State Management
- Local React state using `useState` hooks for form handling
- State is contained within the `App.tsx` component

### Styling
- Tailwind CSS classes for all styling
- Uses gradient backgrounds (`bg-gradient-to-b`)
- Consistent color scheme using orange-500 as primary color
- Mobile-first responsive design

### Component Architecture
- Single page application with all logic in `App.tsx`
- Sections are organized as nested components within `App.tsx`
- UI components use Lucide React icons

### Form Handling
- WhatsApp integration for order placement
- Phone number validation before form submission
- Dynamic message construction with selected quantity

### Constants and Configuration
- Configuration is managed through `vite.config.ts`
- Lucide React is excluded from dependency optimization

## Integration Points
- WhatsApp API for order messaging
- Links are constructed using `wa.me` URLs with encoded parameters

## Testing and Quality
- ESLint for code quality (configuration in `eslint.config.js`)
- TypeScript for type safety
