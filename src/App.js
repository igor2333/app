import { useState, useEffect } from 'react'
import './App.css'
import useDebounce from './useDebounce.js'

function App() {
  const [value, setValue] = useState('')
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const debouncedValue = useDebounce(value, 600)
  const initialState = []

  useEffect(() => {
    if (debouncedValue) {
      setIsLoading(true)
      fetch(`https://api.github.com/users/${value}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json)
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
      {data.length === 0 ? (
        ''
      ) : (
        <div className="display">
          <pre>{JSON.stringify(data, null, '  ')}</pre>
        </div>
      )}
    </div>
  )
}

export default App
