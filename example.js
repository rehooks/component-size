import React from 'react'
import { render } from 'react-dom'
import useComponentSize from './'

function App() {
  let { ref, size } = useComponentSize()
  let { width, height } = size
  let imgUrl = `https://via.placeholder.com/${width}x${height}`

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <pre>{JSON.stringify(size)}</pre>
      <div ref={ref} style={{ width: '50%', height: '50%' }}>
        <img src={imgUrl} width={width} height={height} />
      </div>
    </div>
  )
}

render(<App />, window.root)
