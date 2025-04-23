import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

const Header = ({ text }) => <h1>{text}</h1>

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

const Statistics = (props) => {
  if (props.counts[3] === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <>
    <table>
      <tbody>
      <StatisticLine text='good' value={props.counts[0]} />
      <StatisticLine text='neutral' value={props.counts[1]} />
      <StatisticLine text='bad' value={props.counts[2]} />
      <StatisticLine text='all' value={props.counts[3]} />
      <StatisticLine text='average' value={props.counts[4]} />
      <StatisticLine text='positive' value={props.counts[5]} />
      </tbody>
    </table>
    </>
  )
}



function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    const updatedTotal = updatedGood + bad + neutral
    setGood(updatedGood)
    setTotal(updatedTotal)
    setAvg( (updatedGood - bad) / updatedTotal)
    setPos((updatedGood / updatedTotal) * 100)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    const updatedTotal = updatedNeutral + bad + good
    setNeutral(updatedNeutral)
    setTotal(updatedTotal)
    setAvg( (good - bad) / updatedTotal)
    setPos((good / updatedTotal) * 100)

  }


  const handleBad = () => {
    const updatedBad = bad + 1
    const updatedTotal = updatedBad + neutral + good
    setBad(updatedBad)
    setTotal(updatedTotal)
    setAvg( (good - updatedBad) / updatedTotal)
    setPos((good / updatedTotal) * 100)

  }

  return (
    <>
      <div>
        <Header text="Give Feedback" />
        <Button onClick={handleGood} text="good" />
        <Button onClick={handleNeutral} text="neutral" />
        <Button onClick={handleBad} text="bad" />

        <Header text="Statistics" />
        <Statistics counts={[good, neutral, bad, total, avg, pos]} />

      </div>
    </>
  )
}

export default App
