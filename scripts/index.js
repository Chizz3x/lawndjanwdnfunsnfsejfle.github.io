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

  if(scrollTop >= 40 && document.body.clientHeight - footer.clientHeight >= scrollTop + window.innerHeight / 2) {
    let middle = scrollTop + window.innerHeight / 2;

    let planey = middle >= 1000 ? scrollTop - window.innerHeight / 2 : scrollTop / 2;
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
    title: 'Some long title here',
    desc: 'Some long long long long a dad description here'
    //html: '<html script here to add plain html, buttons etc...>'
  },
  1: {
    title: 'Some title here again',
    desc: 'Some description here once again d w a w d a d w d a w d w w d w adw dawdawdadawdawd'
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

function magnify(imgID, zoom) {
  let img, glass, w, h, bw;
  img = document.getElementById(imgID);

  glass = document.createElement("div");
  glass.id = 'img-magnifier-glass';

  img.parentElement.insertBefore(glass, img);

  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.opacity = "0";

  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /*mouse*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  img.addEventListener("mouseover", inMagnifier);
  img.addEventListener("mouseout", outMagnifier);
  glass.addEventListener("mouseover", inMagnifier);
  glass.addEventListener("mouseout", outMagnifier);

  function inMagnifier() {
    glass.style.opacity = "1";
  }

  function outMagnifier() {
    glass.style.opacity = "0";
  }

  /*touch screen*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    let pos, x, y;

    e.preventDefault();

    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;

    if (x > img.width - (w / zoom)) {x = img.width - (w / zoom)};
    if (x < w / zoom) {x = w / zoom};
    if (y > img.height - (h / zoom)) {y = img.height - (h / zoom)};
    if (y < h / zoom) {y = h / zoom};

    glass.style.transform = `translate(${x - w}px,${y}px)`;

    glass.style.backgroundPosition = "-" + ((x * zoom) - w * 2 + bw) + "px -"
                                     + ((y * zoom) - h + bw) + "px";
  }

  function getCursorPos(e) {
    let a, x = 0, y = 0;

    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return {x : x, y : y};
  }
}

magnify("map-img", 3)
