let xmlHttp = new XMLHttpRequest(),
    output = '',
    wrapper = document.querySelector('.wrapper'),
    num = 0,
    enable = false,
    enableAll = false,
    moveEnable = false,
    boolean__trues = 0,
    boolean__false = 0,
    checked,
    subElement,
    random,
    minutes = 0,
    restart = document.querySelector('.fixed__restart'),
    seconds = 0,
    numTrue = 0,
    numFalse = 0,
    randomX,
    randomY,
    fixTime = document.querySelector('.fixed__time'),
    fixAlphabits = document.querySelector('.fixed__alphabits '),
    fixBalls = document.querySelector('.fixed__balls'),
    fixBtn = document.querySelector('.fixed__btn');
xmlHttp.open('get', 'questions.json', true);
xmlHttp.send();
console.log(fixTime);
xmlHttp.onload = function () {
    let products = JSON.parse(this.responseText);
    console.log(products);
    randomX = Math.floor(Math.random() * 2);
    randomY = Math.floor(Math.random() * 2);
    products[randomX].forEach(item => {
        random = Math.ceil(Math.random() * 4);
        num++        //-----------------------------------------------------------------------------------------
        if (random == 1) {
            wrapper.innerHTML += `
            <div class="question__items">
            <div class="question__text">${num}. ${item.text}</div>
            <div class="question__variants">
                <div class="question__var_items" data="true">${item.trues}</div>
                <div class="question__var_items">${item.two}</div>
                <div class="question__var_items">${item.one}</div>
                <div class="question__var_items">${item.three}</div>
            </div>
            `
        } else if (random == 2) {
            wrapper.innerHTML += `
            <div class="question__items">
            <div class="question__text">${num}. ${item.text}</div>
            <div class="question__variants">
                <div class="question__var_items">${item.one}</div>
                <div class="question__var_items" data="true">${item.trues}</div>
                <div class="question__var_items">${item.three}</div>
                <div class="question__var_items">${item.two}</div>
            </div>`
        } else if (random == 3) {
            wrapper.innerHTML += `
            <div class="question__items">
            <div class="question__text">${num}. ${item.text}</div>
            <div class="question__variants">
                <div class="question__var_items">${item.two}</div>
                <div class="question__var_items">${item.one}</div>
                <div class="question__var_items" data="true">${item.trues} </div>
                <div class="question__var_items">${item.three}</div>
            </div>`
        }
        else if (random == 4) {
            wrapper.innerHTML += `
            <div class="question__items">
                <div class="question__text">${num}. ${item.text}</div>
                <div class="question__variants">
                    <div class="question__var_items">${item.two}</div>
                    <div class="question__var_items">${item.one}</div>
                    <div class="question__var_items">${item.three} </div>
                    <div class="question__var_items" data="true"> ${item.trues}
                </div>
            </div>`
        }
        if (num >= 11) return

    });
}

function clickFunc(e) {
    enable = e.target.hasAttribute('data');
    enableAll = e.target.classList.contains('question__var_items');
    moveEnable = e.target.closest('.question__items');
    if (!!moveEnable) {
        subEnable = moveEnable.querySelectorAll('.question__var_items')
        subEnable.forEach((item) => {
            item.classList.remove('checked')
        })
    }
    if (enableAll) {
        e.target.classList.toggle('checked')
    }
}
document.addEventListener('click', clickFunc);

function fixBtnFunc() {
    checked = document.querySelectorAll('.checked');
    checked.forEach((item) => {
        if (item.hasAttribute('data')) {
            item.style.background = "#00AB66";
            item.style.color = "white";
            numTrue += 8;
        } else {
            item.style.background = "#FF355E";
            item.style.color = "white";
        }
    })
    fixBalls.innerHTML = `${numTrue}`;
    if (numTrue > 70) fixAlphabits.innerHTML = 'A';
    else if (numTrue > 60) fixAlphabits.innerHTML = 'B';
    else if (numTrue > 50) fixAlphabits.innerHTML = 'C';
    else if (numTrue > 40) fixAlphabits.innerHTML = 'D';
    else fixAlphabits.innerHTML = 'F';
    minutes = 0;
    seconds = -1;
}
fixBtn.onclick = fixBtnFunc;

setInterval(() => {
    seconds += 1;
    if (seconds >= 59) {
        minutes += 1;
        seconds = 0;
    }
    if (seconds < 10 && minutes < 10) fixTime.innerHTML = `0${minutes}:0${seconds}`;
    else if (seconds < 10) fixTime.innerHTML = `${minutes}:0${seconds}`;
    else if (minutes < 10) fixTime.innerHTML = `0${minutes}:${seconds}`;
    else fixTime.innerHTML = `${minutes}:${seconds}`;

    if (minutes >= 10) {
        location.href = "index.html"
    }
}, 100);
console.log(window.innerWidth);
restart.onclick = function () {
    location.href = "index.html"
}


