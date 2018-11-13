let articles;

function main() {
  loadCar();
  loadArticles();
  actions();
}

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
    .then(() => {
      const head = document.getElementsByTagName('head')[0];
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'src/car.js';
      head.appendChild(script);
    });
}

function loadArticles() {
  fetch('data/articles.json')
    .then(res => res.json())
    .then(data => articles = data);
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
  if (arr[0] == 'hide') {
    macro.forEach(node => node.classList.add('carHidden'));
  } else {
    for (element of arr) {
      document.querySelector(`.${element}`).classList.add('carHidden');
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
    console.log(index, arg)
    if (index == 0) {
      element = document.createElement(`${arg}`);
    } else {
      element.classList.add(arg);
    }
  }
  return element;
}

function actions() {
  const body = document.querySelector('body');
  const button = document.querySelector('#deeper');

  const actions = {
    0: () => explain(button),
    1: () => {
      resetButton(button);
      intro(articles.intro1, body, 'top: 0;', ['carframe', 'carbody', 'carwheels']);
    },
    2: () => intro(articles.intro2, body, 'top: 0;', ['carbody', 'carframe']),
    3: () => ask('How deeply connected are we? 🦋', body),
    4: () => intro(articles.intro3, body, 'top: 0;', ['carbody']),
    5: () => intro(articles.intro4, body, 'top: 0;', []),
    6: () => ask('How deeply connected are we? 🦋', body)
  }
  let counter = 0;
  button.addEventListener('click', () => {
    if (actions[counter]) {
      actions[counter]();
      counter++;
      return;
    }
  }, false);
}

main();