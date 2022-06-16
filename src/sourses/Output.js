export class Output {
    constructor() {
        this.value = '';
        this.cursor = '|';
        this.output = document.querySelector(".output");
        this.array;
        this.cursorPos = 0;
    }
    mooveCursorToRigth() {
        if (this.array.length === this.cursorPos) {
            return
        }
            this.cursorPos += 1;
    }
    mooveCursorToLeft() {
        if (this.cursorPos <= 0) {
            return
        } else {
            this.cursorPos -= 1; 
        }
    }
     /* 
        *get the strings on textarea
        * array - array of strings
        * get the cursor position in strings - posInStr;
        * get the number string with cursor - thisstr; 
        * culc new cursor position
        */
    mooveCursorUp() {
        if (this.array === undefined) {
            return;
        };
        const arr = this.array.filter((item, index) => {
            return index <= this.cursorPos
        });
        const array = [];
        let str = [];
        for (let i = 0; i <= arr.length; i+= 1) {
            if (str.length <= 72 && arr[i - 1] !== '\n' && i !== arr.length){
            str.push(arr[i]);
            } else {
                array.push(str);
                str = [];
                str.push(arr[i]);
            }
        };
        if (array.length === 1) {
            return;
        }
        if (array[array.length - 1].length + (array[array.length - 1][array[array.length - 1].length - 1] !== '\n' ? 1 : 0) >= array[array.length - 2].length) {
            if (this.cursorPos - array[array.length - 1].length < 0) {
                return;
            } 
            this.cursorPos = this.cursorPos - array[array.length - 1].length;
        } else {
            if (this.cursorPos - array[array.length - 2].length < 0) {
                return 
            }
            this.cursorPos = this.cursorPos - array[array.length - 2].length;
        }
    }
    mooveCursorDown() {
        if (this.array === undefined) {
            return;
        };
        let array = [];
        let str = [];
        for (let i = 0; i <= this.array.length; i+= 1) {
            if (str.length <= 72 && this.array[i - 1] !== '\n' && i !== this.array.length){
            str.push(this.array[i]);
            } else {
                array.push(str);
                str = [];
                str.push(this.array[i]);
            }
        };
        let thisStr = 0;
        let posInStr = 0;
            let long = 0;
            for (let i = 0; i < array.length - 1; i += 1) {
                if ((this.cursorPos >= long) && (this.cursorPos <= array[i].length + long)) {
                    thisStr = i;
                    posInStr = this.cursorPos - long;
                }
                    long += array[i].length;
            }
        array = array.filter((item, index) => index >= thisStr);
        if (array.length === 1) {
            return;
        }
        if (posInStr >= array[1].length) {
            if (this.cursorPos + array[0].length - posInStr + array[1].length - 1 > this.array.length - 1) {
                return
            }
            this.cursorPos = this.cursorPos + array[0].length - posInStr + array[1].length - (array[1][array[1].length - 1] !== '\n' ? 0 : 1);
        } else {
            if (this.cursorPos + array[0].length > this.array.length - 1) {
            return
        }
            this.cursorPos = this.cursorPos + array[0].length;
        }
    }
    addSymbol(symbol) {
        if (typeof(symbol) !== 'string') {
            return;
        }
        if (this.array === undefined) {
            this.array = [];
        };
        this.array.splice(this.cursorPos, 0, symbol);
        this.mooveCursorToRigth();
    }
    deleteSymbol() {
        if (this.array.length > 0) {
            this.array = this.array.filter((item, index) => index !== this.cursorPos - 1);
        }
      this.mooveCursorToLeft();
    }
    getSymbols() {
        if (this.array === undefined) {
            return this.cursor;
        }
        if (this.cursorPos === this.array.length) {
            return this.array.join('') + this.cursor;
        } else {
            return this.array.map((item, index) => {
            if (index === this.cursorPos) {
            return item = this.cursor + item;
            } else {
            return item = item;
            }
        }).join('');
        }
    }
    showSymbols() {
        let value = this.getSymbols();
        this.output.innerHTML = value;
    }
};