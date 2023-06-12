import BaseWidget from '../base/index.js'

export const DEVELOPER_PAGE = 'https://heycarson.com/themes/developer/'

export const fetchDeveloper = async ({ endpoint, slug, apiKey }) => {
  const params = new URLSearchParams()
  params.set('type', 'developer')
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

      throw new Error('Something went wrong' + (body?.message ? `: ${body.message}` : ''))
    })
}

export const developerURL = slug => {
  return `${DEVELOPER_PAGE}${slug}`
}

class DeveloperWidget extends BaseWidget {
  constructor (options) {
    options = {
      ...options,

      type: 'developer',
      fetcher: fetchDeveloper,
      urlBuilder: developerURL,
    }

    super(options)
  }
}

export default DeveloperWidget
