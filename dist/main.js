const $393e6e330497b506$var$logoImgLight = "https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg";
const $393e6e330497b506$var$logoImgDark = "https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg";
const $393e6e330497b506$var$starLight = "https://carson-themes.s3.amazonaws.com/assets/heycarson-star-light.svg";
const $393e6e330497b506$var$starDark = "https://carson-themes.s3.amazonaws.com/assets/heycarson-star-dark.svg";
const $393e6e330497b506$var$THEMES_PAGE = "https://heycarson.com/themes";
const $393e6e330497b506$var$DEVELOPER_PAGE = "https://heycarson.com/themes/developer/";
const $393e6e330497b506$export$c4a38de546513c4e = (container, width)=>{
    container.classList.toggle("hc-developer-widget--small", width <= 390);
    container.classList.toggle("hc-developer-widget--left", width <= 300);
    const logoContainer = container.querySelector(".hc-developer-widget__logo-container");
    logoContainer.classList.toggle("hc-developer-widget__logo-container--small", width <= 390);
    logoContainer.classList.toggle("hc-developer-widget__logo-container--left", width <= 300);
    const starContainer = container.querySelector(".hc-developer-widget__star-container");
    starContainer.classList.toggle("hc-developer-widget__star-container--small", width <= 300);
    starContainer.classList.toggle("hc-developer-widget__star-container--left", width <= 300);
    const reviewContainer = container.querySelector(".hc-developer-widget__review-container");
    reviewContainer.classList.toggle("hc-developer-widget__review-container--small", width <= 300);
    reviewContainer.classList.toggle("hc-developer-widget__review-container--left", width <= 300);
};
const $393e6e330497b506$export$1d83028bd73dd3cc = (container, { dark: dark , rating: rating , reviews: reviews , developer: developer  } = {})=>{
    container.classList.toggle("hc-developer-widget--dark", dark);
    container.replaceChild($393e6e330497b506$var$buildLogo({
        dark: dark
    }), container.querySelector(".hc-developer-widget__logo-container"));
    container.replaceChild($393e6e330497b506$var$buildStar({
        rating: rating,
        dark: dark
    }), container.querySelector(".hc-developer-widget__star-container"));
    container.replaceChild($393e6e330497b506$var$buildReviews({
        developer: developer,
        rating: rating,
        reviews: reviews,
        dark: dark
    }), container.querySelector(".hc-developer-widget__review-container"));
};
const $393e6e330497b506$var$buildLogo = ({ dark: dark  })=>{
    const logoContainer = document.createElement("a");
    const logo = document.createElement("img");
    logoContainer.setAttribute("href", $393e6e330497b506$var$THEMES_PAGE + "?wgl=1");
    logoContainer.setAttribute("target", "_blank");
    logoContainer.setAttribute("rel", "noopener");
    logoContainer.classList.add("hc-developer-widget__logo-container");
    logo.classList.add("hc-developer-widget__logo");
    logo.setAttribute("src", !dark ? $393e6e330497b506$var$logoImgDark : $393e6e330497b506$var$logoImgLight);
    logoContainer.appendChild(logo);
    return logoContainer;
};
const $393e6e330497b506$var$buildStar = ({ rating: rating , dark: dark  })=>{
    const starAmount = Math.floor(rating);
    const starContainer = document.createElement("div");
    const star = document.createElement("img");
    const starBack = document.createElement("div");
    star.classList.add("hc-developer-widget__star");
    star.setAttribute("src", dark ? $393e6e330497b506$var$starDark : $393e6e330497b506$var$starLight);
    starBack.classList.add("hc-developer-widget__star-background");
    starBack.classList.toggle("hc-developer-widget__star-background--dark", dark);
    starContainer.classList.add("hc-developer-widget__star-container");
    starBack.appendChild(star);
    new Array(starAmount).fill(0).forEach((star)=>starContainer.appendChild(starBack.cloneNode(true)));
    return starContainer;
};
const $393e6e330497b506$var$buildReviews = ({ developer: developer , rating: rating , reviews: reviews , dark: dark  })=>{
    const reviewContainer = document.createElement("div");
    const rate = document.createElement("span");
    const separator = document.createElement("span");
    const review = document.createElement("a");
    reviewContainer.classList.add("hc-developer-widget__review-container");
    rate.classList.add("hc-developer-widget__rating");
    rate.classList.toggle("hc-developer-widget__rating--dark", dark);
    separator.classList.add("hc-developer-widget__separator");
    separator.classList.toggle("hc-developer-widget__separator--dark", dark);
    review.classList.add("hc-developer-widget__review");
    review.classList.toggle("hc-developer-widget__review--dark", dark);
    rate.innerText = rating;
    separator.innerText = "|";
    review.innerText = reviews === 1 ? "1 review" : `${reviews} reviews`;
    review.setAttribute("href", $393e6e330497b506$var$DEVELOPER_PAGE + developer + "?wgl=1");
    review.setAttribute("target", "_blank");
    review.setAttribute("rel", "noopener");
    reviewContainer.appendChild(rate);
    reviewContainer.appendChild(separator);
    reviewContainer.appendChild(review);
    return reviewContainer;
};
function $393e6e330497b506$export$2e2bcd8739ae039(element, options = {}) {
    const container = document.createElement("div");
    container.classList.add("hc-developer-widget");
    container.classList.toggle("hc-developer-widget--dark", options.dark);
    container.appendChild($393e6e330497b506$var$buildLogo({
        dark: options.dark
    }));
    container.appendChild($393e6e330497b506$var$buildStar({
        rating: options.rating,
        dark: options.dark
    }));
    container.appendChild($393e6e330497b506$var$buildReviews({
        rating: options.rating,
        developer: options.developer,
        reviews: options.reviews,
        dark: options.dark
    }));
    element.appendChild(container);
    return container;
}


const $410a0149dfbe17cf$var$initialOptions = {
    endpoint: "https://api.heycarson.com",
    element: null,
    apiKey: null,
    developer: "",
    light: true,
    debug: false,
    fetchDeveloper: null
};
const $410a0149dfbe17cf$var$fetchDeveloper = async (endpoint, apiKey)=>{
    return await fetch(`${endpoint}/v1/themes/developers-widget?hc_api_key=${apiKey}`).then((res)=>{
        if (res.ok) return res.json();
        if (res.status === 404) return null;
        const body = res.json();
        throw new Error("Something went wrong" + (body?.message ? `: ${body.message}` : ""));
    });
};
class $410a0149dfbe17cf$var$DeveloperWidget {
    constructor(options = {}){
        this.options = {
            ...$410a0149dfbe17cf$var$initialOptions,
            ...options
        };
        this.developer = null;
        this.apiKey = null;
        this.container = null;
        this.observerTimeout = null;
        this.observer = new ResizeObserver((entries)=>{
            clearTimeout(this.observerTimeout);
            if (!entries.length) return;
            const { width: width  } = entries[0].contentRect;
            this.observerTimeout = setTimeout(()=>{
                (0, $393e6e330497b506$export$c4a38de546513c4e)(this.container, width);
            }, 100);
        });
    }
    async render(options = {}) {
        if (!(this.options.element instanceof Element)) throw new Error("options.element: HTMLElement is required");
        this.options = {
            ...$410a0149dfbe17cf$var$initialOptions,
            ...this.options,
            ...options,
            element: this.options.element
        };
        if (this.apiKey !== this.options.apiKey) {
            if (this.options.fetchDeveloper instanceof Function) this.developer = await this.options.fetchDeveloper(this.options);
            else this.developer = await $410a0149dfbe17cf$var$fetchDeveloper(this.options.endpoint, this.options.apiKey, !this.developer);
        }
        if (!this.developer) throw new Error("Developer not found");
        let rating = Number(this.developer.review_rating || this.developer.overall_rating || 0);
        rating = rating.toFixed(1) // Math.floor(rating) === rating ? 0 : 1
        ;
        this.observer.disconnect();
        if (!this.container) this.container = (0, $393e6e330497b506$export$2e2bcd8739ae039)(this.options.element, {
            rating: rating,
            developer: this.developer.slug,
            dark: !this.options.light,
            reviews: this.developer.review_count
        });
        else (0, $393e6e330497b506$export$1d83028bd73dd3cc)(this.container, {
            rating: rating,
            developer: this.developer.slug,
            dark: !this.options.light,
            reviews: this.developer.review_count
        });
        this.observer.observe(this.options.element);
    }
    destroy() {
        if (!this.options.element || !this.options.element.childNodes.length) return;
        this.observer.disconnect();
        this.options.element.removeChild(this.container);
        this.container = null;
    }
}
var $410a0149dfbe17cf$export$2e2bcd8739ae039 = $410a0149dfbe17cf$var$DeveloperWidget;




export {$410a0149dfbe17cf$export$2e2bcd8739ae039 as DeveloperWidget};
//# sourceMappingURL=main.js.map
