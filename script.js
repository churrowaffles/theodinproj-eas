var isDrawing = false;
var penColor;

document.addEventListener("DOMContentLoaded", function() {
    penColor = getComputedStyle(document.body).getPropertyValue('--main-bg-color');
    slider = document.querySelector('.slider');
    sliderDisplay = document.querySelector('.slider-display');
    updateSlider(slider.value);

    slider.addEventListener("input", (e) => {
        updateSlider(e.target.value)
    });
})

function enableDrawing() {
    // Controls mouse activity to draw in the sketch box
    window.addEventListener("mousedown", () => isDrawing = true)
    window.addEventListener("mouseup", () => isDrawing = false)
    smallBox = document.querySelectorAll('.small-box')
    smallBox.forEach(e => {
        e.addEventListener('mouseover', () => {
            if (isDrawing == true) {
                e.style.backgroundColor = penColor;
            }
        })
    });

    // Prevents default dragging effect within the sketch box
    outerBox = document.querySelector('.outer-box')
    outerBox.addEventListener("mousedown", (e) =>
        e.preventDefault()
    )
}


function createInnerBox(n) {
    // Create Boxes based on size
    innerBox = document.createElement('div')
    innerBox.classList.add('inner-box')
    for (i = 0; i < n; i++) {
        row = document.createElement('div')
        row.classList.add('row')
        for (j = 0; j < n; j++) {
            smallBox = document.createElement('div')
            smallBox.classList.add('small-box')
            row.appendChild(smallBox)
        }
        innerBox.appendChild(row)
    }
    outerBox = document.querySelector('.outer-box')
    outerBox.innerHTML = ''
    outerBox.appendChild(innerBox)
    enableDrawing();
}


function updateSlider(value) {
    if (value < 1) {
        value = 1
    } else if (value > 50) {
        value = 50
    }
    sliderDisplay.textContent = value;
    createInnerBox(value);
}