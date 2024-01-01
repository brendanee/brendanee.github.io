let headerNode = document.createElement('header');
headerNode.innerHTML =
`
	<a href="#">Lego</a>
	<a href="#">Code</a>
	<a id="logo" href="https://brendan.ee"><img src="./assets/logo.webp" alt="Bright pink flowers against a light-blue background"></a>
	<a href="#">Photos</a>
	<a href="#">About</a>
`;
let footerNode = document.createElement('footer');
footerNode.innerHTML =
`
<a href="https://brendan.ee">Home</a>
<a href="#">Lego</a>
<a href="#">Code</a>
<a href="#">Photos</a>
<a href="#">About</a>
<div>View source code on <a href="https://github.com/brendanee/brendanee.github.io" target="_blank">Github</a></div>
<div id="copyright">Copyright © <a href="mailto:&#109;&#101;&#64;&#98;&#114;&#101;&#110;&#100;&#97;&#110;&#46;&#101;&#101;">Brendan Ee</a> 2023-2024, All Rights Reserved.</div>
<link rel="stylesheet" href="./essential.css"></link>
`;
document.querySelector('body').prepend(headerNode);
document.querySelector('body').append(footerNode);