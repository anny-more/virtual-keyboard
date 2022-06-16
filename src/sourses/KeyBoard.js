import { KeyBoardKey } from "./KeyBoardKey";
import { string } from "../index";
//import { keyBoard } from "../index";

const keys = {};

const keyboardValue__En = [
    ["Backquote", "Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8", "Digit9", "Digit0", "Minus", "Equal", "Backspace"],
    ["Tab", "KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"],
    ["CapsLock", "KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon", "Quote", "Enter"],
    ["ShiftLeft", "KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash", "ArrowUp", "ShiftRight"],
    ["ControlLeft", "MetaLeft", "AltLeft", "Space", "AltRight", "ControlRight", "ArrowLeft",  "ArrowDown", "ArrowRight"]
];

export class KeyBoard {
    constructor() {
        this.node = document.createElement('div');
        this.class = this.node.classList.add('virtual_keyboard_container__main');
        this.isUpperCase = false;
        this.isShiftActive = false;
        this.isEn = true;
    }
    allKeys() {
        return document.querySelectorAll(".virtual_keyboard_button");
    };
    create() {
        this.node.innerHTML = keyboardValue__En.reduce(
            function(acc, item, index) {
                return acc = acc + '<div class="virtual_keyboard_container">' + 
                item.reduce(
                    function(acc, item, index) {
                        if (!keys.hasOwnProperty(item)) {
                            keys[item] = new KeyBoardKey(item);
                        }
                        return acc = acc + keys[item].createButton();
                    }, ''
                ) + '</div>'
            }, ''
        ); 
        document.body.append(this.node);
        if (this.isUpperCase) {
            const caps = document.querySelector('.virtual_keyboard_button__dot');
            caps.classList.add('virtual_keyboard_button__dot-active');
        };
    };
    switchUpperCase() {
        this.isUpperCase = !this.isUpperCase;
        this.create();
        const caps = document.querySelector('.virtual_keyboard_button__dot');
        if (this.isUpperCase) {
            caps.classList.add('virtual_keyboard_button__dot-active');
        } 
    };
    useShift(value) {
        this.isShiftActive = !this.isShiftActive;
        if (this.isShiftActive) {
            this.isUpperCase = !this.isUpperCase;
            this.create();
            const shift = document.querySelector('.virtual_keyboard_button[data-code="'+value+'"]');
            shift.classList.add('virtual_keyboard_button_active');
        } else {
            this.isUpperCase = !this.isUpperCase;
            this.create();
        }
    }
    switchLang() {
        this.isEn = !this.isEn;
        this.create();
        document.querySelector('.virtual_keyboard_button[data-code="'+"ShiftLeft"+'"]').classList.add('virtual_keyboard_button_active');
        document.querySelector('.virtual_keyboard_button[data-code="'+"AltLeft"+'"]').classList.add('virtual_keyboard_button_active');
        setTimeout(() => {
            document.querySelector('.virtual_keyboard_button[data-code="'+"ShiftLeft"+'"]').classList.remove('virtual_keyboard_button_active');
            document.querySelector('.virtual_keyboard_button[data-code="'+"AltLeft"+'"]').classList.remove('virtual_keyboard_button_active');
        }, 600); 
    }
    showActiveKey(e) {
        this.allKeys().forEach(item => {
            if (item.dataset.code === e.code) {
                item.classList.add('virtual_keyboard_button_active');
                document.addEventListener('keyup', (event) => {
                    if (item.dataset.code === event.code) {
                    item.classList.remove('virtual_keyboard_button_active');
                    }
                });
            }
        });
    }

    mouseEventHandler(event) {
        if (event.target.tagName !== 'BUTTON') {
            return false;
        }
        const keyCode = event.target.dataset.code;
        let symbol = keys[keyCode].case(keyCode);

        if (['Ctrl', 'Win'].includes(symbol)) {
            symbol = '';
        } else if (symbol === 'Alt') {
            if (this.isShiftActive) {
                this.switchLang();
            }
            symbol = '';
        } else if (symbol === 'Tab') {
            symbol = '\t';
        } else if (symbol === 'Caps') {
            symbol = '';
            this.switchUpperCase();
        } else if (symbol === 'Enter') {
            symbol = '\n';
        } else if (symbol === 'Backspace') {
            symbol = '';
            string.deleteSymbol();
        } else if (symbol === 'Rigth') {
            symbol = '';
            string.mooveCursorToRigth();
        } else if (symbol === 'Left') {
            symbol = '';
            string.mooveCursorToLeft();
        } else if (symbol === 'Shift') {
            symbol = '';
            this.useShift(keyCode);
            return;
        } else if (symbol === 'Up') {
            symbol = '';
            string.mooveCursorUp();
        } else if (symbol === 'Down') {
            symbol = '';
            string.mooveCursorDown();
        };

        if (symbol !== '') {
            symbol = this.isUpperCase ? symbol.toUpperCase() : symbol;
            string.addSymbol(symbol);
        }
        string.showSymbols();
        if (this.isShiftActive) {
            this.useShift(keyCode);
        };
        event.stopPropagation();
    };
    keyEventHandler(event) {
        if (event.code === 'AltLeft') {
            document.querySelector('.virtual_keyboard_button[data-code="'+"AltLeft"+'"]').classList.add('virtual_keyboard_button_active');
        };
        this.showActiveKey(event);
        let symbol = keys[event.code].case(event.code);

        if (event.code === 'CapsLock') {
            this.switchUpperCase();
        }
        if ((event.code === 'ShiftLeft' && event.altKey) || (event.code === 'AltLeft' && event.shiftKey)) {
            this.switchLang();
        };
        if (this.isShiftActive) {
            this.useShift(event.code);
        }
        
        if (['Ctrl', 'Win', 'Alt', 'Shift', 'Caps'].includes(symbol)) {
            symbol = '';
        } else if (symbol === 'Tab') {
            symbol = '\t';
        } else if (symbol === 'Enter') {
            symbol = '\n';
        } else if (symbol === 'Backspace') {
            symbol = '';
            string.deleteSymbol()
        } else if (symbol === 'Rigth') {
            symbol = '';
            string.mooveCursorToRigth();
        } else if (symbol === 'Left') {
            symbol = '';
            string.mooveCursorToLeft();
        } else if (symbol === 'Up') {
            symbol = '';
            string.mooveCursorUp();
        } else if (symbol === 'Down') {
            symbol = '';
            string.mooveCursorDown();
        };
        
        if (symbol !== '') {
            symbol = this.isUpperCase ? symbol.toUpperCase() : symbol;
            string.addSymbol(symbol);
        }
        string.showSymbols();
        
    }
};