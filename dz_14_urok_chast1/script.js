
let stroka,
    color = 'red';

for( ; ; ){
    stroka = String(prompt('ввежите . или #')); 
    if (stroka === '.' || stroka === '#') {
        if(stroka === '#') {color = 'green'}
        break;
    } else { alert('ошибка значения ');}
}
    
function DomElement(selector, height, width, background_bg, fontSize){
    this.selector =  selector;
    this.height =  height;
    this.width = width;
    this.background_bg = background_bg;
    this.fontSize = fontSize;
}

DomElement.prototype.select = function(){
    if (this.selector.substring(0, 1) === '.') {
        let div = document.createElement('div');
            div.className = this.selector;
            div.innerHTML = 'Создали div с классом';
            document.querySelector('body').append(div);
            div.style.cssText = 'height: ' + this.height +'px; width: ' + this.width + 'px; background-color: ' + this.background_bg + '; font-size: ' + this.fontSize + 'px;';
            
    }
    if (this.selector.substring(0, 1) === '#') {
        let p = document.createElement('p');
            p.id = this.selector;
            p.innerHTML = 'Создали параграф с id';
            document.querySelector('body').append(p);
            p.style.cssText = 'height: ' + this.height +'px; width: ' + this.width + 'px; background-color: ' + this.background_bg + '; font-size: ' + this.fontSize + 'px;';
    }
}

    domElement = new DomElement(stroka+'createdId', 100, 100, color, 28);
    
    domElement.select();    
 