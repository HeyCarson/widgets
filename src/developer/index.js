import BaseWidget from '../base/index.js'

const THEME_ENTITY = 'https://heycarson.com/themes/developer/'
const APP_ENTITY = 'https://heycarson.com/apps/developer/'

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

export const urlBuilder = (entity, {ratingFrom: from} = {}) => {
  if (from === 'themes') {
    return `${THEME_ENTITY}${entity.slug}?wgl=1`
  } else if (from === 'apps') {
    return `${APP_ENTITY}${entity.slug}?wgl=1`
  }

  return ''
}

class DeveloperWidget extends BaseWidget {
  constructor (options) {
    options = {
      ...options,

      type: 'developer',
      fetcher: getDeveloper,
      urlBuilder
    }

    super(options)
  }
}

export default DeveloperWidget
