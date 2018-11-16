async function main() {
  let data;
  let coords;
  loadCar();
  const body = document.querySelector('body');
  const button = document.querySelector('#deeper');
  const articles = await loadArticles();
  const svgWorld = await loadSvgWorld();
  console.log(svgWorld);

  const actions = {
    0: () => explain(button),
    1: () => {
      resetButton(button);
      intro(articles.intro1, body, 'top: 0;', ['carframe', 'carbody']);
    },
    2: async () => {
      ask('It represents being bigger than ourselves. <br>🌎', body);
      data = await loadDataset();
      console.log(data);
    },
    3: async () => {
      intro(articles.intro2, body, 'top: 0;', ['carbody']);
      addClassToContainer('intro2');
      makeScript('src/worldHelper.js');
    },
    4: async () => {
      intro(articles.intro3, body, 'top: 0;', []);
    },
    5: () => ask('Where do all these elements come from? 🤷', body),
    6: () => {
      makeViz(body, svgWorld);
      scroll();
      setTimeout(() => {
        addListenersToElements([
          ['V', 'vanadium'],
          ['S', 'sulfur'],
          ['P', 'phosphorus'],
          ['Be', 'beryllium'],
          ['C', 'carbon'],
          ['Mn', 'manganese'],
          ['Mg', 'magnesium'],
          ['Al', 'aluminium'],
          ['Mo', 'Molybdenum'],
          ['Fe', 'Iron'],
          ['Ti', 'titanium'],
          ['Ga', 'gallium'],
          ['Ni', 'nichel'],
          ['Cr', 'chromium'],
          ['Nb', 'niobium'],
          ['Ge', 'germanium'],
          ['Li', 'lithium'],
          ['Co', 'cobalt'],
          ['Cu', 'copper'],
          ['Zn', 'zinc'],
          ['W', 'tungsten']
        ]);
        moveCar('top: 30%;');
        carOpacity([]);
        addListenersToParts();
          setTimeout(() => {
            document.querySelectorAll('.elementContainer')[0].focus();
            document.querySelectorAll('.elementContainer')[0].click();
          }, 700);
        makeCountryLabels();
      }, 100);
    },
    7: () => {
      const label = document.querySelector('.labelViz')
      document.querySelector('.firstViz').removeChild(label);
      intro(articles.intro4, body, 'top: 0;', []);
    },
    8: () => {
      ask('How deeply connected are we? 🦋<br><br><p class="authorName">with sweat by <a href="/about.html" target="_blank">Luca Gesmundo</a><p>', body);
      document.querySelector('#deeper').style = 'display: none;';
      document.querySelector('.car').style = 'display: none;';
    },
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