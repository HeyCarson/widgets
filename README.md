# HeyCarson Partner Widgets

[![](https://data.jsdelivr.com/v1/package/npm/@heycarson/widgets/badge)](https://www.jsdelivr.com/package/npm/@heycarson/widgets)

## Table of Contents
- [Installation](#installation)
- [API Key](#api-key)
- [Usage](#usage)
- [Developer Widget Options](#developerwidget-options)

## Installation

### CDN

Check JSDelivr for the latest version: [https://www.jsdelivr.com/package/npm/@heycarson/widgets](https://www.jsdelivr.com/package/npm/@heycarson/widgets). It is recommended to use a specific version.

### NPM

```bash
npm install @heycarson/widgets
```

## API Key

To generate a public API key, log in to your partner account [here](https://partners.heycarson.com/settings), and follow the steps to create a new API key.

## Usage

### CDN

```html
<!-- HTML Snippet Example -->
<div id='hc-dev-widget'></div>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@heycarson/widgets@0.0.x/dist/developer.css">
<script type='module'>
  import DeveloperWidget from 'https://cdn.jsdelivr.net/npm/@heycarson/widgets@0.0.x/dist/developer.js'

  window.addEventListener('DOMContentLoaded', function () {
    const widget = new DeveloperWidget({
      element: document.querySelector('#hc-dev-widget'),
      apiKey: 'YOUR_API_KEY', 
      ratingFrom: '[themes|apps]' // mutually exclusive
    })

    widget.render({
      light: false // optional (default: true)
    })
    
    // use widget.destroy() to unmount it
  })
</script>
```

### NPM

```jsx
import React, { useEffect, useRef } from 'react'

// import the complete set of widgets
import { DeveloperWidget } from '@heycarson/widgets'
import '@heycarson/widgets/dist/main.css'

// or just the developer widget
import DeveloperWidget from '@heycarson/widgets/dist/developer.js'
import '@heycarson/widgets/dist/developer.css'
```

### ReactJS Example

```jsx
function App () {
  const refEl = useRef(null)
  const widgetRef = useRef(null)

  // initialize the widget and render it
  useEffect(() => {
    if (!refEl.current) {
      return
    }

    if (!widgetRef.current) {
      widgetRef.current = new DeveloperWidget({
        element: refEl.current,
        apiKey: 'YOUR_API_KEY',
        ratingFrom: '[themes|apps]' // mutually exclusive
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

## DeveloperWidget Options

### constructor()

```javascript
{
  element: HTMLElement,
  apiKey: string,
  slug: string
}
```

| Option  | Type         | Description                                         |
|---------|--------------|-----------------------------------------------------|
| element | HTMLElement  | The HTML element where the widget will be rendered. |
| apiKey  | string       | Your HeyCarson public API key.<br/>                 |
| ratingFrom    | string | Pull data from themes or app directory              |

### .render()

.render can be called multiple times to update the widget.

```javascript
{
  light: boolean
}
```

| Option  | Type          | Description                                                |
|---------|---------------|------------------------------------------------------------|
| light   | boolean (optional) | Set the theme light (true) or dark (false). Default: true. |

### .destroy()

`none`
