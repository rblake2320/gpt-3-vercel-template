# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-11-19

### Added
- `.env.example` file with comprehensive documentation for all environment variables
- `.gitignore` file to prevent committing sensitive files and build artifacts
- ESLint configuration (`.eslintrc.json`) for code quality enforcement
- Prettier configuration (`.prettierrc` and `.prettierignore`) for consistent code formatting
- Shared environment utilities in `helpers/env-utils.ts` to reduce code duplication
- Comprehensive error handling throughout the application
- Package.json metadata (name, version, description, engines)
- New npm scripts: `type-check`, `lint`, `format`, `format:check`
- Improved README with detailed setup instructions, API documentation, and project structure

### Changed
- **CRITICAL FIX**: Fixed typo in `tailwind.config.js` line 21 - changed "blue" to "blur" for proper CSS filter
- Upgraded TypeScript from 4.8.4 to 5.7.2 (Next.js recommended minimum is 5.1.0)
- Updated all dependencies to latest stable versions:
  - React: 18.2.0 → 18.3.1
  - @types/node: 18.11.3 → 22.10.2
  - @types/react: 18.0.21 → 18.3.17
  - @types/react-dom: 18.0.6 → 18.3.5
  - autoprefixer: 10.4.12 → 10.4.20
  - postcss: 8.4.18 → 8.4.49
  - tailwindcss: 3.2.4 → 3.4.17
- Improved error handling in `pages/index.tsx`:
  - Added try-catch block for fetch requests
  - Better error messages displayed to users
  - Null safety for response handling
- Enhanced error handling in `pages/api/request.ts`:
  - Changed 404 to 400 for invalid input (correct HTTP status)
  - Added try-catch block for error handling
  - Proper JSON error responses with meaningful messages
- Improved `helpers/openai-stream.ts`:
  - Removed `@ts-ignore` comment
  - Added response status checking
  - Added null check for response body
  - Better error handling in stream processing
  - Replaced async iteration with proper reader usage
- Fixed streaming response handling in `public/test.html`:
  - Changed from `response.text()` to proper streaming reader
  - Added error handling
  - Real-time display of streamed chunks
- Refactored config files to use shared utilities from `helpers/env-utils.ts`
- Improved `config-client.ts` to use consistent `optional()` and `fillDefault()` helpers

### Removed
- Unused imports from `pages/index.tsx`: `Image`, `Preahvihear`, `MouseEvent`, `useRef`
- Duplicate `fillDefault`, `optional`, and `required` functions from config files
- TypeScript `any` type usage in `helpers/openai-stream.ts`

### Security
- No security vulnerabilities found in dependencies (npm audit: 0 vulnerabilities)
- Added proper `.gitignore` to prevent accidental commit of `.env` files
- API key properly protected as server-side only variable

### Performance
- All dependencies updated to latest versions for bug fixes and performance improvements
- TypeScript 5.7.2 provides faster type checking
- Code splitting ready with updated Next.js

### Documentation
- Complete rewrite of README.md with:
  - Quick start guide
  - Environment variable documentation table
  - Project structure overview
  - API endpoint documentation
  - Development guidelines
  - Custom widget instructions
- Added `.env.example` with inline documentation
- Added JSDoc comments to utility functions in `helpers/env-utils.ts`
