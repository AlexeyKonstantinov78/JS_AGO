var canvas = document.getElementById('canvas').getContext('2d');
var radius = 50;

var circles = [
    { color: '#0584C1', x: 2 * radius - radius / 2, y: 2 * radius, q: [1, 2, 3, 0] },
    { color: '#000000', x: 4 * radius, y: 2 * radius, q: [2, 0, 1, 3] },
    { color: '#EC324D', x: 6 * radius + radius / 2, y: 2 * radius, q: [2, 0, 1, 3] },
    { color: '#FAB031', x: 3 * radius - radius / 4, y: 3 * radius, q: [3, 0, 1, 2] },
    { color: '#1A8A3B', x: 5 * radius + radius / 4, y: 3 * radius, q: [3, 0, 1, 2] }
];

function drawArc(canvas, circle, q) {
    var s = (circle.q[q] + 0.5) / 2 * Math.PI,
        e = (circle.q[q] - 0.5) / 2 * Math.PI;

    canvas.lineWidth = 16;
    canvas.strokeStyle = 'white';
    canvas.beginPath();
    canvas.arc(circle.x, circle.y, radius, s, e, true);
    canvas.stroke();

    canvas.lineWidth = 10;
    canvas.strokeStyle = circle.color;
    canvas.beginPath();
    canvas.arc(circle.x, circle.y, radius, s, e, true);
    canvas.stroke();
}

for (var q = 0; q < 4; ++q) {
    circles.forEach(function (circle) {
        drawArc(canvas, circle, q);
    })
}




// ctx.moveTo(150, 0); // переместился на 150 пискселей в права но остался в 0 точке

// ctx.lineTo(175, 125); //чертим линию 
// ctx.lineTo(300, 150);
// ctx.lineTo(175, 175);
// ctx.lineTo(150, 300);
// ctx.lineTo(125, 175);
// ctx.lineTo(0, 150);
// ctx.lineTo(125, 125);
// ctx.lineTo(150, 0);

// ctx.moveTo(175, 150);
// ctx.arc(150, 150, 25, 0, angle(360), false); // принимает 6 параметров:  координаты центра дуги X,Y радиус , нашего круга или дуги начало отрисовки дуги , Math.PI * 2 полный коруг , true против часовой дуги false по часовой дуге.
// ctx.moveTo(125, 125);
// ctx.arcTo(150, 100, 175, 125, 30); // рисуем полукгру 5парметров кооррдинаты 1 точки 2 координтароы конечной 5 радиус
// ctx.lineTo(175, 125);


// ctx.lineWidth = '2'; // толщина линии
// ctx.strokeStyle = '#008800'; //задаем цвет

// ctx.moveTo(100, 100);
// ctx.bezierCurveTo(100, 200, 200, 200, 200, 100); // кривая  безе принимает 6 параметров 3 контрольные njxrbточки
// ctx.font = '30px Sans-serif';
// ctx.fillStyle = 'green';
// ctx.shadowOffsetX = 5;
// ctx.shadowOffsetY = 5;
// ctx.shadowBlur = 3;
// ctx.shadowColor = 'red';
// ctx.save(); //запись сохранение параметров
// ctx.fillText('js', 50, 50, 200); //пишем текст координаты ширина

// ctx.shadowColor = 'orange';
// ctx.fillStyle = 'blur';
// ctx.rotate(angle(10));
// ctx.fillText('GLO', 200, 50, 200);

// ctx.restore(); //востанавливаем сохраненные параметры
// ctx.fillText('filan ', 125, 150, 200);
// ctx.stroke(); // ввод контура

// let tick = 0;

// const animation = () => {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
//     ctx.fillStyle = 'green';
//     ctx.fillRect(tick, tick, 50, 50);
//     tick++;
//     if (tick < 350) {
//         requestAnimationFrame(animation);
//     } else {
//         reverse();
//     }

// };

// const reverse = () => {
//     ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
//     ctx.fillStyle = 'green';
//     ctx.fillRect(tick, tick, 50, 50);
//     tick--;
//     if (tick > 0) {
//         requestAnimationFrame(reverse);
//     } else {
//         animation();
//     }
// };

// animation();

let canvas1 = document.getElementById('canvas'),
    ctx = canvas1.getContext('2d'),
    color = document.getElementById('color'),
    radius1 = document.getElementById('radius');
ctx.lineWidth = 1;
radius1.addEventListener('input', () => {
    ctx.lineWidth = radius1.value;
    console.log(ctx.lineWidth);
});


canvas1.addEventListener('mousemove', (event) => {
    const x = event.offsetX,
        y = event.offsetY,
        mx = event.movementX,
        my = event.movementY;

    if (event.buttons > 0) {
        ctx.beginPath();
        //ctx.lineWidth = 1;
        ctx.moveTo(x, y);
        ctx.lineTo(x - mx, y - my);
        ctx.stroke();
        ctx.closePath();
    }
});
 //else { alert('введите значение '); }