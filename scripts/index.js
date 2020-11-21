function headerStick() {
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
  let menu = document.getElementById('header');

  if(scrollTop <= 52 && menu.classList.contains('header-sticky')) {
    menu.classList.remove('header-sticky')
  } else if(scrollTop > 52 && !menu.classList.contains('header-sticky')) {
    menu.classList.add('header-sticky')
  }
}

let plane = document.getElementById('plane');
let footer = document.getElementById('footer');

function movePlane() {
  let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

  if(document.body.clientHeight - footer.clientHeight >= scrollTop + window.innerHeight / 2) {
    let accel = Math.pow(1.5, -(Math.round(scrollTop) / 1000)) * 4;

    let planey = scrollTop - window.innerHeight / accel;
    if(0 > planey) planey = 0;

    let planex = Math.sin(scrollTop / 160) * 20;

    plane.style.transform = `translate(${planex}px,${planey}px) rotate(${-planex / 6}deg)`;
  }
}

let homeLinks = document.getElementsByClassName('home-link');
for(let i = 0; i < homeLinks.length; i++)
  homeLinks[i].href = window.location.origin;

window.onscroll = function() {
  headerStick();
  movePlane();
}

window.addEventListener('mousemove', e => {
  let activeImage = document.getElementsByClassName('banner-image-active'),
  banners = document.getElementById('banner');

  if(activeImage.length < 1) return;

  let banoff = banners.getBoundingClientRect()
  let x = banoff.width / 2 - e.clientX,
  y = banoff.height / 2 - e.clientY;

  activeImage[0].style.transform =
    `translate(${x / 50}px,${y / 50}px)`;
})

let bannerInfoTracker = 1;

let bannerInfo = [
  document.getElementById('banner-info-1'),
  document.getElementById('banner-info-2')
];

const bannerInfoText = {
  0: {
    title: 'Some title here',
    desc: 'Some description here'
    //html: '<html script here to add plain html, buttons etc...>'
  },
  1: {
    title: 'Some title here again',
    desc: 'Some description here once again'
  }
};

function buildHTML(data) {
  let html = '';

  if(!!data.title) html += `<h1 class="banner-info-title">${data.title}</h1>`;
  if(!!data.desc) html += `<p class="banner-info-desc">${data.desc}</p>`;
  if(!!data.html) html += data.html;

  return html;
}

function checkBannerInfo(i) {
  if(bannerInfoTracker) {
    bannerInfoTracker = 0;

    bannerInfo[bannerInfoTracker].style.opacity = '1';
    bannerInfo[bannerInfoTracker + 1].style.opacity = '0';

    if(!!bannerInfoText[i]) {
      bannerInfo[bannerInfoTracker].innerHTML = buildHTML(bannerInfoText[i]);
    } else {
      bannerInfo[bannerInfoTracker].innerHTML = ""
    }
  } else {
    bannerInfoTracker = 1;

    bannerInfo[bannerInfoTracker].style.opacity = '1';
    bannerInfo[bannerInfoTracker - 1].style.opacity = '0';

    if(!!bannerInfoText[i]) {
      bannerInfo[bannerInfoTracker].innerHTML = buildHTML(bannerInfoText[i]);
    } else {
      bannerInfo[bannerInfoTracker].innerHTML = ""
    }
  }
}

let bc = document.getElementById('banner-container')

const banners = [
  'https://i.pinimg.com/originals/be/de/fe/bedefedab799f2f2bdf3187eeb02b378.jpg',
  'https://italianrentalblog.files.wordpress.com/2013/12/160056939.jpg'
];

for(let i = 0; i < banners.length; i++) { // load in banners
  let li = document.createElement('li');
  let img = document.createElement('img');

  img.src = banners[i];
  img.name = `banner-${i + 1}`;
  img.classList.add('banner-image');
  if(i === 0) img.classList.add('banner-image-active');

  li.classList.add('banner-box');

  li.style.right = `-1000px`;
  li.style.top = `-500px`;

  li.appendChild(img);

  bc.appendChild(li);

  checkBannerInfo(0);
}

function findIndex(arr, el) {
  let ind = -1;
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].name === el.name)
      ind = i
  };
  return ind;
}

const bannerCycleTimeout = 20000;

let bannerCycle = setInterval(function() {
  changeBanner(1)
}, bannerCycleTimeout)

function changeBanner(d, manual) {
  if(manual) {
    clearInterval(bannerCycle);
    bannerCycle = setInterval(function() {
      changeBanner(1)
    }, bannerCycleTimeout);
  };

  let images = document.getElementsByClassName('banner-image'),
  activeImage = document.getElementsByClassName('banner-image-active');

  let ind = findIndex(images, activeImage[0]) + d;

  if(ind < 0) ind = images.length - 1;
  if(!images[ind]) ind = 0;

  checkBannerInfo(ind);

  activeImage[0].classList.remove('banner-image-active');

  images[ind].classList.add('banner-image-active');
}

document.getElementById('banner').addEventListener('mouseover', () => {
  let img = document.getElementsByClassName('banner-image-active')[0];

  if(!img.classList.contains('banner-image-hover'))
    img.classList.add('banner-image-hover');
})

document.getElementById('banner').addEventListener('mouseout', () => {
  let img = document.getElementsByClassName('banner-image-active')[0];

  if(img.classList.contains('banner-image-hover'))
    img.classList.remove('banner-image-hover');
})

let zoomCloses = document.getElementsByClassName('zoom-close');
for(let i = 0; i < zoomCloses.length; i++)
  zoomCloses[i].addEventListener('mousedown', function() {
    let cont = document.getElementById('zoom-container');

    document.body.classList.remove('disable-scroll');
    cont.classList.add('zoom-container-inactive');
  })

let zoomables = document.getElementsByClassName('info-image');
for(let i = 0; i < zoomables.length; i++)
  zoomables[i].addEventListener('mousedown', function(e) {
    let cont = document.getElementById('zoom-container');
    let img = document.getElementById('zoom-image');

    img.src = e.target.src;
    document.body.classList.add('disable-scroll');
    cont.classList.remove('zoom-container-inactive');
  });
