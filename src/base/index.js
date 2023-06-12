import builder, { changeWidget, checkSize } from './builder.js'

const initialOptions = {
  endpoint: 'https://referral-api.heycarson.com',
  element: null,
  apiKey: null,

  type: '', // developer, theme or app
  ratingFrom: '', // developer only

  slug: '',
  light: true,

  debug: false,

  fetcher: null,
  urlBuilder: null,
}

class BaseWidget {
  constructor (options = {}) {
    this.options = { ...initialOptions, ...options }

    this.entity = null
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
      this.entity = await this.options.fetcher({
        slug: this.options.slug,
        endpoint: this.options.endpoint,
        apiKey: this.options.apiKey,
        from: this.options.ratingFrom,
      })
    }

    if (!this.entity) {
      throw new Error('Entity not found')
    }

    let rating = Number(this.entity.review_rating || 0)
    rating = rating.toFixed(Math.floor(rating) === rating ? 0 : 1)
    let stars = Math.floor(rating)

    if (rating > 4 && Math.round(rating) === 5) {
      stars = 5
    }

    const buildOpts = {
      rating,
      stars,
      slug: this.entity.slug,
      dark: !this.options.light,
      reviews: this.entity.review_count,
      url: this.options.urlBuilder && this.options.urlBuilder(this.entity.slug),
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

export default BaseWidget
