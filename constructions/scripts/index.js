const imagesRow = [
  'https://shaayacompany.files.wordpress.com/2020/02/83767664_2588795254675208_4283523759366733824_n.jpg?w=875&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83392073_195254298332350_512981960302264320_n.jpg?w=737&h=&zoom=2',
  'https://shaayacompany.files.wordpress.com/2020/02/83406961_609537999859308_7317449792102072320_n.jpg?w=737&h=&zoom=2',
  'https://shaayacompany.files.wordpress.com/2020/02/83416897_1212518462284577_6837983548964601856_n.jpg?w=728&h=&zoom=2',
  'https://shaayacompany.files.wordpress.com/2020/02/83420600_2660288114223870_2821890635567464448_n.jpg?w=728&h=&zoom=2',
  'https://shaayacompany.files.wordpress.com/2020/02/83425304_3075183542620547_2143094036804665344_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83459371_2292397824391013_28793563831599104_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83473568_226243828388650_2246336215852777472_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83484283_481780199063438_7834421618108530688_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83498902_210026513464817_1013713797703008256_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83501663_314860859474621_5599263587219537920_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83566965_192698608480990_8879534495783452672_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83576935_204065144073237_7645244874408591360_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83584181_163297178434595_5636030053461524480_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83598240_231408407865028_9135158167418699776_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83648852_784234058753617_8395164473735774208_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83651374_595963011227468_1593636151913086976_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83656538_613940379382420_4829166691097247744_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83668249_658580321617429_5863213924836442112_n.jpg?w=1250&h=',
  'https://shaayacompany.files.wordpress.com/2020/02/83697101_211790096529397_184752777061203968_n.jpg?w=1250&h='
]

let imageRowCont = document.getElementById('row-img-container');

let ind = 1,
pos = 0;

let li, img;
function generateRowImage(src) {
  img = document.createElement('img');
  li = document.createElement('li');

  img.src = src;
  li.appendChild(img);

  return li;
}

for(let i = 0; i < imagesRow.length; i++) {
  imageRowCont.appendChild(generateRowImage(imagesRow[i]));
}

document.getElementById('right-img-btn').addEventListener('mousedown', function() {
  let li = imageRowCont.children[ind + 1];
  if(!imageRowCont.children[ind + 2]) return;
  let rect = li.getBoundingClientRect();
  imageRowCont.style.transform = `translateX(${pos - rect.width}px)`;
  pos -= rect.width;
  ind++;
  /*last = !imagesRow[last + 1] ? 1 : last + 1;
  imageRowCont.prepend(generateRowImage(imagesRow[last]));
  imageRowCont.removeChild(imageRowCont.children[imageRowCont.children.length - 1]);*/
})

document.getElementById('left-img-btn').addEventListener('mousedown', function() {
  let li = imageRowCont.children[ind - 1];
  if(!imageRowCont.children[ind - 2]) return;
  let rect = li.getBoundingClientRect();
  imageRowCont.style.transform = `translateX(${pos + rect.width}px)`;
  pos += rect.width;
  ind--;
  /*last = last - 1 < 1 ? imagesRow.length - 1 : last - 1;
  imageRowCont.append(generateRowImage(imagesRow[last]));
  imageRowCont.removeChild(imageRowCont.children[0]);*/
})
