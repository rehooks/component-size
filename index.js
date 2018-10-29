'use strict'
let { useState, useLayoutEffect } = require('react')
let ResizeObserver = require('resize-observer-polyfill').default

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

  function handleResize() {
    if (ref && ref.current) {
      setComponentSize(getSize(ref.current))
    }
  }

  useLayoutEffect(() => {
    handleResize()
    const resizeObserver = new ResizeObserver(() => handleResize())

    resizeObserver.observe(ref.current)

    return () => {
      resizeObserver.disconnect(ref.current)
      resizeObserver = null
    }
  }, [])

  return ComponentSize
}

module.exports = useComponentSize
