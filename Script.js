function clearDisplay() {
    document.getElementById('display').value = '';
}

function deleteChar() {
    var display = document.getElementById('display').value;
    document.getElementById('display').value = display.slice(0, -1);
}

function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function calculate() {
    var display = document.getElementById('display').value;
    try {
        display = display.replace(/sin\(/g, 'Math.sin(');
        display = display.replace(/cos\(/g, 'Math.cos(');
        display = display.replace(/tan\(/g, 'Math.tan(');
        var result = eval(display);
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}
