'use strict';


const collectionsBook = document.querySelectorAll('.book'),
    collectionsLiBook2 = collectionsBook[0].querySelectorAll('li'),
    collectionsLiBook5 = collectionsBook[5].querySelectorAll('li'),
    titleBook3 = collectionsBook[4].querySelector('a'),
    advertising = document.querySelector('.adv'),
    collectionsLiBook6 = collectionsBook[2].querySelectorAll('li'),
    newElemLi = document.createElement('li');

collectionsBook[0].before(collectionsBook[1]);
collectionsBook[2].before(collectionsBook[4]);
collectionsBook[2].before(collectionsBook[3]);
collectionsBook[2].before(collectionsBook[5]);

document.body.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

titleBook3.textContent = 'Книга 3. this и Прототипы Объектов';

advertising.remove();

collectionsLiBook2[3].after(collectionsLiBook2[6]);
collectionsLiBook2[6].after(collectionsLiBook2[8]);
collectionsLiBook2[9].after(collectionsLiBook2[2]);

collectionsLiBook5[1].after(collectionsLiBook5[9]);
collectionsLiBook5[2].before(collectionsLiBook5[3]);
collectionsLiBook5[2].before(collectionsLiBook5[4]);
collectionsLiBook5[7].after(collectionsLiBook5[5]);

newElemLi.textContent = 'Глава 8: За пределами ES6';

collectionsLiBook6[8].insertAdjacentElement('afterend', newElemLi);
