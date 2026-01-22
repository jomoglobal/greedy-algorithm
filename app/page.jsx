'use client'

import { useState, useEffect, useRef } from 'react'

const COINS = [25, 10, 5, 1]
const DEFAULT_AMOUNT = 67

export default function CoinChangeVisualizer() {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [inputValue, setInputValue] = useState(DEFAULT_AMOUNT.toString())
  const [steps, setSteps] = useState([])
  const [currentStepIndex, setCurrentStepIndex] = useState(-1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(500) // milliseconds
  const [error, setError] = useState('')
  const intervalRef = useRef(null)

  // Greedy algorithm to compute all steps
  const computeSteps = (targetAmount) => {
    const stepList = []
    let remaining = targetAmount

    while (remaining > 0) {
      // Find the largest coin that doesn't exceed remaining
      const coin = COINS.find(c => c <= remaining)

      if (!coin) break // Safety check

      stepList.push({
        coin,
        remainingBefore: remaining,
        remainingAfter: remaining - coin
      })

      remaining -= coin
    }

    return stepList
  }

  // Validate and run greedy algorithm
  const handleRunGreedy = () => {
    const num = parseInt(inputValue, 10)

    if (isNaN(num)) {
      setError('Please enter a valid integer')
      return
    }

    if (num < 0 || num > 999) {
      setError('Amount must be between 0 and 999')
      return
    }

    setError('')
    setAmount(num)

    if (num === 0) {
      setSteps([])
      setCurrentStepIndex(-1)
      setIsPlaying(false)
      return
    }

    const newSteps = computeSteps(num)
    setSteps(newSteps)
    setCurrentStepIndex(newSteps.length - 1) // Show all steps
    setIsPlaying(false)
  }

  // Advance to next step
  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  // Auto play animation
  const handleAutoPlay = () => {
    if (steps.length === 0) {
      handleRunGreedy()
      setTimeout(() => {
        setCurrentStepIndex(0)
        setIsPlaying(true)
      }, 100)
    } else if (currentStepIndex >= steps.length - 1) {
      // Restart from beginning
      setCurrentStepIndex(0)
      setIsPlaying(true)
    } else {
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setAmount(DEFAULT_AMOUNT)
    setInputValue(DEFAULT_AMOUNT.toString())
    setSteps([])
    setCurrentStepIndex(-1)
    setIsPlaying(false)
    setError('')
  }

  // Auto-play interval effect
  useEffect(() => {
    if (isPlaying && currentStepIndex < steps.length - 1) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false)
            return prev
          }
          return prev + 1
        })
      }, speed)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (isPlaying && currentStepIndex >= steps.length - 1) {
        setIsPlaying(false)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentStepIndex, steps.length, speed])

  // Get coins to display (up to current step)
  const visibleSteps = steps.slice(0, currentStepIndex + 1)
  const coinsUsed = visibleSteps.map(s => s.coin)
  const currentSum = coinsUsed.reduce((sum, coin) => sum + coin, 0)
  const currentRemaining = amount - currentSum

  // Calculate coin counts for summary
  const coinCounts = {
    25: coinsUsed.filter(c => c === 25).length,
    10: coinsUsed.filter(c => c === 10).length,
    5: coinsUsed.filter(c => c === 5).length,
    1: coinsUsed.filter(c => c === 1).length,
  }

  const isFinished = currentStepIndex >= 0 && currentStepIndex === steps.length - 1

  return (
    <div className="container">
      <h1>Greedy Coin Change Visualizer</h1>

      <div className="explanation">
        <strong>How it works:</strong> Greedy means choosing the largest coin that does not exceed the remaining amount.
        The algorithm repeatedly selects the biggest possible coin until the target amount is reached.
      </div>

      <div className="input-section">
        <div className="input-group">
          <label htmlFor="amount">Amount (cents):</label>
          <input
            id="amount"
            type="number"
            min="0"
            max="999"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleRunGreedy()
              }
            }}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <div className="controls">
        <button onClick={handleRunGreedy}>
          Run Greedy
        </button>
        <button
          onClick={handleNextStep}
          disabled={steps.length === 0 || currentStepIndex >= steps.length - 1}
        >
          Next Step
        </button>
        <button
          onClick={handleAutoPlay}
          disabled={isPlaying}
          className="secondary"
        >
          Auto Play
        </button>
        <button
          onClick={handlePause}
          disabled={!isPlaying}
          className="secondary"
        >
          Pause
        </button>
        <button
          onClick={handleReset}
          className="reset"
        >
          Reset
        </button>

        <div className="speed-control">
          <label htmlFor="speed">Speed:</label>
          <select
            id="speed"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          >
            <option value="250">0.25s</option>
            <option value="500">0.5s</option>
            <option value="1000">1s</option>
          </select>
        </div>
      </div>

      <div className="visualization">
        <div className="status-bar">
          <div className="status-item">
            <div className="status-label">Target Amount</div>
            <div className="status-value">{amount}¢</div>
          </div>
          <div className="status-item">
            <div className="status-label">Current Sum</div>
            <div className="status-value">{currentSum}¢</div>
          </div>
          <div className="status-item">
            <div className="status-label">Remaining</div>
            <div className="status-value">{currentRemaining}¢</div>
          </div>
        </div>

        <div className="coins-display">
          {coinsUsed.map((coin, index) => (
            <div key={index} className={`coin-chip coin-${coin}`}>
              {coin}¢
            </div>
          ))}
        </div>
      </div>

      {currentStepIndex >= 0 && steps[currentStepIndex] && (
        <div className="step-panel">
          <h3>Current Step: {currentStepIndex + 1} of {steps.length}</h3>
          <div className="step-info">
            <div><strong>Coin chosen:</strong> {steps[currentStepIndex].coin}¢</div>
            <div><strong>Remaining before:</strong> {steps[currentStepIndex].remainingBefore}¢</div>
            <div><strong>Remaining after:</strong> {steps[currentStepIndex].remainingAfter}¢</div>
          </div>
        </div>
      )}

      {isFinished && (
        <div className="summary">
          <h3>Summary</h3>

          <div className="coin-counts">
            <div className="coin-count-item">
              <span className="coin-count-label">Quarters (25¢):</span>
              <span className="coin-count-value">{coinCounts[25]}</span>
            </div>
            <div className="coin-count-item">
              <span className="coin-count-label">Dimes (10¢):</span>
              <span className="coin-count-value">{coinCounts[10]}</span>
            </div>
            <div className="coin-count-item">
              <span className="coin-count-label">Nickels (5¢):</span>
              <span className="coin-count-value">{coinCounts[5]}</span>
            </div>
            <div className="coin-count-item">
              <span className="coin-count-label">Pennies (1¢):</span>
              <span className="coin-count-value">{coinCounts[1]}</span>
            </div>
          </div>

          <div className="final-expression">
            <strong>Expression:</strong> {amount} = {coinsUsed.join(' + ')}
          </div>
        </div>
      )}
    </div>
  )
}
