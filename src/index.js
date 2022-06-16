import './styles.css';
import { KeyBoard } from './sourses/KeyBoard';
import { Output } from './sourses/Output';

export const string = new Output;

export const keyBoard = new KeyBoard;

keyBoard.create();

keyBoard.node.addEventListener('click', (event) => {
    keyBoard.mouseEventHandler(event);
});

document.addEventListener('keydown', (event) => {
    keyBoard.keyEventHandler(event);
});
