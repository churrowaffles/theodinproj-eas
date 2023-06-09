var isDrawing = false;
var hexValues = "0123456789ABCDEF";
var hexSymbol = '#';

document.addEventListener("DOMContentLoaded", function() {
    console.log('loaded')
    // Slider to allow users to decide the dimensions of the sketchbox
    slider = document.querySelector('input[type=range]');
    sliderDisplay = document.querySelector('.slider-display');
    updateSlider(slider.value);
    slider.addEventListener("input", (e) => {
        updateSlider(e.target.value)
    });

    // Toggling between Default/Color/Eraser/Rainbow
    options = document.querySelectorAll('.option-buttons input');
    toggleDrawingOption(options);

    // Set default pen color as Yellow
    document.querySelector('input[type=color]').value = '#FFFF00';

    // Toggle button for users to turn on and off sketch lines
    toggleGrid = document.querySelector('.toggle-input');
    toggleGrid.addEventListener('click', () => {
        document.querySelectorAll('.small-box').forEach(box => box.classList.toggle('grid-lines'))
    })

    // Clear button for users to reset sketchbox
    clear = document.querySelector('.clear-input');
    clear.addEventListener('click', () => {
        document.querySelectorAll('.small-box').forEach(box => box.style.backgroundColor = 'white')
    })

})


function updateSlider(value) {
    if (value < 1) {
        value = 1
    } else if (value > 50) {
        value = 50
    }
    sliderDisplay.textContent = value + ' x ' + value;
    createInnerBox(value);
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
            smallBox.classList.add('grid-lines')
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
            box.style.backgroundColor = getPenColor();
        })
        box.addEventListener('mouseover', () => {
            if (isDrawing == true) {
                box.style.backgroundColor = getPenColor();
            }
        })
    })
    
    // Prevents default dragging effect within the sketch box
    outerBox = document.querySelector('.outer-box')
    outerBox.addEventListener("mousedown", (e) =>
        e.preventDefault()
    )
}


function toggleDrawingOption(options) {
    options.forEach(option => {
        option.addEventListener("click", (e) => {
            options.forEach(option => option.classList.remove('option-on'));
            e.target.classList.add('option-on');
        })
    })
}


function getPenColor() {
    selected = document.querySelector('.option-on').value;
    if (selected == 'Eraser') {
        return 'white';
    } else if (selected == 'Rainbow') {
        return getRandomColor();
    } else if (selected == 'Color') {
        return document.querySelector('input[type=color]').value;
    } else {
        return getComputedStyle(document.body).getPropertyValue('--main-bg-color');
    }
}


function getRandomColor() {
    let colorCode = hexSymbol;
    for (i = 0; i < 6; i++) {
        random = Math.floor(Math.random() * 16)
        colorCode += hexValues[random];
    }
    return colorCode;
}