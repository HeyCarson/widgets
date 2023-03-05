const logoImgLight = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg'
const logoImgDark = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg'
const starLight = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-star-light.svg'
const starDark = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-star-dark.svg'

const THEMES_PAGE = 'https://heycarson.com/themes'
const DEVELOPER_PAGE = 'https://heycarson.com/themes/developer/'

export const checkSize = (container, width) => {
  container.classList.toggle('hc-developer-widget--small', width <= 390)
  container.classList.toggle('hc-developer-widget--left', width <= 270)

  const logoContainer = container.querySelector('.hc-developer-widget__logo-container')
  logoContainer.classList.toggle('hc-developer-widget__logo-container--small', width <= 390)
  logoContainer.classList.toggle('hc-developer-widget__logo-container--left', width <= 270)

  const starContainer = container.querySelector('.hc-developer-widget__star-container')
  starContainer.classList.toggle('hc-developer-widget__star-container--small', width <= 270)
  starContainer.classList.toggle('hc-developer-widget__star-container--left', width <= 270)

  const reviewContainer = container.querySelector('.hc-developer-widget__review-container')
  reviewContainer.classList.toggle('hc-developer-widget__review-container--small', width <= 270)
  reviewContainer.classList.toggle('hc-developer-widget__review-container--left', width <= 270)
}

export const changeWidget = (container, { dark, rating, reviews, developer } = {}) => {
  container.classList.toggle('hc-developer-widget--dark', dark)

  container.replaceChild(
    buildLogo({ dark }),
    container.querySelector('.hc-developer-widget__logo-container')
  )

  container.replaceChild(
    buildStar({ rating, dark }),
    container.querySelector('.hc-developer-widget__star-container')
  )

  container.replaceChild(
    buildReviews({
      developer, rating, reviews, dark
    }),
    container.querySelector('.hc-developer-widget__review-container')
  )

}

const buildLogo = ({ dark }) => {
  const logoContainer = document.createElement('a')
  const logo = document.createElement('img')

  logoContainer.setAttribute('href', THEMES_PAGE + '?wgl=1')
  logoContainer.setAttribute('target', '_blank')
  logoContainer.setAttribute('rel', 'noopener')
  logoContainer.classList.add('hc-developer-widget__logo-container')
  logo.classList.add('hc-developer-widget__logo')
  logo.setAttribute('src', !dark ? logoImgDark : logoImgLight)

  logoContainer.appendChild(logo)

  return logoContainer
}

const buildStar = ({ rating, dark }) => {
  const starAmount = Math.floor(rating)
  const starContainer = document.createElement('div')
  const star = document.createElement('img')
  const starBack = document.createElement('div')

  star.classList.add('hc-developer-widget__star')
  star.setAttribute('src', dark ? starDark : starLight)
  starBack.classList.add('hc-developer-widget__star-background')
  starBack.classList.toggle('hc-developer-widget__star-background--dark', dark)

  starContainer.classList.add('hc-developer-widget__star-container')

  starBack.appendChild(star)

  ;(new Array(starAmount).fill(0))
    .forEach(star => starContainer.appendChild(starBack.cloneNode(true)))

  return starContainer
}

const buildReviews = ({ developer, rating, reviews, dark }) => {
  const reviewContainer = document.createElement('div')
  const rate = document.createElement('span')
  const separator = document.createElement('span')
  const review = document.createElement('a')

  reviewContainer.classList.add('hc-developer-widget__review-container')

  rate.classList.add('hc-developer-widget__rating')
  rate.classList.toggle('hc-developer-widget__rating--dark', dark)
  separator.classList.add('hc-developer-widget__separator')
  separator.classList.toggle('hc-developer-widget__separator--dark', dark)
  review.classList.add('hc-developer-widget__review')
  review.classList.toggle('hc-developer-widget__review--dark', dark)

  rate.innerText = rating
  separator.innerText = '|'

  review.innerText = reviews === 1 ? '1 review' : `${reviews} reviews`
  review.setAttribute('href', DEVELOPER_PAGE + developer + '?wgl=1')
  review.setAttribute('target', '_blank')
  review.setAttribute('rel', 'noopener')

  reviewContainer.appendChild(rate)
  reviewContainer.appendChild(separator)
  reviewContainer.appendChild(review)

  return reviewContainer
}

export default function builder (element, options = {}) {
  const container = document.createElement('div')

  container.classList.add('hc-developer-widget')
  container.classList.toggle('hc-developer-widget--dark', options.dark)

  container.appendChild(buildLogo({ dark: options.dark }))
  container.appendChild(buildStar({
    rating: options.rating,
    dark: options.dark
  }))
  container.appendChild(buildReviews({
    rating: options.rating,
    developer: options.developer,
    reviews: options.reviews,
    dark: options.dark
  }))

  element.appendChild(container)

  return container
}
