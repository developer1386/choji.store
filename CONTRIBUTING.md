# Contributing to Choji Store

Thank you for considering contributing to Choji Store! This document provides guidelines and best practices for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/choji.store.git
   cd choji.store
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

1. Make your changes
2. Follow the coding standards:
   - Use TypeScript for type safety
   - Follow React best practices
   - Maintain accessibility standards
   - Keep components modular and reusable

3. Test your changes:
   ```bash
   npm run lint    # Run ESLint
   npm run build   # Ensure build succeeds
   ```

4. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

## Commit Message Format

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Adding or modifying tests
- `chore:` Maintenance tasks

## Pull Request Process

1. Update documentation
2. Verify all tests pass
3. Push to your fork
4. Create a Pull Request with:
   - Clear title and description
   - Link to any related issues
   - Screenshots for UI changes

## Code Style Guidelines

### TypeScript
- Use TypeScript for all new code
- Define types/interfaces for props and state
- Avoid `any` type

### React
- Use functional components with hooks
- Keep components small and focused
- Follow React best practices

### CSS/Tailwind
- Follow mobile-first approach
- Use Tailwind utility classes
- Maintain consistent naming

## Documentation

- Update README.md when adding features
- Document new components
- Include JSDoc comments for functions
- Update TypeScript types

## Questions or Problems?

Open an issue in the repository or contact the maintainers.
