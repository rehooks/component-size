import React, { useRef, useState } from 'react'
import { render } from 'react-dom'
import useComponentSize from './'

function App() {
  let ref = useRef(null)
  let { width, height } = useComponentSize(ref)
  let imgUrl = `https://via.placeholder.com/${width}x${height}`
  const [fullWidth, setFullWidth] = useState(false)

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <pre>{JSON.stringify({ width, height })}</pre>
      <button onClick={() => setFullWidth(!fullWidth)}>Toggle Size</button>
      <div
        ref={ref}
        style={{ width: fullWidth ? '100%' : '50%', height: '50%' }}
      >
        <img src={imgUrl} width={width} height={height} />
      </div>
    </div>
  )
}

render(<App />, window.root)
