import BaseWidget from '../base/index.js'

const ENTITY = 'https://heycarson.com/themes/developer/'

const getDeveloper = async ({ endpoint, slug, apiKey, from }) => {
  const params = new URLSearchParams()
  params.set('type', 'developer')
  params.set('slug', slug)
  params.set('from', from)

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

      throw new Error('Something went wrong' + (body?.message ? `: ${body.message}` : ''))
    })
}

export const urlBuilder = entity => {
  return `${ENTITY}${entity.slug}`
}

export const labelBuilder = entity => {
  return entity.name
}

class DeveloperWidget extends BaseWidget {
  constructor (options) {
    options = {
      ...options,

      type: 'developer',
      fetcher: getDeveloper,
      urlBuilder,
      labelBuilder,
    }

    super(options)
  }
}

export default DeveloperWidget
