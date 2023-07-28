import BaseWidget from '../base/index.js'

const ENTITY_URL = 'https://heycarson.com/apps/reviews/'

const getApp = async ({ endpoint, slug, apiKey }) => {
  const params = new URLSearchParams()
  params.set('type', 'app')
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
  return `${ENTITY_URL}${entity.slug}?wgl=1`
}

class AppWidget extends BaseWidget {
  constructor (options) {
    options = {
      ...options,

      type: 'app',
      fetcher: getApp,
      urlBuilder
    }

    super(options)
  }
}

export default AppWidget
