import { keyData } from "./keysData";
import { keyBoard } from "../index";

export class KeyBoardKey {
    constructor(value) {
        this.keyCode = value;
        this.class = keyData[value].className;
        this.isEn = keyBoard.isEn;
    }

    createButton() {
        return `<button class="${this.class}" data-code="${this.keyCode}" type="button">${this.case(this.keyCode)}</button>`
    }
    case(value) {
        if (['Shift', 'Ctrl', 'Win', 'Alt', 'Left', 'Down', 'Rigth', 'Up', "Backspace", "Enter", 'Tab', 'Caps'].includes(keyData[value].symbolEn)) {
            return keyData[value].symbolEn;
        } else if (['1', '2', '3', '4', '5', '6', "7", "8", '9', '0'].includes(keyData[value].symbolEn) && keyBoard.isShiftActive) {
            const shiftCase = {'1' : '!', '2' : '@', '3' : '#', '4' : '$', '5' : '%', '6' : '^', '7' : '&', '8' : '*', '9' : '(', '0' : ')'};
            return shiftCase[keyData[value].symbolEn];
        } else {
            let symbol = value;
            symbol = keyBoard.isEn === true ? keyData[value].symbolEn : keyData[value].symbolRu;
            symbol = keyBoard.isUpperCase === true ? symbol.toUpperCase() : symbol;
            return  symbol;
        };
    }
}