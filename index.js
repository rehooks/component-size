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

function useComponentSize(elemOrRef) {
  const el = elemOrRef && (
    elemOrRef instanceof Element || elemOrRef instanceof HTMLDocument
      ? elemOrRef
      : elemOrRef.current
  );
  var _useState = useState(getSize(el))
  var ComponentSize = _useState[0]
  var setComponentSize = _useState[1]

  var handleResize = useCallback(
    function handleResize() {
      if (el) {
        setComponentSize(getSize(el))
      }
    },
    [el]
  )

  useLayoutEffect(
    function() {
      if (!el) {
        return;
      }

      handleResize()

      if (typeof ResizeObserver === 'function') {
        var resizeObserver = new ResizeObserver(function() {
          handleResize()
        })
        resizeObserver.observe(el)

        return function() {
          resizeObserver.disconnect(el)
          resizeObserver = null
        }
      } else {
        window.addEventListener('resize', handleResize)

        return function() {
          window.removeEventListener('resize', handleResize)
        }
      }
    },
    [el]
  )

  return ComponentSize
}

module.exports = useComponentSize
