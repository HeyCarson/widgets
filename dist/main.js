const $393e6e330497b506$var$logoImgLight = "https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg";
const $393e6e330497b506$var$logoImgDark = "https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg";
const $393e6e330497b506$var$starImg = "https://carson-themes.s3.amazonaws.com/assets/heycarson-star.svg";
const $393e6e330497b506$var$THEMES_PAGE = "https://heycarson.com/themes";
const $393e6e330497b506$var$DEVELOPER_PAGE = "https://heycarson.com/themes/developer/";
const $393e6e330497b506$var$smallBreakpoint = 410;
const $393e6e330497b506$var$containerPadding = 32;
const $393e6e330497b506$export$c4a38de546513c4e = (container, width)=>{
    const isSmall = width <= $393e6e330497b506$var$smallBreakpoint - $393e6e330497b506$var$containerPadding;
    container.classList.toggle("hc-developer-widget--small", isSmall);
    container.querySelector(".hc-developer-widget__logo-container").classList.toggle("hc-developer-widget__logo-container--small", isSmall);
    container.querySelector(".hc-developer-widget__star-container").classList.toggle("hc-developer-widget__star-container--small", isSmall);
    container.querySelector(".hc-developer-widget__review-container").classList.toggle("hc-developer-widget__review-container--small", isSmall);
};
const $393e6e330497b506$export$1d83028bd73dd3cc = (container, { dark: dark , rating: rating , reviews: reviews , developer: developer  } = {})=>{
    container.classList.toggle("hc-developer-widget--dark", dark);
    container.querySelector(".hc-developer-widget__logo").setAttribute("src", dark ? $393e6e330497b506$var$logoImgDark : $393e6e330497b506$var$logoImgLight);
    container.querySelector(".hc-developer-widget__based").classList.toggle("hc-developer-widget__based--dark", dark);
    const ratingEl = container.querySelector(".hc-developer-widget__rating");
    ratingEl.innerText = `${rating} / 5`;
    ratingEl.classList.toggle("hc-developer-widget__rating--dark", dark);
    const reviewEl = container.querySelector(".hc-developer-widget__review");
    reviewEl.innerText = reviews === 1 ? "1 review" : `${reviews} reviews`;
    reviewEl.setAttribute("href", `${$393e6e330497b506$var$DEVELOPER_PAGE}${developer}`);
    reviewEl.classList.toggle("hc-developer-widget__review--dark", dark);
};
const $393e6e330497b506$var$buildLogo = ({ dark: dark  })=>{
    const logoContainer = document.createElement("a");
    const logo = document.createElement("img");
    logoContainer.setAttribute("href", $393e6e330497b506$var$THEMES_PAGE + "?wgl=1");
    logoContainer.setAttribute("target", "_blank");
    logoContainer.setAttribute("rel", "noopener");
    logoContainer.classList.add("hc-developer-widget__logo-container");
    logo.classList.add("hc-developer-widget__logo");
    logo.setAttribute("src", dark ? $393e6e330497b506$var$logoImgDark : $393e6e330497b506$var$logoImgLight);
    logoContainer.appendChild(logo);
    return logoContainer;
};
const $393e6e330497b506$var$buildStar = ({ rating: rating , dark: dark  })=>{
    const starContainer = document.createElement("div");
    const star = document.createElement("img");
    const rate = document.createElement("span");
    starContainer.classList.add("hc-developer-widget__star-container");
    star.classList.add("hc-developer-widget__star");
    rate.classList.add("hc-developer-widget__rating");
    rate.classList.toggle("hc-developer-widget__rating--dark", dark);
    star.setAttribute("src", $393e6e330497b506$var$starImg);
    rate.innerText = `${rating} / 5`;
    starContainer.appendChild(star);
    starContainer.appendChild(rate);
    return starContainer;
};
const $393e6e330497b506$var$buildReviews = ({ developer: developer , reviews: reviews , dark: dark  })=>{
    const reviewContainer = document.createElement("div");
    const based = document.createElement("span");
    const review = document.createElement("a");
    reviewContainer.classList.add("hc-developer-widget__review-container");
    based.classList.add("hc-developer-widget__based");
    based.classList.toggle("hc-developer-widget__based--dark", dark);
    review.classList.add("hc-developer-widget__review");
    review.classList.toggle("hc-developer-widget__review--dark", dark);
    based.innerText = "Based on";
    review.innerText = `${reviews} reviews`;
    review.setAttribute("href", $393e6e330497b506$var$DEVELOPER_PAGE + developer + "?wgl=1");
    review.setAttribute("target", "_blank");
    review.setAttribute("rel", "noopener");
    reviewContainer.appendChild(based);
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
    darkMode: false
};
const $410a0149dfbe17cf$var$fetchDeveloper = async (endpoint, dev, wgp)=>{
    return await fetch(`${endpoint}/v1/themes/developers/${dev}${wgp ? "?wgp=1" : ""}`).then((res)=>{
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
        this.container = null;
        this.viewportHandler = null;
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
        if (this.developer?.slug !== this.options.developer) this.developer = await $410a0149dfbe17cf$var$fetchDeveloper(this.options.endpoint, this.options.developer, !this.developer);
        if (!this.developer) throw new Error("Developer not found");
        let rating = Number(this.developer.review_rating || this.developer.overall_rating || 0);
        rating = rating.toFixed(Math.floor(rating) === rating ? 0 : 1);
        if (!this.container) {
            this.container = (0, $393e6e330497b506$export$2e2bcd8739ae039)(this.options.element, {
                rating: rating,
                developer: this.developer.slug,
                dark: this.options.darkMode,
                reviews: this.developer.review_count
            });
            this.observer.observe(this.container);
        } else (0, $393e6e330497b506$export$1d83028bd73dd3cc)(this.container, {
            rating: rating,
            developer: this.developer.slug,
            dark: this.options.darkMode,
            reviews: this.developer.review_count
        });
    }
    destroy() {
        if (!this.options.element || !this.options.element.childNodes.length) return;
        this.observer.disconnect();
        this.container.removeEventListener("resize", this.viewportHandler);
        this.options.element.removeChild(this.container);
    }
}
var $410a0149dfbe17cf$export$2e2bcd8739ae039 = $410a0149dfbe17cf$var$DeveloperWidget;




export {$410a0149dfbe17cf$export$2e2bcd8739ae039 as DeveloperWidget};
//# sourceMappingURL=main.js.map
