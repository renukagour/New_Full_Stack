const box = document.querySelectorAll('.block');
console.log(box);
console.log("box length", box.length);

let turn = 1;
let currentPlayer;
const show = (idx) => {
    if (box[idx].textContent === 'X' || box[idx].textContent == 'O') {
        alert('already checked try another box');
        return;
    }
    if (turn === 1) {
        box[idx].innerHTML = 'X';
        currentPlayer = 'X';
        turn = 2;
    }
    else {
        box[idx].innerHTML = 'O';
        currentPlayer = 'O';
        turn = 1;
    }

    // console.log(box[idx].textContent);
    console.log(`${idx} number box clicked`);

    if (box[0].textContent !== '' && box[0].textContent === box[1].textContent && box[1].textContent == box[2].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[3].textContent !== '' && box[3].textContent === box[4].textContent && box[5].textContent == box[4].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[6].textContent !== '' && box[6].textContent === box[7].textContent && box[7].textContent == box[8].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[0].textContent !== '' && box[0].textContent === box[4].textContent && box[4].textContent == box[8].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[6].textContent !== '' && box[6].textContent === box[4].textContent && box[4].textContent == box[2].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[0].textContent !== '' && box[0].textContent === box[3].textContent && box[3].textContent == box[6].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[1].textContent !== '' && box[1].textContent === box[4].textContent && box[4].textContent == box[7].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    } else if (box[2].textContent !== '' && box[2].textContent === box[5].textContent && box[5].textContent == box[8].textContent) {
        console.log(`player ${currentPlayer} win`);
        alert(`player ${currentPlayer} win`);
        clearAll();
        return;
    }

    if ([...box].every(b => b.textContent !== '')) {
        console.log(`It is Draw`);
        alert(`It is draw`);
        clearAll();
    }

};

function clearAll() {
    for (let i = 0; i < box.length; i++) {
        box[i].innerHTML = '';

    }
}

document.getElementById('reset').addEventListener('click', clearAll);


for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', () => show(i));

}

// const box = document.querySelectorAll('.block');
// let turn = 1;

// const winPatterns = [
//     [0, 1, 2], [3, 4, 5], [6, 7, 8],
//     [0, 3, 6], [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6]
// ];

// function checkWin() {
//     return winPatterns.some(([a, b, c]) => {
//         return box[a].textContent !== '' &&
//                box[a].textContent === box[b].textContent &&
//                box[b].textContent === box[c].textContent;
//     });
// }

// .some() is another array method(like find, but returns true / false instead of the element) — 
// checks if any pattern matches.This replaces all 8 of your if/else if blocks with one loop.

// function checkDraw() {
//     return [...box].every(b => b.textContent !== '');
// }

// function clearAll() {
//     for (let i = 0; i < box.length; i++) {
//         box[i].innerHTML = '';
//     }
// }

// const show = (idx) => {
//     if (box[idx].textContent === 'x' || box[idx].textContent === 'o') {
//         alert('already checked, try another box');
//         return;
//     }

//     const currentPlayer = turn === 1 ? 'x' : 'o';
//     box[idx].innerHTML = currentPlayer;
//     turn = turn === 1 ? 2 : 1;

//     console.log(`${idx} box clicked by ${currentPlayer}`);

//     if (checkWin()) {
//         alert(`player ${currentPlayer} wins`);
//         clearAll();
//         return;
//     }

//     if (checkDraw()) {
//         alert(`it's a draw`);
//         clearAll();
//         return;
//     }
// };

// for (let i = 0; i < box.length; i++) {
//     box[i].addEventListener('click', () => show(i));
// }


