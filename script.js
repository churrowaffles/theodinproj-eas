document.addEventListener("DOMContentLoaded", function() {
    createboxes(16)
    smallBox = document.querySelectorAll('.small-box')
    smallBox.forEach(e => {
        e.addEventListener('mouseover', () => {
            e.style.backgroundColor = 'blue';
        })
    });
})

function createboxes(n) {
    innerBox = document.createElement('div')
    innerBox.classList.add('inner-box')
    for (i = 0; i < n; i++) {
        row = document.createElement('div')
        row.classList.add('row')
        console.log(i)
        for (j = 0; j < n; j++) {
            smallBox = document.createElement('div')
            smallBox.classList.add('small-box')
            row.appendChild(smallBox)
        }
        innerBox.appendChild(row)
    }
    outerBox = document.querySelector('.outer-box')
    outerBox.appendChild(innerBox)
}