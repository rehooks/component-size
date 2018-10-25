'use strict'
let { useState, useLayoutEffect, useRef } = require('react')

function getSize(el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

function useComponentSize() {
  let ref = useRef(null)
  let [size, setComponentSize] = useState(getSize({}))

  function handleResize() {
    if (ref && ref.current) {
      setComponentSize(getSize(ref.current))
    }
  }

  useLayoutEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { ref, size }
}

module.exports = useComponentSize
