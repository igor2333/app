import { useState, useEffect } from 'react'
import './App.css'
import useDebounce from './useDebounce.js'

function App() {
  const initialState = null

  const [value, setValue] = useState('')
  const [data, setData] = useState(initialState)
  const [isLoading, setIsLoading] = useState(false)

  const debouncedValue = useDebounce(value, 600)

  useEffect(() => {
    if (debouncedValue) {
      setIsLoading(true)
      fetch(`https://api.github.com/users/${value}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json)
          console.log(json)
        })
        .finally(() => setIsLoading(false))
    }

    setData(initialState)
  }, [debouncedValue])

  return (
    <div className="App">
      <input
        placeholder="Enter username..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isLoading ? <span>Loading...</span> : ''}
      {data === null ? (
        ''
      ) : (
        <div className="display">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default App
