# Greedy Coin Change Visualizer

An interactive React web application built with Next.js that visualizes the greedy coin change algorithm step-by-step.

## Features

- **Interactive Visualization**: Watch the greedy algorithm solve coin change problems in real-time
- **Step-by-Step Mode**: Advance through the algorithm one step at a time
- **Auto-Play Mode**: Animated playback with adjustable speed (0.25s, 0.5s, 1s)
- **Visual Feedback**: Color-coded coin chips (quarters, dimes, nickels, pennies)
- **Real-time Statistics**: Track current sum, remaining amount, and progress
- **Detailed Summary**: View final coin counts and mathematical expression
- **Input Validation**: Ensures valid amounts (0-999 cents)

## How the Greedy Algorithm Works

The greedy coin change algorithm always selects the largest coin denomination that doesn't exceed the remaining amount. This process repeats until the target amount is reached. For US coin denominations (25¢, 10¢, 5¢, 1¢), the greedy approach always produces the optimal solution.

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm (comes with Node.js)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd greedy-algorithm
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Deploying to Vercel

This application is optimized for deployment on Vercel:

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Vercel will automatically detect Next.js and configure the build settings
6. Click "Deploy"

The app will be live at your Vercel URL in minutes!

## Usage

1. **Enter an amount** (0-999 cents) in the input field
2. **Click "Run Greedy"** to compute all steps
3. **Use "Next Step"** to advance one step at a time
4. **Click "Auto Play"** to watch the algorithm animate
5. **Adjust speed** using the speed selector (0.25s/0.5s/1s)
6. **Click "Pause"** to stop auto-play
7. **Click "Reset"** to return to the default state (67 cents)

## Project Structure

```
greedy-algorithm/
├── app/
│   ├── layout.jsx       # Root layout component
│   ├── page.jsx         # Main coin change visualizer component
│   └── globals.css      # Global styles
├── next.config.js       # Next.js configuration
├── package.json         # Project dependencies
└── README.md           # This file
```

## Technologies Used

- **Next.js 14.2** - React framework with App Router
- **React 18.3** - UI library
- **CSS3** - Styling with animations and gradients

## License

MIT
