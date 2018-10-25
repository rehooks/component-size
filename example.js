import React, { useRef } from 'react'
import { render } from 'react-dom'
import useComponentSize from './'

function App() {
  let ref = useRef(null)
  let { width, height } = useComponentSize(ref)
  let imgUrl = `https://via.placeholder.com/${width}x${height}`

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <pre>{JSON.stringify({ width, height })}</pre>
      <div ref={ref} style={{ width: '50%', height: '50%' }}>
        <img src={imgUrl} width={width} height={height} />
      </div>
    </div>
  )
}

render(<App />, window.root)
