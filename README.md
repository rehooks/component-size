# `@rehooks/component-size`

## Install

```sh
yarn add @rehooks/component-size
```

## Usage

```js
import { useRef } from 'react'
import useComponentSize from '@rehooks/component-size'

function MyComponent() {
  let ref = useRef(null)
  let size = useComponentSize(ref)
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

If it is present, this library uses the recent [`ResizeObserver` browser
API](https://developers.google.com/web/updates/2016/10/resizeobserver) to
determine if an element's content size has changed.

If a browser does not have the `ResizeObserver` API present, then this library
falls back to listening on window size changes, which is less efficient and does
not listen for changes to the component's size due to other factors like content
changes. If it is not present, you can use pass a `ResizeObserver`
implementation into the `useComponentSize()` hook (see below).

Browser support is pretty good in Chrome, but is still missing support in other
major browsers.

> [Can i use ResizeObserver?](https://caniuse.com/#feat=resizeobserver)

### Polyfill

You can import [a ResizeObserver
ponyfill](https://github.com/que-etc/resize-observer-polyfill) with this NPM
library:

```sh
yarn add resize-observer-polyfill
```

Then use it with the `useComponentSize()` hook:

```js
import ResizeObserver from 'resize-observer-polyfill'
// ...
useComponentSize(ref, { ResizeObserver });
```

If you are using Webpack (or similar) you could use [dynamic
imports](https://webpack.js.org/api/module-methods/#import), to load the
Polyfill only if needed. A basic implementation in your component could look
something like this:

```js
// GetResizeObserver.js
// Ponyfill, not polyfill, since we're not chaging the global
// `window.ResizeObserver` variable
let ResizeObserverPonyfill;

export async function getResizeObserverOrPonyfill() {
  const BuiltinResizeObserver = window.ResizeObserver;
  if (BuiltinResizeObserver) {
    return BuiltinResizeObserver;
  }
  ResizeObserverPonyfill = (await import("resize-observer-polyfill")).default;
  return ResizeObserverPonyfill;
}

```

```js
// Your component
const [ResizeObserver, setResizeObserver] = useState(
  window.ResizeObserver);

useEffect(() => {
  if (ResizeObserver) {
    return; // don't need to load the ponyfill
  }
  let cancelled = false;

  // if imported multiple times, should load from browser cache;
  // or you can cache this in a variable
  getResizeObserverOrPonyfill().then(lib => {
    if (!cancelled) {
      // must wrap `lib` in a function: `ResizeObserver` is a function
      // itself, so prevent the state hook from interpreting as a reducer
      setResizeObserver(() => lib);
    }
  });

  return () => {
    // if unmounted before complete, don't call set state
    cancelled = true;
  }
}, []);
useComponentSize(ref, { ResizeObserver });
```
