import './styles.css';
import { KeyBoard } from './sourses/KeyBoard';
import { Output } from './sourses/Output';

export const string = new Output;

export const keyBoard = new KeyBoard;

keyBoard.create();

document.addEventListener('keydown', (event) => {
    keyBoard.keyEventHandler(event);
});
