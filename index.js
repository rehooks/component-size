'use strict'
const React = require('react')
const useState = React.useState
const useCallback = React.useCallback
const useLayoutEffect = React.useLayoutEffect

function getSize(el) {
  if (!el) {
    return {
      width: 0,
      height: 0
    }
  }

  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

function useComponentSize(ref) {
  const _useState = useState(getSize(ref ? ref.current : {}))
  const ComponentSize = _useState[0]
  const setComponentSize = _useState[1]

  const handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        const newSize = getSize(ref.current)

        if (ComponentSize.width !== newSize.width || ComponentSize.height !== newSize.height) {
          setComponentSize(newSize)
        }
      }
    },
    [ref]
  )

  useLayoutEffect(
    function() {
      if (!ref.current) {
        return
      }

      handleResize()

      if (typeof ResizeObserver === 'function') {
        var resizeObserver = new ResizeObserver(function() {
          handleResize()
        })
        resizeObserver.observe(ref.current)

        return function() {
          resizeObserver.disconnect(ref.current)
          resizeObserver = null
        }
      } else {
        window.addEventListener('resize', handleResize)

        return function() {
          window.removeEventListener('resize', handleResize)
        }
      }
    },
    [ref.current]
  )

  return ComponentSize
}

module.exports = useComponentSize
