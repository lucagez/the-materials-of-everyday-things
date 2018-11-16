function loadCar() {
  const body = document.querySelector('body');
  fetch('views/car.html')
    .then(res => res.text())
    .then(data => {
      const car = document.createElement('div');
      car.classList.add('car', 'horizontalCenter');
      car.innerHTML = data;
      body.querySelector('.container').appendChild(car);
    })
    .then(() => makeScript('src/car.js'));
}

async function loadArticles() {
  return fetch('data/articles.json')
    .then(res => res.json());
}

async function loadDataset() {
  // const path = 'data/temp_data_with_images.json';
  const path = 'data/temp_data.json';
  return fetch(path).then(res => res.json())
}

async function loadSvgWorld() {
  return fetch('media/world.svg')
    .then(res => res.text())
    .then((svgData) => {
      svgWorld = document.createElement('div');
      svgWorld.innerHTML = svgData;
      svgWorld.classList.add('svgWorld');
      return svgWorld;
    });
}

function makeScript(src) {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  head.appendChild(script);
}

function explain(button) {
  button.style = 'border-radius: 5px;';
  button.innerHTML = "<div>Hi 👋, <br>I am the DEEPER button.<br>Click on me to know more.<br>I'll take you deep.<div>";
}

function ask(text, body) {
  const container = newElement('div', 'container', 'askGrid');
  const ask = newElement('blockquote', 'ask');
  ask.innerHTML = text;
  container.appendChild(ask);
  body.appendChild(container);
  scroll();
  carOpacity(['hide']);
}

function intro(data, body, pos, arr) {
  const container = newElement('div', 'container', 'introGrid');
  const article = newElement('div', 'article');
  const content = newElement('p', 'content');
  content.innerHTML = data;
  article.appendChild(content);
  container.appendChild(article);
  body.appendChild(container);
  if (pos) {
    moveCar(pos);
  }
  if (arr) {
    carOpacity(arr);
  }
  scroll();
}

function scroll() {
  window.scrollTo({
    top: body.scrollHeight,
    behavior: 'smooth'
  });
}

function moveCar(pos) {
  const car = document.querySelector('.car');
  car.style = pos;
}

function carOpacity(arr) {
  const macro = document.querySelectorAll('.macro');
  macro.forEach(node => node.classList.remove('carHidden'));
  if (arr.length != 0) {
    if (arr[0] == 'hide') {
      macro.forEach(node => node.classList.add('carHidden'));
    } else {
      for (element of arr) {
        document.querySelector(`.${element}`).classList.add('carHidden');
      }
    }
  }
}

function resetButton(button) {
  button.style = `
    border-radius: 7px;
  `;
  button.innerHTML = 'deeper';
}

function newElement() {
  let element;
  const args = [...arguments];
  for ([index, arg] of args.entries()) {
    // console.log(index, arg)
    if (index == 0) {
      element = document.createElement(`${arg}`);
    } else {
      element.classList.add(arg);
    }
  }
  return element;
}

function makeViz(body, svg) {
  const container = newElement('div', 'container', 'firstViz');
  const label = newElement('p', 'labelViz', 'horizontalCenter');
  label.innerHTML = '⬆<br>click on everything<br>(also on car parts)';
  container.appendChild(svg);
  container.appendChild(label);
  body.appendChild(container);
}

function addListenersToElements(elements) {
  const showEl = newElement('div', 'showElements');
  for (element of elements) {
    const elementContainer = newElement('button', 'elementContainer');
    const el = newElement('h2', 'el');
    const p = newElement('p');
    el.innerText = element[0];
    p.innerText = element[1];
    elementContainer.setAttribute('id', element[0]);
    elementContainer.addEventListener('click', () => {
      showData(elementContainer.id);
    });
    elementContainer.appendChild(el);
    elementContainer.appendChild(p)
    showEl.appendChild(elementContainer);
  }
  document.querySelector('.firstViz').appendChild(showEl);
}

function addListenersToParts() {
  const scene = document.querySelector('.scene');
  const parts = document.querySelectorAll('.macro');
  parts.forEach((part) => {
    part.addEventListener('click', () => {
      makeText(part.id);
    })
  })
}

function makeText(id) {
  const clear = document.querySelector('.textContainer') ? document.querySelector('.textContainer') : null;
  if (clear) {
    document.querySelector('.firstViz').removeChild(clear);
  }
  const text = {
    wheels: '<span class="first-letter">W</span>hat about the wheels? Here you can find that the rim can be made of steel or some alluminium alloy. But we can\'t stop!<br>Here you have only data about metal and non-metal elements but there are a lot of other things in here: tyres (product derived from oil, which is again made of Carbon), breaks (made with glass, rubber and Kevlar).. <br>How many things are made with other things?😱',
    frame: '<span class="first-letter">T</span>he drive shaft needs to be hard enough to transmit every ounce of traction to the wheels but ductile enough not to crack at the first bump.<br>So, along <strong>Fe</strong> you want elements such as:<ul><li><strong>Ni</strong>, ⬆ toughtness at low temperature</li><li><strong>Cr</strong>, ⬆ hardenability ⬆ resistance to corrosion</li><li><strong>S</strong>, ⬆ machinability but ⬇ ductility</li></ul>',
    body: '<span class="first-letter">H</span>ere in the chassis the <strong>Fe</strong> is king. The vast majority of the steel alloys used have a concentration <strong>+96%</strong>.<br>The iron (Fe) alone is very fragile and prone to a fast corrosion, so it needs to be tranformed in steel by adding different percentages of <strong>C</strong> (more carbon ➡ hard steel, less carbon ➡ ductile steel) and helped with other elements to reach the desired qualities. For example:<ul><li><strong>Mn</strong>, ⬆ mechanical strength and ⬇ risk of oxidation</li><li><strong>Cr</strong>, for stainless steel</li><li><strong>Mo</strong>, ⬆ thermal conductivity, ⬆ stiffness</li><li><strong>Si</strong> ⬆ strength by reducing oxigen levels inside steel</li><li><strong>Ti</strong>, ⬆ tensile strength </li></ul>',
    engine: '<span class="first-letter">T</span>he engine lives in a difficult environment. Here the temperatures can easily go over 100°C. As the temperature increase, so does the efficiency. But at high temperature we have a staggering fall of qualities like hardness.<br>So we use Grey cast Iron (<strong>Fe</strong> with high concentration of <strong>C</strong>).<br>In recent years we are shifting to <strong>Al</strong> structures to reduce the overall weight.<br><strong>Al</strong> has very bad mechanical properties, it needs to be helped by other elements such as <strong>Mn</strong>, <strong>Mg</strong>, <strong>Be</strong>, <strong>Ti</strong> or <strong>Ga</strong>',
  }
  const textContainer = newElement('div', 'textContainer');
  const content = newElement('p', 'content');
  if (id == 'body' || id == 'lights') {
    content.innerHTML = text.body;
  } else {
    content.innerHTML = text[`${id}`];
  }
  textContainer.appendChild(content);
  document.querySelector('.firstViz').appendChild(textContainer);
}

function addClassToContainer(cssClass) {
  const ncont = document.querySelectorAll('.container');
  ncont[ncont.length - 1].classList.add(cssClass);
}
