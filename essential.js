const HEADER = document.createElement('header');
HEADER.innerHTML =
`
<div id="shadow-cover"></div>
<a href="/lego/">LEGO</a>
<a href="/coding/">Coding</a>
<a id="flower" href="/"><img src="/assets/flower.webp" alt="Bright pink flowers against a light-blue background"></a>
<a href="/photos/">Photos</a>
<a href="/design/">Design</a>
`;
const FOOTER = document.createElement('footer');
FOOTER.innerHTML =
`
<a href="/">Home</a>
<a href="/lego/">LEGO</a>
<a href="/coding/">Coding</a>
<a href="/photos/">Photos</a>
<a href="/design/">Design</a>
<div id="copyright">Copyright © <a href="mailto:&#109;&#101;&#64;&#98;&#114;&#101;&#110;&#100;&#97;&#110;&#46;&#101;&#101;">Brendan Ee</a> 2023-2026, All Rights Reserved.</div>
`;
document.querySelector('body').prepend(HEADER);
document.querySelector('body').append(FOOTER);
// If not on main page, shrink header
if (window.scrollY < 1 && location.pathname !== '/' && location.pathname !== '/index.html') {
  // Probably need delay for element adding, idk
  setTimeout(() => {window.scrollBy(0, 80)}, 10);
}
