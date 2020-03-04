'use strict'
var React = require('react')
var useState = React.useState
var useCallback = React.useCallback
var useLayoutEffect = React.useLayoutEffect

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

function useComponentSize(ref, opts) {
  var ResizeObserverConstructor = opts && opts.ResizeObserver
    ? opts.ResizeObserver
    : typeof ResizeObserver === 'function'
      ? ResizeObserver
      : undefined;
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

  useLayoutEffect(
    function() {
      if (!ref.current) {
        return
      }

      handleResize()

      if (ResizeObserverConstructor) {
        var resizeObserver = new ResizeObserverConstructor(function() {
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
    [ref.current, ResizeObserverConstructor]
  )

  return ComponentSize
}

module.exports = useComponentSize
