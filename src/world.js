let svgWorld;
let coordsDATA;
let elementDATA;
let currentInterval;

// temporary
const element = {
  position: [600, 750],
}
let balls = [];
let borders = [];
let images = [];
let explosion = [];
let particles = [];
let lol = [];

function preload() {
  fetch('../media/world.svg')
    .then(res => res.text())
    .then((svgData) => {
      svgWorld = document.createElement('div');
      svgWorld.innerHTML = svgData;
      svgWorld.classList.add('svgWorld');
      document.querySelector('#World').appendChild(svgWorld);
      return svgWorld;
    })
    .then(el => getCoords(el))
    .then((coords) => {
      coordsDATA = coords;
      console.log(coordsDATA);
    })
    .catch(err => console.error(err));

  fetch('../data/temp_data_with_images.json')
    .then(res => res.json())
    .then((data) => {
      elementDATA = data;
      console.log(data);
      // const buttons = [];
      Object.keys(data).forEach((element, index) => {
        const button = document.createElement('button');
        button.id = element;
        button.key = index;
        button.innerHTML = `
          <h1>${element}</h1>
          <p>${elementDATA[element].name}</p>
        `;
        document.querySelector('.buttons').appendChild(button);
      })
    })
    .then(() => {
      document.querySelectorAll('button').forEach((e) => {
        e.addEventListener('click', () => start(e.id));
      });
    })
}

function getCoords(el) {
  const countries = el.querySelectorAll('path');
  const coords = {};
  for (country of countries) {
    const id = country.id;
    const name = country.getAttribute('title');
    const position = country.getBoundingClientRect();;
    coords[`${id}`] = {};
    coords[`${id}`].name = name;
    coords[`${id}`].position = position;
  }
  return coords;
}

function Material(country, element) {
  this.quantity = random(5, 10);
  this.to = element.position;
  this.randALFA = random() * PI * 2;
  this.x = Math.cos(this.randALFA) * random(country.position.height) * 0.2;
  this.y = Math.sin(this.randALFA) * random(country.position.height) * 0.2;
  this.randX = this.x + (country.position.left + (country.position.width / 2));
  this.randY = this.y + (country.position.top + (country.position.height / 2));
  this.position = [this.randX, this.randY];
  this.move = () => {
    this.position[0] = lerp(this.position[0], this.to[0], 0.05);
    this.position[1] = lerp(this.position[1], this.to[1], 0.05);
  }
  this.show = () => {
    fill(204, 101, 192, 255);
    strokeWeight(0);
    ellipse(this.position[0], this.position[1], this.quantity, this.quantity);
  }
}

function Border(country) {
  this.left = country.position.left;
  this.top = country.position.top;
  this.updatedLeft = this.left;
  this.updatedTop = this.top;
  this.update = () => {
    this.updatedLeft = this.left;
    this.updatedTop = this.top;
    this.updatedLeft = this.left + (Math.round(Math.random()) * 2 - 1) * random(1.5);
    this.updatedTop = this.top + (Math.round(Math.random()) * 2 - 1) * random(1.5);
  }
  this.show = () => {
    noFill();
    strokeWeight(random(1) + 0.5);
    rect(this.updatedLeft, this.updatedTop, country.position.width, country.position.height);
    fill(50);
    textSize(16);
    text(`${country.name}`, this.left, this.top - 5);
  }
}

// ! EXPLOSION

function Explosion(e) {
  this.x = e.position[0];
  this.y = e.position[1];
  this.toX = (Math.round(Math.random()) * 2 - 1) * random(4000);
  this.toY = (Math.round(Math.random()) * 2 - 1) * random(4000);
  this.show = () => {
    const rand = random(5);
    fill(204, 101, 192, 255);
    strokeWeight(0);
    ellipse(this.x, this.y, rand, rand);
  }
  this.move = () => {
    this.x = lerp(this.x, this.toX, 0.35);
    this.y = lerp(this.y, this.toY, 0.35);
  }
}

function makeExplosion() {
  for (let i = 0; i < 1000; ++i) {
    const temp = new Explosion(element);
    explosion.push(temp);
  }
}

//! END OF

function createMaterial(country, delay, intensity) {
  const norm = (226 - 215) * (intensity - 1) + 226;
  document.querySelector(`#${country}`).style = `
  fill: rgba(${norm}, ${200 * (1 - intensity)}, ${200 * (1 - intensity)}, 1);
  `;
  let tempBorder = new Border(coordsDATA[country]);
  borders.push(tempBorder);

  let intervalID = setInterval(() => materialInterval(country), delay);
  currentInterval = intervalID;
}

function materialInterval(country) {
  let temp = new Material(coordsDATA[country], element);
  balls.push(temp);
}

function removeMaterial() {
  console.log(currentInterval);
  for (let i = 0; i <= currentInterval; ++i) {
    clearInterval(i);
  }
  document.querySelectorAll('path').forEach((e) => {
    e.style = `
      fill: rgba(226, 188, 188, 0.5);
    `;
  });
  borders.length = 0;
  balls.length = 0;
}

function setup() {
  const canvas = createCanvas(window.innerWidth, 800);
  const gravity = createVector(0, 0.5);
  const wind = createVector(0.69, 0);
  canvas.parent('World');
}

function draw() {
  if (coordsDATA) {
    clear();
    for (ball of balls) {
      ball.show();
      ball.move();
    }
    for (border of borders) {
      border.show();
      border.update();
    }
  }
}

function start(id) {
  const sheet = (elementDATA[id].sheet) ? elementDATA[id].sheet : undefined;
  if (sheet) {
    sheet.forEach((e) => {
      const intensity = e[1] / sheet[sheet.length - 1][1];
      removeMaterial();
      setTimeout(() => {
        createMaterial(`${e[0]}`, (100 / intensity), intensity);
        loadImages(id);
        renderImages();
      }, 10);
    })
  }
}

function loadImages(id) {
  images = [];
  images = (elementDATA[id].use) ? elementDATA[id].use : [];
}

function renderImages() {
  const image_container = document.querySelector('.images');
  image_container.innerHTML = '';
  for ([index, group] of images.entries()) {
    const alt = document.createElement('p');
    alt.innerText = group.alt;
    // alt.style = `animation-delay: 0.${index}s;`;
    image_container.appendChild(alt);
    for (image of group.images) {
      const dom_img = document.createElement('img');
      dom_img.src = image;
      // dom_img.style = `animation-delay: 0.${index}s;`;
      image_container.appendChild(dom_img);
    }
  }
}



// ######################################################

class Particle {

  constructor(x, y, r) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-5, 5), random(-5, 5));
    this.acc = createVector(0, 0);
    this.r = r ? r : 48;
    this.halfr = r / 2;
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0, 0);
  }

  display() {
    noStroke();
    fill(0);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }

  edges() {
    if (this.pos.y > (height - this.halfr)) {
      this.vel.y *= -1;
      this.pos.y = (height - this.halfr);
    }

    if (this.pos.y < 0 + this.halfr) {
      this.vel.y *= -1;
      this.pos.y = 0 + this.halfr;
    }

    if (this.pos.x > (width - this.halfr)) {
      this.vel.x *= -1;
      this.pos.x = (width - this.halfr);
    }

    if (this.pos.x < this.halfr) {
      this.vel.x /= -1;
      this.pos.x = this.halfr;
    }
  }

}

function createParticles() {
  particles = [];
  for (let i = 0; i < 10; ++i) {
    delayedPush(i);
  }
}

function Ball(x, y) {
  this.x = random(x);
  this.y = random(y);
  this.random = rando(50);
  this.update = () => {
    this.x += 0.1;
    this.y += 0.1;
  }
  this.display = () => {
    fill(204, 101, 192, 255);
    ellipse(this.x, this.y, this.random, this.random);
  }
}

function showBall() {
  lol = [];
  setInterval(() => {
    lol.push(new Ball(700, 700));
  }, 1000);
}
