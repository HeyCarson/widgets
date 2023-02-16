const logoImgLight = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg'
const logoImgDark = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg'
const starImg = 'https://carson-themes.s3.amazonaws.com/assets/heycarson-star.svg'

const DEVELOPER_PAGE = 'https://heycarson.com/themes/developer/'

const buildLogo = ({ dark }) => {
  const logoContainer = document.createElement('div')
  const logo = document.createElement('img')

  logoContainer.classList.add('hc-developer-widget__logo-container')
  logo.classList.add('hc-developer-widget__logo')
  logo.setAttribute('src', dark ? logoImgDark : logoImgLight)

  logoContainer.appendChild(logo)

  return logoContainer
}

const buildStar = ({ rating, dark }) => {
  const starContainer = document.createElement('div')
  const star = document.createElement('img')
  const rate = document.createElement('span')

  starContainer.classList.add('hc-developer-widget__star-container')
  star.classList.add('hc-developer-widget__star')
  rate.classList.add('hc-developer-widget__rating')
  rate.classList.toggle('hc-developer-widget__rating--dark', dark)

  star.setAttribute('src', starImg)
  rate.innerText = `${rating} / 5`

  starContainer.appendChild(star)
  starContainer.appendChild(rate)

  return starContainer
}

const buildReviews = ({ developer, reviews, dark }) => {
  const reviewContainer = document.createElement('div')
  const based = document.createElement('span')
  const review = document.createElement('a')

  reviewContainer.classList.add('hc-developer-widget__review-container')

  based.classList.add('hc-developer-widget__based')
  based.classList.toggle('hc-developer-widget__based--dark', dark)
  review.classList.add('hc-developer-widget__review')
  review.classList.toggle('hc-developer-widget__review--dark', dark)

  based.innerText = 'Based on'

  review.innerText = `${reviews} reviews`
  review.setAttribute('href', DEVELOPER_PAGE + developer)
  review.setAttribute('target', '_blank')
  review.setAttribute('rel', 'noopener')

  reviewContainer.appendChild(based)
  reviewContainer.appendChild(review)

  return reviewContainer
}

export default function builder (element, options = {}) {
  const container = document.createElement('div')

  container.classList.add('hc-developer-widget')
  container.classList.toggle('hc-developer-widget--dark', options.dark)

  container.appendChild(buildLogo({ dark: options.dark }))
  container.appendChild(buildStar({
    rating: Number(options.developer.review_rating || optionns.developer.overall_rating || 0).toFixed(1),
    dark: options.dark
  }))
  container.appendChild(buildReviews({
    developer: options.developer.slug,
    reviews: options.developer.review_count,
    dark: options.dark
  }))

  element.appendChild(container)
}