import BaseWidget from '../base/index.js'

const ENTITY_URL = 'https://heycarson.com/themes/reviews/'

const getTheme = async ({ endpoint, slug, apiKey }) => {
  const params = new URLSearchParams()
  params.set('type', 'theme')
  params.set('slug', slug)

  return await fetch(`${endpoint}/v1/widget?${params.toString()}`, {
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

      throw new Error('Something went wrong' + (body?.message || ''))
    })
}

const urlBuilder = entity => {
  return `${ENTITY_URL}${entity.slug}`
}

class ThemeWidget extends BaseWidget {
  constructor (options) {
    options = {
      ...options,

      type: 'theme',
      fetcher: getTheme,
      urlBuilder
    }

    super(options)
  }
}

export default ThemeWidget
