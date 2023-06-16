const logoImgLight = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg'
const logoImgDark = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg'
const starLight = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-star-light.svg'
const starDark = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-star-dark.svg'

const THEMES_PAGE = 'https://heycarson.com/themes'

const maxSmallWidth = 500
const maxLeftWidth = 350

export const checkSize = (container, width) => {
  container.classList.toggle('hc-base-widget--small', width <= maxSmallWidth)
  container.classList.toggle('hc-base-widget--left', width <= maxLeftWidth)

  const logoContainer = container.querySelector('.hc-base-widget__logo-container')
  logoContainer.classList.toggle('hc-base-widget__logo-container--small', width <= maxSmallWidth)
  logoContainer.classList.toggle('hc-base-widget__logo-container--left', width <= maxLeftWidth)

  const starContainer = container.querySelector('.hc-base-widget__star-container')
  starContainer.classList.toggle('hc-base-widget__star-container--small', width <= maxLeftWidth)
  starContainer.classList.toggle('hc-base-widget__star-container--left', width <= maxLeftWidth)

  const reviewContainer = container.querySelector('.hc-base-widget__review-container')
  reviewContainer.classList.toggle('hc-base-widget__review-container--small', width <= maxLeftWidth)
  reviewContainer.classList.toggle('hc-base-widget__review-container--left', width <= maxLeftWidth)
}

export const changeWidget = (container, { dark, stars, rating, reviews, url } = {}) => {
  container.classList.toggle('hc-base-widget--dark', dark)

  container.replaceChild(
    buildLogo({ dark }),
    container.querySelector('.hc-base-widget__logo-container')
  )

  container.replaceChild(
    buildStar({ stars, dark }),
    container.querySelector('.hc-base-widget__star-container')
  )

  container.replaceChild(
    buildReviews({
      rating, reviews, dark, url
    }),
    container.querySelector('.hc-base-widget__review-container')
  )
}

const buildLogo = ({ dark }) => {
  const logoContainer = document.createElement('a')
  const logo = document.createElement('img')

  logoContainer.setAttribute('href', THEMES_PAGE + '?wgl=1')
  logoContainer.setAttribute('target', '_blank')
  logoContainer.setAttribute('rel', 'noopener')
  logoContainer.classList.add('hc-base-widget__logo-container')
  logo.classList.add('hc-base-widget__logo')
  logo.setAttribute('src', !dark ? logoImgDark : logoImgLight)

  logoContainer.appendChild(logo)

  return logoContainer
}

const buildStar = ({ stars, dark }) => {
  const starAmount = Math.floor(stars)
  const starContainer = document.createElement('div')
  const star = document.createElement('img')
  const starBack = document.createElement('div')

  star.classList.add('hc-base-widget__star')
  star.setAttribute('src', dark ? starDark : starLight)
  starBack.classList.add('hc-base-widget__star-background')
  starBack.classList.toggle('hc-base-widget__star-background--dark', dark)

  starContainer.classList.add('hc-base-widget__star-container')

  starBack.appendChild(star)

  ;(new Array(starAmount).fill(0))
    .forEach(star => starContainer.appendChild(starBack.cloneNode(true)))

  return starContainer
}

const buildReviews = ({ url, rating, reviews, dark }) => {
  const reviewContainer = document.createElement('div')
  const rate = document.createElement('span')
  const separator = document.createElement('span')
  const review = document.createElement('a')

  reviewContainer.classList.add('hc-base-widget__review-container')

  rate.classList.add('hc-base-widget__rating')
  rate.classList.toggle('hc-base-widget__rating--dark', dark)
  separator.classList.add('hc-base-widget__separator')
  separator.classList.toggle('hc-base-widget__separator--dark', dark)
  review.classList.add('hc-base-widget__review')
  review.classList.toggle('hc-base-widget__review--dark', dark)

  rate.innerText = rating
  separator.innerText = '|'

  review.innerText = reviews === 1 ? '1 review' : `${reviews} reviews`
  review.setAttribute('href', url)
  review.setAttribute('target', '_blank')
  review.setAttribute('rel', 'noopener')

  reviewContainer.appendChild(rate)
  reviewContainer.appendChild(separator)
  reviewContainer.appendChild(review)

  return reviewContainer
}

export default function builder (element, options = {}) {
  const container = document.createElement('div')

  container.classList.add('hc-base-widget')
  container.classList.toggle('hc-base-widget--dark', options.dark)

  container.appendChild(buildLogo({ dark: options.dark }))
  container.appendChild(buildStar({
    stars: options.stars,
    dark: options.dark
  }))
  container.appendChild(buildReviews({
    rating: options.rating,
    url: options.url,
    reviews: options.reviews,
    dark: options.dark
  }))

  element.appendChild(container)

  return container
}
