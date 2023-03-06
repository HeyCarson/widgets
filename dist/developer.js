const e=(e,t)=>{e.classList.toggle("hc-developer-widget--small",t<=390),e.classList.toggle("hc-developer-widget--left",t<=300);const r=e.querySelector(".hc-developer-widget__logo-container");r.classList.toggle("hc-developer-widget__logo-container--small",t<=390),r.classList.toggle("hc-developer-widget__logo-container--left",t<=300);const s=e.querySelector(".hc-developer-widget__star-container");s.classList.toggle("hc-developer-widget__star-container--small",t<=300),s.classList.toggle("hc-developer-widget__star-container--left",t<=300);const o=e.querySelector(".hc-developer-widget__review-container");o.classList.toggle("hc-developer-widget__review-container--small",t<=300),o.classList.toggle("hc-developer-widget__review-container--left",t<=300)},t=(e,{dark:t,rating:i,reviews:n,developer:a}={})=>{e.classList.toggle("hc-developer-widget--dark",t),e.replaceChild(r({dark:t}),e.querySelector(".hc-developer-widget__logo-container")),e.replaceChild(s({rating:i,dark:t}),e.querySelector(".hc-developer-widget__star-container")),e.replaceChild(o({developer:a,rating:i,reviews:n,dark:t}),e.querySelector(".hc-developer-widget__review-container"))},r=({dark:e})=>{const t=document.createElement("a"),r=document.createElement("img");return t.setAttribute("href","https://heycarson.com/themes?wgl=1"),t.setAttribute("target","_blank"),t.setAttribute("rel","noopener"),t.classList.add("hc-developer-widget__logo-container"),r.classList.add("hc-developer-widget__logo"),r.setAttribute("src",e?"https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-light.svg":"https://carson-themes.s3.amazonaws.com/assets/heycarson-logo-dark.svg"),t.appendChild(r),t},s=({rating:e,dark:t})=>{const r=Math.floor(e),s=document.createElement("div"),o=document.createElement("img"),i=document.createElement("div");return o.classList.add("hc-developer-widget__star"),o.setAttribute("src",t?"https://carson-themes.s3.amazonaws.com/assets/heycarson-star-dark.svg":"https://carson-themes.s3.amazonaws.com/assets/heycarson-star-light.svg"),i.classList.add("hc-developer-widget__star-background"),i.classList.toggle("hc-developer-widget__star-background--dark",t),s.classList.add("hc-developer-widget__star-container"),i.appendChild(o),new Array(r).fill(0).forEach((e=>s.appendChild(i.cloneNode(!0)))),s},o=({developer:e,rating:t,reviews:r,dark:s})=>{const o=document.createElement("div"),i=document.createElement("span"),n=document.createElement("span"),a=document.createElement("a");return o.classList.add("hc-developer-widget__review-container"),i.classList.add("hc-developer-widget__rating"),i.classList.toggle("hc-developer-widget__rating--dark",s),n.classList.add("hc-developer-widget__separator"),n.classList.toggle("hc-developer-widget__separator--dark",s),a.classList.add("hc-developer-widget__review"),a.classList.toggle("hc-developer-widget__review--dark",s),i.innerText=t,n.innerText="|",a.innerText=1===r?"1 review":`${r} reviews`,a.setAttribute("href","https://heycarson.com/themes/developer/"+e+"?wgl=1"),a.setAttribute("target","_blank"),a.setAttribute("rel","noopener"),o.appendChild(i),o.appendChild(n),o.appendChild(a),o};function i(e,t={}){const i=document.createElement("div");return i.classList.add("hc-developer-widget"),i.classList.toggle("hc-developer-widget--dark",t.dark),i.appendChild(r({dark:t.dark})),i.appendChild(s({rating:t.rating,dark:t.dark})),i.appendChild(o({rating:t.rating,developer:t.developer,reviews:t.reviews,dark:t.dark})),e.appendChild(i),i}const n={endpoint:"https://api.heycarson.com",element:null,apiKey:null,developer:"",light:!0,debug:!1,fetchDeveloper:null};var a=class{constructor(t={}){this.options={...n,...t},this.developer=null,this.apiKey=null,this.container=null,this.observerTimeout=null,this.observer=new ResizeObserver((t=>{if(clearTimeout(this.observerTimeout),!t.length)return;const{width:r}=t[0].contentRect;this.observerTimeout=setTimeout((()=>{e(this.container,r)}),100)}))}async render(e={}){if(!(this.options.element instanceof Element))throw new Error("options.element: HTMLElement is required");if(this.options={...n,...this.options,...e,element:this.options.element},this.apiKey!==this.options.apiKey&&(this.options.fetchDeveloper instanceof Function?this.developer=await this.options.fetchDeveloper(this.options):this.developer=await(async(e,t)=>await fetch(`${e}/v1/themes/developers-widget?hc_api_key=${encodeURIComponent(t)}`).then((e=>{if(e.ok)return e.json();if(404===e.status)return null;const t=e.json();throw new Error("Something went wrong"+(t?.message?`: ${t.message}`:""))})))(this.options.endpoint,this.options.apiKey,this.developer)),!this.developer)throw new Error("Developer not found");let r=Number(this.developer.review_rating||this.developer.overall_rating||0);r=r.toFixed(1),this.observer.disconnect(),this.container?t(this.container,{rating:r,developer:this.developer.slug,dark:!this.options.light,reviews:this.developer.review_count}):this.container=i(this.options.element,{rating:r,developer:this.developer.slug,dark:!this.options.light,reviews:this.developer.review_count}),this.observer.observe(this.options.element)}destroy(){this.options.element&&this.options.element.childNodes.length&&(this.observer.disconnect(),this.options.element.removeChild(this.container),this.container=null)}};export{a as default};
//# sourceMappingURL=developer.js.map
