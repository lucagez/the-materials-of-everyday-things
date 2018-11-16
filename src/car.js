const body = document.querySelector('body');
const scene = document.querySelector('.scene');
const carbody = document.querySelector('.carbody');
const carframe = document.querySelector('.carframe');
const carengine = document.querySelector('.carengine');
const carwheels = document.querySelector('.carwheels');
const carlights = document.querySelector('.carlights');

scene.addEventListener('mouseover', () => {
    carframe.style = `transform: translateY(${70}px);`;
    carengine.style = `transform: translateY(${50}px);`;
    carwheels.style = `transform: translateY(${130}px);`;
    carlights.style = `transform: translateZ(${-60}px);`;
});

scene.addEventListener('mouseout', () => {
    carframe.style = "";
    carengine.style = "";
    carwheels.style = "";
    carlights.style = "";
});