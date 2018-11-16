let elementDATA;

(async () => {
  elementDATA = await loadDataset();
  console.log(elementDATA);
})();

function getCoords() {
  const countries = document.querySelector('.svgWorld').querySelectorAll('path');
  const coords = {};
  for (country of countries) {
    const id = country.id;
    const name = country.getAttribute('title');
    const position = country.getBoundingClientRect();
    coords[`${id}`] = {};
    coords[`${id}`].name = name;
    coords[`${id}`].position = position;
  }
  return coords;
}

function makeCountryLabels() {
  const world = document.querySelector('.svgWorld');
  const label = newElement('div', 'label');
  document.querySelector('body').appendChild(label);
  world.addEventListener('mousemove', (e) => {
    if (!e.target.id) {
      label.style = 'display: none';
    } else {
      label.innerHTML = `
            <h2>${e.target.id}</h2>
            <p>${e.target.getAttribute('title')}</p>
          `;
      label.style = `display: block; position: fixed; z-index: 999; top:${e.clientY + 20}px; left:${e.clientX + 20}px;`;
    }
  })

}

function createMaterial(country, intensity) {
  const norm = (226 - 215) * (intensity - 1) + 226;
  document.querySelector(`#${country}`).style = `fill: rgba(${norm}, ${200 * (1 - intensity)}, ${200 * (1 - intensity)}, 1);`;
}

function removeMaterial() {
  document.querySelectorAll('path').forEach((e) => {
    e.style = `
      fill: rgba(226, 188, 188, 0.5);
    `;
  });
}

function showData(id) {
  let chartData;
  const clear = document.querySelector('.chartContainer') ? document.querySelector('.chartContainer') : null;
  if (clear) {
    document.querySelector('.firstViz').removeChild(clear);
  }
  const sheet = (elementDATA[id].sheet) ? elementDATA[id].sheet : undefined;
  const countries = [];
  const data = [];
  const myChartContainer = newElement('div', 'chartContainer');
  const myChart = newElement('canvas', 'chart');
  const ctx = myChart.getContext('2d');
  myChart.setAttribute('id', 'chart');
  myChartContainer.appendChild(myChart);
  document.querySelector('.firstViz').appendChild(myChartContainer);
  if (sheet) {
    sheet.forEach((e) => {
      const percentage = e[1] / sheet[sheet.length - 1][1] * 100;
      if (percentage > 2) {
        countries.push(e[0]);
        data.push(e[1]);
        const intensity = e[1] / sheet[sheet.length - 1][1];
        removeMaterial();
        setTimeout(() => {
          createMaterial(`${e[0]}`, intensity);
        }, 10);
      }
    })
    chartData = {
      labels: countries,
      datasets: [{
        label: 'metric tonnes',
        backgroundColor: '#8A7777',
        data: data,
      }]
    }
    Chart.defaults.global.defaultFontColor = 'rgb(177, 177, 177)';
    window.myBar = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        legend: {
          position: 'top',
        }
      },
      defaultFontColor: 'rgb(177, 177, 177)',
    });
  }
}