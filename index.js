'use strict'
var React = require('react')
var useState = React.useState
var useCallback = React.useCallback
var useLayoutEffect = React.useLayoutEffect
var useEffect = React.useEffect
/**
+* To properly measure. we need useLayoutEffect in the client but it generates a warning in the console
+* since it has no effect when it runs on the server. This is to work around it.
+* We've used this implementation: https://github.com/streamich/react-use/blob/master/src/useIsomorphicLayoutEffect.ts
 *
 * See this issue for more details: https://github.com/rehooks/component-size/issues/32
 */
var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

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
  var _useState = useState(getSize(ref ? ref.current : {}))
  var ComponentSize = _useState[0]
  var setComponentSize = _useState[1]

  var handleResize = useCallback(
    function handleResize() {
      if (ref.current) {
        setComponentSize(getSize(ref.current))
      }
    },
    [ref]
  )

  useIsomorphicLayoutEffect(
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
