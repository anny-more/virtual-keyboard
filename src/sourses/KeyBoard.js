import { KeyBoardKey } from "./KeyBoardKey";
import { string } from "../index";

const KEYBOARD_VALUE = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft",  "ArrowDown", "ArrowRight"]
];

export class KeyBoard {

    constructor() {
        this.node = document.createElement('div');

        this.keys = {};

        this.buttons = {};

        this.isUpperCase = false;

        this.isShiftActive = false;

        this.isEn = true;
    }

    create() {
        this.node.classList.add('virtual_keyboard_container__main');
        this.node.innerHTML = '';
        for (let i = 0; i < KEYBOARD_VALUE.length; i += 1) {
            let elem = document.createElement('div');
            elem.className = 'virtual_keyboard_container';
            for (let j = 0; j < KEYBOARD_VALUE[i].length; j += 1) {
                let item = KEYBOARD_VALUE[i][j];
                if (!this.keys.hasOwnProperty(item)) {
                    this.keys[item] = new KeyBoardKey(item);
                }
                this.buttons[item] = this.keys[item].createButton();

                elem.append(this.buttons[item]);
                this.buttons[item].onclick = () => {
                    this.mouseEventHandler(item);}
            }
            this.node.append(elem);
        }
        document.body.append(this.node);
        if (this.isUpperCase) {
            this.buttons["CapsLock"].classList.add('virtual_keyboard_button__dot-active');
        };
    };

    switchUpperCase() {
        this.isUpperCase = !this.isUpperCase;
        this.create();
        const caps = this.buttons["CapsLock"];
        if (this.isUpperCase) {
            caps.classList.add('virtual_keyboard_button__dot-active');
        } 
    };

    useShift(value) {
        this.isShiftActive = !this.isShiftActive;
        if (this.isShiftActive) {
            this.isUpperCase = !this.isUpperCase;
            this.create();
            this.buttons[value].classList.add('virtual_keyboard_button_active');
        } else {
            this.isUpperCase = !this.isUpperCase;
            this.create();
        }
    }

    switchLang() {
        this.isEn = !this.isEn;
        this.create();
    }

    showActiveKey(e) {
        this.buttons[e.code].classList.add('virtual_keyboard_button_active');
        document.addEventListener('keyup', (event) => {
            this.buttons[event.code].classList.remove('virtual_keyboard_button_active');
        });
    }

    mouseEventHandler(keyCode) {
        let symbol = this.keys[keyCode].case();

        switch(symbol) {
            case 'Ctrl':
            case 'Win':
                break;
            case 'Alt':
                if (this.isShiftActive) {
                    this.switchLang();
                };
                break;
            case 'Caps':
                this.switchUpperCase();
                break;
            case 'Backspace':
                string.deleteSymbol();
                break;
            case 'Rigth':
                string.mooveCursorToRigth();
                break;
            case 'Left':
                string.mooveCursorToLeft();
                break;
            case 'Up':
                string.mooveCursorUp();
                break;
            case 'Down':
                string.mooveCursorDown();
                break;
            case 'Shift':
                this.useShift(keyCode);
                break;
            case 'Tab':
                symbol = '\t';
                string.addSymbol(symbol);
                break;
            case 'Enter':
                symbol = '\n';
                string.addSymbol(symbol);
                break;
            default:
                symbol = this.isUpperCase ? symbol.toUpperCase() : symbol;
                string.addSymbol(symbol);
                if (this.isShiftActive) {
                    this.useShift(keyCode);
                };
                break;
          }
        string.showSymbols();
    };

    keyEventHandler(event) {
        if (event.code === 'AltLeft') {
            this.buttons['AltLeft'].classList.add('virtual_keyboard_button_active');
        };
        this.showActiveKey(event);
        
        if ((event.code === 'ShiftLeft' && event.altKey) || (event.code === 'AltLeft' && event.shiftKey)) {
            this.switchLang();
            this.buttons['ShiftLeft'].classList.add('virtual_keyboard_button_active');
            this.buttons['AltLeft'].classList.add('virtual_keyboard_button_active');
        setTimeout(() => {
            this.buttons['ShiftLeft'].classList.remove('virtual_keyboard_button_active');
            this.buttons['AltLeft'].classList.remove('virtual_keyboard_button_active');
        }, 600);
            return;
        };
        if ((event.code === 'ShiftRigth' && event.altKey) || (event.code === 'AltRigth' && event.shiftKey)) {
            this.switchLang();
            this.buttons['ShiftRigth'].classList.add('virtual_keyboard_button_active');
            this.buttons['AltRigth'].classList.add('virtual_keyboard_button_active');
        setTimeout(() => {
            this.buttons['ShiftRigth'].classList.remove('virtual_keyboard_button_active');
            this.buttons['AltRigth'].classList.remove('virtual_keyboard_button_active');
        }, 600);
            return;
        };
        if (this.isShiftActive) {
            this.useShift(event.code);
            return;
        }
        let symbol = this.keys[event.code].case(event.code);
        switch(symbol) {
            case 'Ctrl':
            case 'Win':
                break;
            case 'Alt':
                if (event.shiftKey) {
                    this.switchLang();
                };
                break;
            case 'Caps':
                this.switchUpperCase();
                this.showActiveKey(event);
                break;
            case 'Backspace':
                string.deleteSymbol();
                break;
            case 'Rigth':
                string.mooveCursorToRigth();
                break;
            case 'Left':
                string.mooveCursorToLeft();
                break;
            case 'Up':
                string.mooveCursorUp();
                break;
            case 'Down':
                string.mooveCursorDown();
                break;
            case 'Shift':
                this.useShift(event.code);
                break;
            case 'Tab':
                symbol = '\t';
                string.addSymbol(symbol);
                break;
            case 'Enter':
                symbol = '\n';
                string.addSymbol(symbol);
                break;
            default:
                symbol = this.isUpperCase ? symbol.toUpperCase() : symbol;
                string.addSymbol(symbol);
                if (this.isShiftActive) {
                    this.useShift(keyCode);
                };
                break;
          }
        string.showSymbols();
    }
};