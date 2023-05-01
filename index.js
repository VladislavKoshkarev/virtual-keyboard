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
let keysArray = eng;

// first row: 0-13, second row: 14-28, third row: 29-41, fourth row: 42-54, fifth row: 55-

class Key {
  constructor(keyObj) {
    this.markup = document.createElement('div');
    this.markup.className = `key ${keyObj.code}`;
    this.markup.insertAdjacentHTML('afterbegin', `<div class="regular">${keyObj.key}</div>
    <div class="shift hide">${keyObj.key_shift}</div>
    <div class="caps hide">${keyObj.key_caps}</div>
    <div class="caps-shift hide">${keyObj.key_caps_shift}</div>`);
  }

  getMarkup() {
    return this.markup;
  }
}

function generateRow(minIndex, maxIndex) {
  const row = document.createElement('div');
  row.className = 'row';
  for (let i = minIndex; i <= maxIndex; i += 1) {
    const key = new Key(keysArray[i]);
    row.append(key.getMarkup());
  }
  return row;
}

function generateKeyboard(keyType = 'key') {
  // const keyType = 'key';
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
  generateKeyboard();
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

let isCaps = false;
let isShift = false;

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
        isShift = true;
        if (isCaps) {
          keyList.forEach((key) => {
            key.children[3].classList.remove('hide');
            key.firstChild.classList.add('hide');
            key.children[2].classList.add('hide');
            key.children[1].classList.add('hide');
          });
          window.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
              isShift = false;
              if (isCaps) {
                keyList.forEach((key) => {
                  key.children[2].classList.remove('hide');
                  key.firstChild.classList.add('hide');
                  key.children[1].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              } else {
                keyList.forEach((key) => {
                  key.firstChild.classList.remove('hide');
                  key.children[2].classList.add('hide');
                  key.children[1].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              }
            }
          });
        } else {
          keyList.forEach((key) => {
            key.firstChild.classList.add('hide');
            key.children[2].classList.add('hide');
            key.children[3].classList.add('hide');
            key.children[1].classList.remove('hide');
          });
          window.addEventListener('keyup', (e) => {
            if (e.key === 'Shift') {
              isShift = false;
              if (isCaps) {
                keyList.forEach((key) => {
                  key.children[2].classList.remove('hide');
                  key.firstChild.classList.add('hide');
                  key.children[1].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              } else {
                keyList.forEach((key) => {
                  key.firstChild.classList.remove('hide');
                  key.children[1].classList.add('hide');
                  key.children[2].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              }
            }
          });
        }
      } else if (event.key === 'CapsLock') {
        isCaps = true;
        if (isShift) {
          keyList.forEach((key) => {
            key.children[3].classList.remove('hide');
            key.firstChild.classList.add('hide');
            key.children[2].classList.add('hide');
            key.children[1].classList.add('hide');
          });
          window.addEventListener('keyup', (e) => {
            if (e.key === 'CapsLock') {
              isCaps = false;
              if (isShift) {
                keyList.forEach((key) => {
                  key.children[1].classList.remove('hide');
                  key.firstChild.classList.add('hide');
                  key.children[2].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              } else {
                keyList.forEach((key) => {
                  key.firstChild.classList.remove('hide');
                  key.children[1].classList.add('hide');
                  key.children[2].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              }
            }
          });
        } else {
          keyList.forEach((key) => {
            key.firstChild.classList.add('hide');
            key.children[1].classList.add('hide');
            key.children[3].classList.add('hide');
            key.children[2].classList.remove('hide');
          });
          window.addEventListener('keyup', (e) => {
            if (e.key === 'CapsLock') {
              console.log(event);
              isCaps = false;
              if (isShift) {
                keyList.forEach((key) => {
                  key.children[1].classList.remove('hide');
                  key.firstChild.classList.add('hide');
                  key.children[2].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              } else {
                keyList.forEach((key) => {
                  key.firstChild.classList.remove('hide');
                  key.children[1].classList.add('hide');
                  key.children[2].classList.add('hide');
                  key.children[3].classList.add('hide');
                });
              }
            }
          });
        }
      } else {
        console.log(el.textContent);
        textarea.textContent = textarea.textContent.slice(0, selectionStart)
        + el.querySelector('div:not(.hide)').textContent
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
  } else {
    language = 'eng';
    keysArray = eng;
  }
  keyboard.innerHTML = '';
  generateKeyboard();
}

window.addEventListener('unload', saveLanguage);
window.addEventListener('DOMContentLoaded', getLanguage);

function setSelectionStart() {
  selectionStart = textarea.selectionStart;
}

textarea.addEventListener('click', setSelectionStart);

function clickHandler(event) {
  if (event.target.parentElement.classList.contains('key')) {
    let eventKey;
    let eventCode;
    keysArray.forEach((el) => {
      if (el.code === event.target.parentElement.classList[1]) {
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
    if (eventKey === 'CapsLock') {
      keyDownHandler(keyDownEvent);
      document.querySelector('.CapsLock').addEventListener('click', (ev) => {
        ev.stopPropagation();
        window.dispatchEvent(keyUpEvent);
      });
    } else {
      keyDownHandler(keyDownEvent);
      window.dispatchEvent(keyUpEvent);
    }
  }
}

keyboard.addEventListener('click', clickHandler);
