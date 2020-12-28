'use strict';

const output = document.getElementById('output');

const getData = (url) => {

    return new Promise((resolve, reject) => {
        const reguest = new XMLHttpRequest();
        reguest.open('GET', url);
        reguest.addEventListener('readystatechange', () => {
            if (reguest.readyState !== 4) {
                return;
            }
            if (reguest.status === 200) {
                const response = JSON.parse(reguest.responseText);
                resolve(response);
            } else {
                reject(reguest.statusText);
            }
        });
    reguest.send();
    }); 
    
};

const outputPhotos = (data) => {
    // const random = Math.floor(Math.random() * data.length);
    //const obj = data[random];
    //console.log(obj);

    data.forEach((item) => {
        output.insertAdjacentHTML('beforebegin', `<h4>${item.title}</h4>
    <img src="${item.thumbnailUrl}" alt="${item.title}">`);
    });
    
};

const urlPhotos = 'https://jsonplaceholder.typicode.com/photos';

const oneImg = getData('https://jsonplaceholder.typicode.com/photos/1'),
    twoImg = getData('https://jsonplaceholder.typicode.com/photos/2');

// oneImg
//     .then(outputPhotos)
//     .catch(error => console.log(error));

// twoImg
//     .then(outputPhotos)
//     .catch(error => console.log(error));

// Promise.race([oneImg, twoImg])
//     .then(outputPhotos)
//     .catch(error => console.log(error));

Promise.all([oneImg, twoImg])
    .then(outputPhotos)
    .catch(error => console.log(error));


//getData(urlPhotos).then(outputPhotos)
  //  .catch(error => console.console.error(error));