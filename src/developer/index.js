import builder, { changeWidget, checkSize } from './builder.js'

const initialOptions = {
  endpoint: 'https://referral-api.heycarson.com',
  element: null,
  apiKey: null,
  developer: '',
  light: true,

  debug: false,
  fetchDeveloper: null
}

const fetchDeveloper = async (endpoint, apiKey) => {
  return await fetch(`${endpoint}/v1/theme-developer-widget`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Api-Key': apiKey,
    }
  })
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      if (res.status === 404) {
        return null
      }

      const body = res.json()

      throw new Error('Something went wrong' + (body?.message ? `: ${body.message}` : ''))
    })
}

class DeveloperWidget {
  constructor (options = {}) {
    this.options = { ...initialOptions, ...options }

    this.developer = null
    this.apiKey = null

    this.container = null
    this.observerTimeout = null

    this.observer = new ResizeObserver(entries => {
      clearTimeout(this.observerTimeout)

      if (!entries.length) {
        return
      }

      const { width } = entries[0].contentRect

      this.observerTimeout = setTimeout(() => {
        checkSize(this.container, width)
      }, 100)
    })
  }

  async render (options = {}) {
    if (!(this.options.element instanceof Element)) {
      throw new Error('options.element: HTMLElement is required')
    }

    this.options = { ...initialOptions, ...this.options, ...options, element: this.options.element }

    if (this.apiKey !== this.options.apiKey) {
      if (this.options.fetchDeveloper instanceof Function) {
        this.developer = await this.options.fetchDeveloper(this.options)
      } else {
        this.developer = await fetchDeveloper(this.options.endpoint, this.options.apiKey, !this.developer)
      }
    }

    if (!this.developer) {
      throw new Error('Developer not found')
    }

    let rating = Number(this.developer.review_rating || this.developer.overall_rating || 0)
    rating = rating.toFixed(Math.floor(rating) === rating ? 0 : 1)

    if (rating > 4 && Math.round(rating) === 5) {
      rating = 5
    }

    const buildOpts = {
      rating,
      developer: this.developer.slug,
      dark: !this.options.light,
      reviews: this.developer.review_count
    }

    this.observer.disconnect()

    if (!this.container) {
      this.container = builder(this.options.element, buildOpts)
    } else {
      changeWidget(this.container, buildOpts)
    }

    this.observer.observe(this.options.element)
  }

  destroy () {
    if (!this.options.element || !this.options.element.childNodes.length) {
      return
    }

    this.observer.disconnect()
    this.options.element.removeChild(this.container)
    this.container = null
  }
}

export default DeveloperWidget
