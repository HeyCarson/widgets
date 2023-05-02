# HeyCarson: Themes Widget

[![](https://data.jsdelivr.com/v1/package/npm/@heycarson/themes-widget/badge)](https://www.jsdelivr.com/package/npm/@heycarson/themes-widget)


## Usage


### CDN

Check JSDelivr for the latest version: [https://www.jsdelivr.com/package/npm/@heycarson/themes-widget](https://www.jsdelivr.com/package/npm/@heycarson/themes-widget). Recommended to use a specific version.

```html
<!-- HTML Snippet Example -->
<div id='hc-dev-widget'></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@heycarson/themes-widget@0.0.x/dist/developer.css">
<script type='module'>
  import DeveloperWidget from 'https://cdn.jsdelivr.net/npm/@heycarson/themes-widget@0.0.x/dist/developer.js'

  window.addEventListener('DOMContentLoaded', function () {
    const widget = new DeveloperWidget({
      element: document.querySelector('#hc-dev-widget'),
      apiKey: '...',
    })

    widget.render({
      light: false // optional (default: true)
    })
    
    // use widget.destroy() to unmount it
  })
</script>
```

### NPM

```bash
npm install @heycarson/themes-widget
```

```jsx
// ReactJS Example
import React, { useEffect, useRef } from 'react'

// import the complete set of widgets
import { DeveloperWidget } from '@heycarson/themes-widget'
import '@heycarson/themes-widget/dist/main.css'
// or just the developer widget
import DeveloperWidget from '@heycarson/themes-widget/dist/developer.js'
import '@heycarson/themes-widget/dist/developer.css'

function App () {
  const refEl = useRef(null)
  const widgetRef = useRef(null)

  // initialize the widget and render it
  useEffect(() => {
    if (!refEl.current) {
      return
    }

    if (!widgetRef.current) {
      widgetRef.current = new DevWidget({
        element: refEl.current,
        apiKey: '...',
      })
    }

    widgetRef.current.render({
      light: false // optional (default: true)
    })

    return () => {
      widgetRef.current?.destroy()
    }
  }, [])

  return (
    // ...
    <div ref={refEl} />
    // ...
  )
}

```
