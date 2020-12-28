'use strict';

const output = document.getElementById('output');

const getData = (url, outputData) => {
    const reguest = new XMLHttpRequest();
    reguest.open('GET', url);
    reguest.addEventListener('readystatechange', () => {
        if (reguest.readyState !== 4) {
            return;
        }
        if (reguest.status === 200) {
            const response = JSON.parse(reguest.responseText);
            outputData(response);
        } else {
            console.error(reguest.statusText);
        }
    });
    reguest.send();
};

const outputPhotos = (data) => {
    const random = Math.floor(Math.random() * data.length);
    const obj = data[random];
    console.log(obj);
    output.innerHTML = `<h2>${obj.title}</h2>
                        <img src="${obj.url}" alt="${obj.title}">`
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

getData(urlPhotos, outputPhotos);