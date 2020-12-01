function headerStick() {
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  let menu = document.getElementById('header');

  if(scrollTop <= 52 && menu.classList.contains('header-sticky')) {
    menu.classList.remove('header-sticky')
  } else if(scrollTop > 52 && !menu.classList.contains('header-sticky')) {
    menu.classList.add('header-sticky')
  }
}

window.onscroll = function() {
  headerStick();
  if(typeof movePlane !== 'undefined') movePlane();
}

let homeLinks = document.getElementsByClassName('home-link');
for(let i = 0; i < homeLinks.length; i++)
  homeLinks[i].href = window.location.origin;

function goHome() {
  window.location.href = window.location.origin
}

function goAbout() {
  window.location.href = window.location.origin + '/about'
}

function goTravel() {
  window.location.href = window.location.origin + '/travel-tourism'
}

function goConstr() {
  window.location.href = window.location.origin + '/constructions'
}

let homeIcon = document.getElementById('logo');
if(!!homeIcon)
  homeIcon.src = window.location.origin+'/data/shaayaa.jpg';
