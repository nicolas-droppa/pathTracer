const displayArea = document.getElementById('displayArea');

function renderGround(rows, columns) {
    displayArea.innerHTML = "";

    for (let i = 0; i < rows; i++) {
        let row = document.createElement('div');
        row.classList.add('ground-row');
        row.style.display = "flex";

        for (let j = 0; j < columns; j++) {
            let square = document.createElement('div');
            square.classList.add('ground-square');
            square.dataset.row = i;
            square.dataset.col = j;
            row.appendChild(square);
        }

        displayArea.appendChild(row);
    }
}

renderGround(10, 10);