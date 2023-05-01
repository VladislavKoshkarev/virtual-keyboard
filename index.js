import { eng, rus } from './keys.js';

let language = 'eng';
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
const title = document.createElement('p');
title.className = 'title';
title.textContent = 'Virtual Keyboard';
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
// textarea.setAttribute('autofocus', true);
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
const info = document.createElement('p');
info.className = 'info';
info.textContent = 'Создано в операционной системе MacOS. Для смены языка нажмите левый Ctrl(control) + левый Alt(option)';
let keysArray = [{ key: '`', code: 'Backquote' },
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
  { key: 'Delete', code: 'Delete' },
  { key: 'CapsLock', code: 'CapsLock' },
  { key: 'a', code: 'KeyA' },
  { key: 's', code: 'KeyS' },
  { key: 'd', code: 'KeyD' },
  { key: 'f', code: 'KeyF' },
  { key: 'g', code: 'KeyG' },
  { key: 'h', code: 'KeyH' },
  { key: 'j', code: 'KeyJ' },
  { key: 'k', code: 'KeyK' },
  { key: 'l', code: 'KeyL' },
  { key: ';', code: 'Semicolon' },
  { key: "'", code: 'Quote' },
  { key: 'Enter', code: 'Enter' },
  { key: 'Shift', code: 'ShiftLeft' },
  { key: 'z', code: 'KeyZ' },
  { key: 'x', code: 'KeyX' },
  { key: 'c', code: 'KeyC' },
  { key: 'v', code: 'KeyV' },
  { key: 'b', code: 'KeyB' },
  { key: 'n', code: 'KeyN' },
  { key: 'm', code: 'KeyM' },
  { key: ',', code: 'Comma' },
  { key: '.', code: 'Period' },
  { key: '/', code: 'Slash' },
  { key: '↑', code: 'ArrowUp' },
  { key: 'Shift', code: 'ShiftRight' },
  { key: 'Control', code: 'ControlLeft' },
  { key: 'Alt', code: 'AltLeft' },
  { key: 'Meta', code: 'MetaLeft' },
  { key: ' ', code: 'Space' },
  { key: 'Meta', code: 'MetaRight' },
  { key: 'Alt', code: 'AltRight' },
  { key: '←', code: 'ArrowLeft' },
  { key: '↓', code: 'ArrowDown' },
  { key: '→', code: 'ArrowRight' }];

// first row: 0-13, second row: 14-28, third row: 29-41, fourth row: 42-54, fifth row: 55-

class Key {
  constructor(key, code) {
    this.markup = document.createElement('div');
    this.markup.className = `key ${code}`;
    this.markup.textContent = key;
  }
}

function generateRow(minIndex, maxIndex, keyType) {
  const row = document.createElement('div');
  row.className = 'row';
  for (let i = minIndex; i <= maxIndex; i += 1) {
    const key = new Key(keysArray[i][keyType], keysArray[i].code);
    row.append(key.markup);
  }
  return row;
}

function generateKeyboard() {
  const keyType = 'key';
  // if (language === 'rus') keyType = 'key_rus';
  keyboard.append(generateRow(0, 13, keyType));
  keyboard.append(generateRow(14, 28, keyType));
  keyboard.append(generateRow(29, 41, keyType));
  keyboard.append(generateRow(42, 54, keyType));
  keyboard.append(generateRow(55, keysArray.length - 1, keyType));
}

function generateDOM() {
  wrapper.append(title);
  wrapper.append(textarea);
  // generateKeyboard();
  wrapper.append(keyboard);
  wrapper.append(info);
  document.body.append(wrapper);
}

generateDOM();

// const keyList = document.querySelectorAll('.key');
let selectionStart;

function slicer(string, direction) {
  let result;
  if (direction === 'Backspace') {
    result = string.slice(0, selectionStart - 1)
    + string.slice(selectionStart, textarea.textContent.length);
  }
  if (direction === 'Delete') {
    result = string.slice(0, selectionStart)
    + string.slice(selectionStart + 1, textarea.textContent.length);
  }
  return result;
}

function keyDownHandler(event) {
  const keyList = document.querySelectorAll('.key');
  event.preventDefault();
  if (!selectionStart) selectionStart = textarea.textContent.length;
  keyList.forEach((el) => {
    if (el.classList.contains(event.code)) {
      el.classList.add('active');
      if (event.code === 'Backspace') {
        textarea.textContent = slicer(textarea.textContent, event.code);
        selectionStart -= 1;
        textarea.selectionStart = selectionStart;
      } else if (event.code === 'Delete') {
        textarea.textContent = slicer(textarea.textContent, event.code);
        textarea.selectionStart = selectionStart;
      } else if (event.code === 'Enter') {
        textarea.textContent = `${textarea.textContent.slice(0, selectionStart)}\n${textarea.textContent.slice(selectionStart, textarea.textContent.length)}`;
        selectionStart += 1;
        textarea.selectionStart = selectionStart;
      } else if (event.code === 'Tab') {
        textarea.textContent += '\t';
        selectionStart += 1;
        textarea.selectionStart = selectionStart;
      } else if (event.key === 'Control' || event.key === 'Alt' || event.key === 'Meta') {
        textarea.textContent += '';
      } else if (event.key === 'Shift') {
        textarea.textContent += '';
      } else {
        textarea.textContent = textarea.textContent.slice(0, selectionStart) + el.textContent
        + textarea.textContent.slice(selectionStart, textarea.textContent.length);
        selectionStart += 1;
        textarea.selectionStart = selectionStart;
      }
    }
  });
  window.addEventListener('keyup', (e) => {
    keyList.forEach((el) => {
      if (el.classList.contains(e.code)) {
        el.classList.remove('active');
      }
    });
  });
}

window.addEventListener('keydown', keyDownHandler);

window.addEventListener('keydown', (event) => {
  console.log(event, { key: event.key, code: event.code });
  // if (event.ctrlKey && event.shiftKey) console.log('lang change');
});

function languageChanger(event) {
  if (event.ctrlKey && event.altKey) {
    if (language === 'eng') {
      language = 'rus';
      keysArray = rus;
    } else {
      language = 'eng';
      keysArray = eng;
    }
    keyboard.innerHTML = '';
    generateKeyboard();
  }
}

window.addEventListener('keydown', languageChanger);

function saveLanguage() {
  localStorage.setItem('language', language);
}

function getLanguage() {
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
    localStorage.removeItem('language');
    if (language === 'eng') keysArray = eng;
    else keysArray = rus;
    keyboard.innerHTML = '';
    generateKeyboard();
  }
}

window.addEventListener('unload', saveLanguage);
window.addEventListener('DOMContentLoaded', getLanguage);

function setSelectionStart() {
  selectionStart = textarea.selectionStart;
}

textarea.addEventListener('click', setSelectionStart);

function clickHandler(event) {
  if (event.target.classList.contains('key')) {
    let eventKey;
    let eventCode;
    keysArray.forEach((el) => {
      if (el.code === event.target.classList[1]) {
        eventKey = el.key;
        eventCode = el.code;
      }
    });
    const keyDownEvent = new KeyboardEvent('keydown', {
      key: eventKey,
      code: eventCode,
    });
    const keyUpEvent = new KeyboardEvent('keyup', {
      key: eventKey,
      code: eventCode,
    });
    keyDownHandler(keyDownEvent);
    window.dispatchEvent(keyUpEvent);
  }
}

keyboard.addEventListener('click', clickHandler);
