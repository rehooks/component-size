# `@rehooks/component-size`

## Install

```sh
yarn add @rehooks/component-size
```

## Usage

```js
import { useRef, useState } from 'react'
import useComponentSize from '@rehooks/component-size'

function MyComponent() {
  const [imgElem, setImageElem] = useState(null);
  // callback ref to ensure re-render when ref is set, as per React docs
  // https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node
  let ref = useCallback(elem => {
    if (elem !== null) {
      setImgElem(elem)
    }
  }, [])
  let size = useComponentSize(imgElem)
  // size == { width: 100, height: 200 }
  let { width, height } = size
  let imgUrl = `https://via.placeholder.com/${width}x${height}`

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <img ref={ref} src={imgUrl} />
    </div>
  )
}
```

## ResizeObserver

[Resize Observer](https://developers.google.com/web/updates/2016/10/resizeobserver)
is the API is used to determine if an element is resized. Browser support is pretty good in Chrome, but is still missing support in other major browsers.

> [Can i use ResizeObserver?](https://caniuse.com/#feat=resizeobserver)

### Polyfill

You can import the
[polyfill](https://github.com/que-etc/resize-observer-polyfill) directly from here

```sh
yarn add resize-observer-polyfill
```

Then import it in your app:

```js
import 'resize-observer-polyfill'
```

If you are using Webpack (or similar) you could use [dynamic
imports](https://webpack.js.org/api/module-methods/#import-), to load the
Polyfill only if needed. A basic implementation could look something like this:

```js
loadPolyfills()
  .then(() => /* Render React application now that your Polyfills are ready */)

/**
* Do feature detection, to figure out which polyfills needs to be imported.
**/
function loadPolyfills() {
  const polyfills = []

  if (!supportsResizeObserver()) {
    polyfills.push(import('resize-observer-polyfill'))
  }

  return Promise.all(polyfills)
}

function supportsResizeObserver() {
  return (
    'ResizeObserver' in global &&
    'ResizeObserverEntry' in global &&
    'contentRect' in ResizeObserverEntry.prototype
  )
}
```
