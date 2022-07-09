import { KEY_DATA } from "./keysData";
import { keyBoard } from "../index";

export class KeyBoardKey {

    constructor(value) {
        this.keyCode = value;

        this.class = KEY_DATA[this.keyCode].className;

        this.isEn = keyBoard.isEn;
    }

    createButton() {
        const element = document.createElement('button');
        element.className = `${this.class}`;
        element.innerHTML = `${this.case(this.keyCode)}`;
        element.setAttribute(`data-code`, `${this.keyCode}`);
        return element;
    }
    
    case() {
        if (['Shift', 'Ctrl', 'Win', 'Alt', 'Left', 'Down', 'Rigth', 'Up', 'Backspace', 'Enter', 'Tab', 'Caps'].includes(KEY_DATA[this.keyCode].symbolEn)) {
            return KEY_DATA[this.keyCode].symbolEn;
        } else if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].includes(KEY_DATA[this.keyCode].symbolEn) && keyBoard.isShiftActive) {
            const shiftCase = {'1' : '!', '2' : '@', '3' : '#', '4' : '$', '5' : '%', '6' : '^', '7' : '&', '8' : '*', '9' : '(', '0' : ')'};
            return shiftCase[KEY_DATA[this.keyCode].symbolEn];
        } else {
            let symbol = keyBoard.isEn === true ? KEY_DATA[this.keyCode].symbolEn : KEY_DATA[this.keyCode].symbolRu;
            symbol = keyBoard.isUpperCase === true ? symbol.toUpperCase() : symbol;
            return  symbol;
        };
    }
}