'use strict'
let { useCallback, useState, useLayoutEffect } = require('react')

function getSize(el) {
  if (!el) {
    return {}
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

function useComponentSize(ref) {
  let [ComponentSize, setComponentSize] = useState(getSize(ref.current))

  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setComponentSize(getSize(ref.current))
      }
    },
    [ref]
  )

  useLayoutEffect(() => {
    if (!ref.current) { return }

    handleResize()

    if (typeof ResizeObserver === 'function') {
      let resizeObserver = new ResizeObserver(() => handleResize())
      resizeObserver.observe(ref.current)

      return () => {
        resizeObserver.disconnect(ref.current)
        resizeObserver = null
      }
    } else {
      window.addEventListener('resize', handleResize)
      
      return () => {
        window.removeEventListener('resize', handleResize) 
      }
    }
    
  }, [ref.current])

  return ComponentSize
}

module.exports = useComponentSize
