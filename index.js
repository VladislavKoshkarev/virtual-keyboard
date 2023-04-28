const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
const title = document.createElement('p');
title.className = 'title';
title.textContent = 'Virtual Keyboard';
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
textarea.setAttribute('autofocus', true);
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
const info = document.createElement('p');
info.className = 'info';
info.textContent = 'Создано в операционной системе MacOS.';
const keysArray = [{ key: '`', code: 'Backquote' },
  { key: '1', code: 'Digit1' },
  { key: '2', code: 'Digit2' },
  { key: '3', code: 'Digit3' },
  { key: '4', code: 'Digit4' },
  { key: '5', code: 'Digit5' },
  { key: '6', code: 'Digit6' },
  { key: '7', code: 'Digit7' },
  { key: '8', code: 'Digit8' },
  { key: '9', code: 'Digit9' },
  { key: '0', code: 'Digit0' },
  { key: '-', code: 'Minus' },
  { key: '=', code: 'Equal' },
  { key: 'Backspace', code: 'Backspace' },
  { key: 'Tab', code: 'Tab' },
  { key: 'q', code: 'KeyQ' },
  { key: 'w', code: 'KeyW' },
  { key: 'e', code: 'KeyE' },
  { key: 'r', code: 'KeyR' },
  { key: 't', code: 'KeyT' },
  { key: 'y', code: 'KeyY' },
  { key: 'u', code: 'KeyU' },
  { key: 'i', code: 'KeyI' },
  { key: 'o', code: 'KeyO' },
  { key: 'p', code: 'KeyP' },
  { key: '[', code: 'Brack etLeft' },
  { key: ']', code: 'BracketRight ' },
  { key: '\\', code: 'Backslash' },
  { key: 'CapsLock', code: 'CapsLock' },
  { key: 'A', code: 'KeyA' },
  { key: 'S', code: 'KeyS' },
  { key: 'D', code: 'KeyD' },
  { key: 'F', code: 'KeyF' },
  { key: 'G', code: 'KeyG' },
  { key: 'H', code: 'KeyH' },
  { key: 'J', code: 'KeyJ' },
  { key: 'K', code: 'KeyK' },
  { key: 'L', code: 'KeyL' },
  { key: ';', code: 'Semicolon' },
  { key: "'", code: 'Quote' },
  { key: 'Enter', code: 'Enter' },
  { key: 'Shift', code: 'ShiftLeft' },
  { key: 'Z', code: 'KeyZ' },
  { key: 'X', code: 'KeyX' },
  { key: 'C', code: 'KeyC' },
  { key: 'V', code: 'KeyV' },
  { key: 'B', code: 'KeyB' },
  { key: 'N', code: 'KeyN' },
  { key: 'M', code: 'KeyM' },
  { key: ',', code: 'Comma' },
  { key: '.', code: 'Period' },
  { key: '/', code: 'Slash' },
  { key: 'ArrowUp', code: 'ArrowUp' },
  { key: 'Shift', code: 'ShiftRight' },
  { key: 'Control', code: 'ControlLeft' },
  { key: 'Alt', code: 'AltLeft' },
  { key: 'Meta', code: 'MetaLeft' },
  { key: ' ', code: 'Space' },
  { key: 'Meta', code: 'MetaRight' },
  { key: 'Alt', code: 'AltRight' },
  { key: 'ArrowLeft', code: 'ArrowLeft' },
  { key: 'ArrowDown', code: 'ArrowDown' },
  { key: 'ArrowRight', code: 'ArrowRight' }];

// first row: 0-13, second row: 14-27, third row: 28-40, fourth row: 41-53, fifth row: 54-

class Key {
  constructor(name) {
    this.markup = document.createElement('div');
    this.markup.className = 'key';
    this.markup.textContent = name;
  }
}

function generateRow(minIndex, maxIndex, keyType) {
  const row = document.createElement('div');
  row.className = 'row';
  for (let i = minIndex; i <= maxIndex; i += 1) {
    const key = new Key(keysArray[i][keyType]);
    row.append(key.markup);
  }
  return row;
}

function generateKeyboard() {
  const keyType = 'key';
  keyboard.append(generateRow(0, 13, keyType));
  keyboard.append(generateRow(14, 27, keyType));
  keyboard.append(generateRow(28, 40, keyType));
  keyboard.append(generateRow(41, 53, keyType));
  keyboard.append(generateRow(54, keysArray.length - 1, keyType));
}

function generateDOM() {
  wrapper.append(title);
  wrapper.append(textarea);
  generateKeyboard();
  wrapper.append(keyboard);
  wrapper.append(info);
  document.body.append(wrapper);
}

generateDOM();

window.addEventListener('keydown', (event) => {
  console.log({ key: event.key, code: event.code });
  if (event.ctrlKey && event.shiftKey) console.log('lang change');
});
