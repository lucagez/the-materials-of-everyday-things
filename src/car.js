let drag = false;
let x, y;
const body = document.querySelector('body');
const scene = document.querySelector('.scene');
const carbody = document.querySelector('.carbody');
const carframe = document.querySelector('.carframe');
const carengine = document.querySelector('.carengine');
const carwheels = document.querySelector('.carwheels');
const carlights = document.querySelector('.carlights');
// style="-webkit-transform:rotateX(-7deg) rotateY(353deg); -moz-transform:rotateX(-7deg) rotateY(353deg); -ms-transform:rotateX(-7deg) rotateY(353deg); transform:rotateX(-7deg) rotateY(353deg); "

body.addEventListener('mousedown', (e) => {
    console.log(e);
    drag = true;
    x = e.clientX;
    y = e.clientY;
}, false);

// transform:rotateX(-7deg) rotateY(353deg);
body.addEventListener('mousemove', (e) => {
    if(drag) {
        console.log(x - e.clientX, y - e.clientY);
        scene.style = `transform: rotateY(${-(x - e.clientX) * 0.2}deg) rotateX(${(y - e.clientY) * 0.2}deg);`
        // cube.style = `transform: translateZ(-100px) rotateY(${-(x - e.clientX) * 0.2}deg) rotateX(${(y - e.clientY) * 0.2}deg);`;
    }
}, false);

body.addEventListener('mouseup', (e) => {
    drag = false;
    console.log('Cube rotated 🌈');
}, false);

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
})

// carframe.addEventListener('mouseover', () => {
//     console.log('ciao');
//     carframe.classList.add('opacity');
// });
