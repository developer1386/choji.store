# 🤝 Contributing to Choji Store

> **Premium Homemade Cat Food E-commerce Platform**

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Code of Conduct](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](code_of_conduct.md)

Thank you for considering contributing to Choji Store! This document provides guidelines and workflows for contributing to our project.

## 📑 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Documentation](#documentation)
- [Getting Help](#getting-help)

Thank you for considering contributing to Choji Store! This document provides comprehensive guidelines, best practices, and detailed workflows for contributing to our premium cat food e-commerce platform built with React, TypeScript, and modern web technologies.

## 📜 Code of Conduct

We follow the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct. By participating in this project, you agree to uphold its terms.

Key points:
- Be respectful and inclusive
- No harassment or discrimination
- Focus on constructive feedback
- Support a positive environment

## 🌟 Project Overview

Choji Store is a modern, SEO-optimized e-commerce landing page featuring:
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for responsive, mobile-first design
- **WhatsApp Integration** for seamless order processing
- **Multi-platform Analytics** (GA4, Umami, Clarity)
- **GDPR-compliant** cookie consent management
- **Comprehensive SEO** with structured data
- **Performance monitoring** with Sentry and Web Vitals

## 🚀 Getting Started

### System Requirements

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: Latest version
- **VS Code**: Recommended editor

### Development Tools

- **TypeScript**: For type safety
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Vitest**: Testing framework

### Prerequisites

Before contributing, ensure you have:
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **Git** for version control
- A modern code editor (VS Code recommended)
- Basic knowledge of React, TypeScript, and Tailwind CSS

### 1. Fork and Clone

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/your-username/choji.store.git
   cd choji.store
   ```

### 2. Environment Setup

1. **Install VS Code Extensions**:
   - ESLint
   - Prettier
   - TypeScript + JavaScript
   - Tailwind CSS IntelliSense

2. **Configure Git**:
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your.email@example.com"
   ```

3. **Install dependencies**:
   ```bash
   # Clean install dependencies
   npm ci
   
   # Or regular install
   npm install
   ```

4. **Create environment file** (optional):
   ```bash
   cp .env.example .env.local
   # Add your API keys for analytics platforms
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### 3. Branch Strategy

6. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   # or
   git checkout -b docs/documentation-update
   ```

## 🛠️ Development Workflow

### Development Cycle

1. 📋 **Plan**
   - Review issues/tasks
   - Understand requirements
   - Design solution

2. 🔧 **Develop**
   - Write clean code
   - Follow standards
   - Add tests

3. 🧪 **Test**
   - Run test suite
   - Manual testing
   - Performance check

4. 📝 **Document**
   - Update docs
   - Add comments
   - Write examples

5. 🔍 **Review**
   - Self-review
   - Peer review
   - Address feedback

### 1. Making Changes

**Code Quality Standards:**
- ✅ Use **TypeScript** for all new code with proper type definitions
- ✅ Follow **React best practices** (hooks, functional components)
- ✅ Maintain **WCAG 2.1 AA accessibility** standards
- ✅ Keep components **modular and reusable**
- ✅ Write **comprehensive JSDoc** comments
- ✅ Follow **mobile-first** responsive design principles

### 2. Testing and Validation

**Before committing, run all checks:**
```bash
# Lint your code
npm run lint

# Build the project
npm run build

# Preview the build
npm run preview
```

**Manual Testing Checklist:**
- [ ] Test on mobile devices (responsive design)
- [ ] Verify WhatsApp integration works
- [ ] Check accessibility with screen readers
- [ ] Test with JavaScript disabled
- [ ] Validate SEO structured data
- [ ] Test cookie consent functionality

### 3. Performance Considerations

- **Bundle Size**: Keep bundle size minimal
- **Core Web Vitals**: Maintain good LCP, FID, and CLS scores
- **Image Optimization**: Use appropriate formats and sizes
- **Code Splitting**: Implement lazy loading where appropriate

### 4. Commit Your Changes

```bash
git add .
# Follow the conventional commit format: <type>: <description>
git commit -m "feat(component): add detailed feature description"
```

For example:
```bash
git commit -m "feat(analytics): implement privacy-focused user tracking"
git commit -m "fix(ui): resolve mobile navigation overflow issue"
git commit -m "perf(images): optimize product image loading"
```

## 📝 Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specifications for clear, semantic commit messages:

### Commit Types

| Type | Description | Example |
|------|-------------|----------|
| `feat:` | New features | `feat: add WhatsApp order integration` |
| `fix:` | Bug fixes | `fix: resolve mobile navigation issue` |
| `docs:` | Documentation changes | `docs: update API documentation` |
| `style:` | Code style changes | `style: format with prettier` |
| `refactor:` | Code refactoring | `refactor: optimize analytics module` |
| `perf:` | Performance improvements | `perf: lazy load product images` |
| `test:` | Adding or modifying tests | `test: add unit tests for utils` |
| `chore:` | Maintenance tasks | `chore: update dependencies` |
| `ci:` | CI/CD changes | `ci: add automated deployment` |
| `build:` | Build system changes | `build: optimize Vite configuration` |

### Commit Message Structure

```
type(scope): description

[optional body]

[optional footer]
```

**Examples:**
```bash
feat(analytics): add Umami integration for privacy-focused tracking

fix(mobile): resolve WhatsApp button positioning on small screens

docs(readme): update installation instructions and add troubleshooting
```

## 🔄 Pull Request Process

### 1. Pre-submission Checklist

- [ ] **Documentation updated** (README, JSDoc comments, etc.)
- [ ] **All linting passes** (`npm run lint`)
- [ ] **Build succeeds** (`npm run build`)
- [ ] **Manual testing completed** (see testing checklist above)
- [ ] **Accessibility verified** (keyboard navigation, screen readers)
- [ ] **Mobile responsiveness tested**
- [ ] **Performance impact assessed**

### 2. Push and Create PR

```bash
# Push your branch
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### 3. Pull Request Template

When creating a PR, include:

**Title:** Use conventional commit format
```
feat: add advanced analytics dashboard
```

**Description Template:**
```markdown
## 📋 Description
 Brief description of changes made.

## 🔗 Related Issues
Closes #123
Related to #456

## 🧪 Testing
- [ ] Manual testing completed
- [ ] Cross-browser testing
- [ ] Mobile testing
- [ ] Accessibility testing

## 📱 Screenshots/GIFs
<!-- For UI changes -->

## 🚀 Deployment Notes
<!-- Any special deployment considerations -->

## 📝 Additional Notes
<!-- Any other relevant information -->
```

### 4. Review Process

- **Automated checks** must pass (linting, build)
- **Code review** by maintainers
- **Testing verification** on different devices/browsers
- **Documentation review** for completeness
- **Performance impact assessment**

## 🎨 Code Style Guidelines

### General Principles

1. **Readability First**
   - Clear variable names
   - Consistent formatting
   - Meaningful comments

2. **Maintainability**
   - Small functions
   - Single responsibility
   - DRY principle

3. **Performance**
   - Efficient algorithms
   - Resource optimization
   - Bundle size awareness

### TypeScript Standards

```typescript
// ✅ Good: Proper type definitions
interface OrderFormProps {
  selectedQuantity: '250g' | '500g' | '1kg';
  onSubmit: (quantity: string) => Promise<void>;
  isLoading?: boolean;
}

// ✅ Good: Explicit return types
const calculatePrice = (quantity: string): number => {
  // Implementation
};

// ❌ Avoid: Using 'any' type
const handleData = (data: any) => { /* ... */ };

// ✅ Better: Proper typing
const handleData = (data: OrderData) => { /* ... */ };
```

**TypeScript Rules:**
- ✅ Use **strict mode** enabled
- ✅ Define **interfaces/types** for all props and state
- ✅ Avoid `any` type - use `unknown` if necessary
- ✅ Use **utility types** (Partial, Pick, Omit) when appropriate
- ✅ Implement **proper error handling** with typed errors

### React Best Practices

```tsx
// ✅ Good: Functional component with proper typing
const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onSelect, 
  isSelected 
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  
  const handleClick = useCallback(() => {
    onSelect(product.id);
  }, [onSelect, product.id]);
  
  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Component content */}
    </div>
  );
};
```

**React Rules:**
- ✅ Use **functional components** with hooks
- ✅ Keep components **small and focused** (< 200 lines)
- ✅ Use **useCallback** and **useMemo** for optimization
- ✅ Implement **proper error boundaries**
- ✅ Follow **React Hooks rules** (ESLint enforced)
- ✅ Use **custom hooks** for reusable logic

### CSS/Tailwind Guidelines

```tsx
// ✅ Good: Mobile-first responsive design
<div className="
  w-full p-4
  md:w-1/2 md:p-6
  lg:w-1/3 lg:p-8
  hover:scale-105 transition-transform
  focus:outline-none focus:ring-2 focus:ring-orange-500
">

// ✅ Good: Semantic class grouping
<button className="
  /* Layout */
  w-full py-3 px-6
  /* Typography */
  text-lg font-semibold
  /* Colors */
  bg-orange-500 text-white
  hover:bg-orange-600
  /* Effects */
  rounded-lg shadow-lg
  transition-colors duration-200
  /* Accessibility */
  focus:outline-none focus:ring-2 focus:ring-orange-300
">
```

**CSS/Tailwind Rules:**
- ✅ Follow **mobile-first** approach
- ✅ Use **Tailwind utility classes** primarily
- ✅ Group classes logically (layout, typography, colors, effects)
- ✅ Maintain **WCAG 2.1 AA** color contrast ratios
- ✅ Implement **focus states** for accessibility
- ✅ Use **semantic HTML** elements
- ✅ Test with **reduced motion** preferences

## 📚 Documentation Standards

### JSDoc Comments

All functions, components, and modules should have comprehensive JSDoc documentation:

```typescript
/**
 * Calculates the total price for a cat food order including taxes
 * 
 * @param quantity - Product quantity ('250g' | '500g' | '1kg')
 * @param basePrice - Base price per unit in USD
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns Total price including taxes
 * 
 * @example
 * ```typescript
 * const total = calculateOrderTotal('500g', 25.99, 0.08);
 * console.log(total); // 28.07
 * ```
 */
const calculateOrderTotal = (
  quantity: ProductQuantity,
  basePrice: number,
  taxRate: number
): number => {
  // Implementation
};
```

### Documentation Requirements

- ✅ **README.md**: Update when adding major features
- ✅ **Component docs**: Document props, usage, and examples
- ✅ **API documentation**: For utility functions and modules
- ✅ **TypeScript types**: Comprehensive type definitions
- ✅ **Inline comments**: For complex business logic
- ✅ **Architecture decisions**: Document in `/docs` folder

### File Organization

```
docs/
├── API.md              # API documentation
├── ARCHITECTURE.md     # System architecture
├── DEPLOYMENT.md       # Deployment guide
├── SERVICE_WORKER.md   # PWA documentation
└── TYPESCRIPT.md       # TypeScript examples
```

## 🆘 Getting Help

### Communication Channels

- **🐛 Bug Reports**: [Create an issue](https://github.com/usamaejaz9741/choji.store/issues/new?template=bug_report.md)
- **💡 Feature Requests**: [Create an issue](https://github.com/usamaejaz9741/choji.store/issues/new?template=feature_request.md)
- **❓ Questions**: [Start a discussion](https://github.com/usamaejaz9741/choji.store/discussions)
- **📧 Direct Contact**: [Email maintainers](mailto:usama@example.com)

### Before Asking for Help

1. **Search existing issues** and discussions
2. **Check the documentation** in `/docs`
3. **Review the README.md** for setup instructions
4. **Try the troubleshooting steps** below

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Build fails | Run `npm ci` to clean install dependencies |
| TypeScript errors | Check `tsconfig.json` and update types |
| Styling issues | Verify Tailwind classes and responsive breakpoints |
| Analytics not working | Check environment variables and API keys |

---

## 🙏 Thank You!

Your contributions help make Choji Store better for cat lovers everywhere! Every contribution, no matter how small, is valued and appreciated.

**Happy coding! 🐱💻**

---

*This contributing guide is regularly updated. Last updated: August 2025*
