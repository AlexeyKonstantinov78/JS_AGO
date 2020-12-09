
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
        let div = document.createElement('p');
            div.id = this.selector;
            div.innerHTML = 'Создали параграф с id';
            document.querySelector('body').append(div);
            div.style.cssText = 'height: ' + this.height +'px; width: ' + this.width + 'px; background-color: ' + this.background_bg + '; font-size: ' + this.fontSize + 'px;';
    }
}

let domElement1 = new DomElement('.des', 100, 100, 'red', 28),
    domElement2 = new DomElement('#des', 30, 300, 'green', 20);

domElement1.select();
domElement2.select();