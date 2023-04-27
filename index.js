const wrapper = document.createElement('div');
const title = document.createElement('p');
title.className = 'title';
title.textContent = 'Virtual Keyboard';
const textarea = document.createElement('textarea');
textarea.className = 'textarea';
const keyboard = document.createElement('div');
keyboard.className = 'keyboard';
const info = document.createElement('p');
info.className= 'info';
info.textContent = 'Создано в операционной системе MacOS.';

function generateDOM() {
    wrapper.append(title)
    wrapper.append(textarea)
    wrapper.append(keyboard)
    wrapper.append(info)
    document.body.append(wrapper)
}

generateDOM()