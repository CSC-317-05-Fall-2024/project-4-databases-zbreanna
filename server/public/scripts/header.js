/* This file should contain any DOM manipulation
needed to populate the header, nav, and footer elements
*/

const header = document.createElement('header');
const img = document.createElement('img');
img.src="images/belmont_station.jpg" ;
img.style.width="100%"

const headerText = document.createElement('div');
headerText.className = 'header-text';

const h1 = document.createElement('h1');
h1.textContent = 'Belmont';
headerText.appendChild(h1);
header.appendChild(img);
header.appendChild(headerText);
console.log('Header content populated');

// Populate the navigation content
const navElement = document.querySelector('nav');
navElement.innerHTML = `
    <a href="index.html">Home</a>
    <a href="attractions.html">Attractions</a>
    <a href="restaurants">Restaurants</a>
    <a href="new-restaurant-form.html">New Restaurant</a>
`;

// Populate the footer content
const footerElement = document.querySelector('footer');
footerElement.innerHTML = `
    <span id="contact">@Belmont 2024</span>
`;
