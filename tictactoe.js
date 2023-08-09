const inputs = document.getElementsByClassName('name');
const cells = document.querySelectorAll('.cell');
const title = document.getElementById('title');
let PlayerX = 'X';
let PlayerO = 'O';
let currentPlayer = PlayerX;

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keydown', (e) => {
        let val = inputs[i].value.trim();
        if (e.key === 'Enter') {
            e.preventDefault(); 
            if (val) {
                inputs[i].readOnly = true;
            } else {
                alert('Please enter name');
            }
        }
    });
}

const checkWin = (currentPlayer) => {
    const winningCombinations = [
        [cells[0], cells[1], cells[2]],  
        [cells[3], cells[4], cells[5]],  
        [cells[6], cells[7], cells[8]],  
        [cells[0], cells[3], cells[6]],  
        [cells[1], cells[4], cells[7]],  
        [cells[2], cells[5], cells[8]],  
        [cells[0], cells[4], cells[8]],  
        [cells[2], cells[4], cells[6]]   
    ];

    for (let combination of winningCombinations) {
        if (combination[0].innerText === currentPlayer &&
            combination[1].innerText === currentPlayer &&
            combination[2].innerText === currentPlayer) {
            return true;
        }
    }
    return false;
};

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', (e) => {
        let val = inputs[currentPlayer === PlayerX ? 0 : 1].value.trim();
        if (val) {
            if (e.target.innerText === '') {
                e.target.innerText = currentPlayer;
                if (checkWin(currentPlayer)) {
                    title.innerText = `Player ${val} wins!`;
                    currentPlayer = PlayerX;  
                } else {
                    currentPlayer = currentPlayer === PlayerX ? PlayerO : PlayerX;
                }
            }
        }
    });
}

const restartButton = document.querySelector('.restart button');

restartButton.addEventListener('click', () => {
    cells.forEach(cell => cell.innerText = '');
    title.innerText = `TIC TAC TOE`;
    currentPlayer = PlayerX;
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].readOnly = false;
        inputs[i].value = '';
    }
});


