# GPT-3 Vercel Template

A modern Next.js template for building GPT-powered applications with streaming responses. Built with TypeScript, Tailwind CSS, and deployed on Vercel Edge Functions.

## Features

- **Streaming Responses**: Real-time streaming of GPT responses using Server-Sent Events
- **Edge Runtime**: Optimized performance with Vercel Edge Functions
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Modern, responsive UI with animated backgrounds
- **Customizable**: Easy configuration through environment variables
- **Error Handling**: Comprehensive error handling for production use

## Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- An OpenAI API key ([Get one here](https://platform.openai.com/account/api-keys))

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gpt-3-vercel-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your OpenAI API key:
   ```env
   OPENAI_API_KEY="your-api-key-here"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/gpt-3-vercel-template)

1. Click "Use this template" to create a new repository
2. Import your repository in Vercel
3. Configure environment variables (see below)
4. Deploy!

## Environment Variables

Copy the `.env.example` file to `.env` and configure the following variables:

### Client-side Variables
These are exposed to the browser:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `APP_NAME` | No | "OhMyGPT" | Your application name |
| `APP_LOGO` | No | - | URL to your app logo |
| `APP_THEME_COLOR` | No | "#22c55e" | Primary theme color (hex) |
| `APP_SUMMARY` | No | "Ask me any thing you want." | App description |
| `EXAMPLE_INPUT` | No | "Ask me any thing." | Placeholder text |

### Server-side Variables
These are only available on the server:

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | **Yes** | - | Your OpenAI API key |
| `OPENAI_API_BASE_URL` | No | "https://api.openai.com" | Custom API endpoint |
| `SYSTEM_MESSAGE` | No | - | System prompt for GPT |
| `MESSAGE_TEMPLATE` | No | - | Template for user messages (use `{{input}}` as placeholder) |

## Project Structure

```
├── components/          # React components
│   ├── background-gradient.tsx
│   └── card.tsx
├── helpers/            # Utility functions
│   ├── env-utils.ts
│   └── openai-stream.ts
├── pages/              # Next.js pages
│   ├── api/
│   │   └── request.ts  # API endpoint for GPT requests
│   ├── _app.tsx
│   └── index.tsx       # Main page
├── public/             # Static files
├── styles/             # Global styles
├── config-client.ts    # Client configuration
├── config-server.ts    # Server configuration
└── env.d.ts           # Environment types
```

## API Endpoints

### POST /api/request

Streams GPT responses for the given input.

**Request Body:**
```json
{
  "input": "Your question here"
}
```

**Response:**
Server-Sent Events stream of the GPT response

**Error Codes:**
- `400`: Invalid input (missing or empty)
- `500`: Server error (API error, network issues, etc.)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Lint code with ESLint
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

### Code Quality

This project uses:
- **TypeScript 5.7+** for type safety
- **ESLint** for code linting
- **Prettier** for code formatting

Run `npm run lint` and `npm run format` before committing.

## Custom Widgets

You can create custom HTML widgets in the `public/` directory:

1. Create a new `.html` file (e.g., `public/custom.html`)
2. Use the `/api/request` endpoint with streaming support
3. Access it at `/custom.html`

See `public/test.html` for an example implementation.

## Tutorial

Check out the [full tutorial and demo on YouTube](https://www.youtube.com/watch?v=NGlfGRpkd0Q)

## License

MIT
