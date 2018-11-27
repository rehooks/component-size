'use strict'
let test = require('ava')
let { createElement: h } = require('react')
let ReactTestRenderer = require('react-test-renderer')
let useComponentSize = require('./')

function render(val) {
  return ReactTestRenderer.create(val)
}

test(t => {
  function Component() {
    let size = useComponentSize({})
    return h('div', size)
  }

  let input = render(h(Component))

  t.is(input.toJSON().props.width, 0)
  t.is(input.toJSON().props.height, 0)
})
