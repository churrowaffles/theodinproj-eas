var isDrawing = false;
var penColor;

document.addEventListener("DOMContentLoaded", function() {
    // Slider to allow users to decide the dimensions of the sketchbox
    slider = document.querySelector('input[type=range]');
    sliderDisplay = document.querySelector('.slider-display');
    updateSlider(slider.value);
    slider.addEventListener("input", (e) => {
        updateSlider(e.target.value)
    });


    options = document.querySelectorAll('.option-buttons input');
    selectDrawingOption(options);

    // Clear button for users to reset sketchbox
    clear = document.querySelector('.clear-input');
    clear.addEventListener('click', () => {
        updateSlider(slider.value);
    })

    // Color selection for users to choose pen color
    penColor = getComputedStyle(document.body).getPropertyValue('--main-bg-color');
    color = document.querySelector('input[type=color]');
    color.value = penColor;
    color.addEventListener("input", (e) => {
        if (document.querySelector('input[type=button][value=Color]').classList.contains('option-on')) {
            penColor = e.target.value;
        }
    });
})


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

function enableDrawing() {
    // Controls mouse activity to draw in the sketch box
    window.addEventListener("mousedown", () => isDrawing = true);
    window.addEventListener("mouseup", () => isDrawing = false);
    smallBox = document.querySelectorAll('.small-box');
    smallBox.forEach(box => {
        box.addEventListener('mousedown', () => {
            box.style.backgroundColor = penColor;
        })
        box.addEventListener('mousemove', () => {
            if (isDrawing == true) {
                box.style.backgroundColor = penColor;
            }
        })
    })
    
    // Prevents default dragging effect within the sketch box
    outerBox = document.querySelector('.outer-box')
    outerBox.addEventListener("mousedown", (e) =>
        e.preventDefault()
    )
}


function updateSlider(value) {
    if (value < 1) {
        value = 1
    } else if (value > 50) {
        value = 50
    }
    sliderDisplay.textContent = value + ' x ' + value;
    createInnerBox(value);
}


function selectDrawingOption(options) {
    options.forEach(option => {
        option.addEventListener("click", (e) => {
            options.forEach(option => option.classList.remove('option-on'));
            e.target.classList.add('option-on');
            if (e.target.value == 'Color') {
                penColor = document.querySelector('input[type=color]').value;
            } else if (e.target.value == 'Eraser') {
                penColor = 'white';
            }
        })
    })
}