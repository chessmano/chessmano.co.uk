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
        display = display.replace(/√\(/g, 'Math.sqrt(');
        display = display.replace(/π/g, 'Math.PI');
        display = display.replace(/e/g, 'Math.E');
        display = display.replace(/log\(/g, 'Math.log10(');
        display = display.replace(/ln\(/g, 'Math.log(');
        display = display.replace(/exp\(/g, 'Math.exp(');
        display = display.replace(/sin\(/g, 'Math.sin(');
        display = display.replace(/cos\(/g, 'Math.cos(');
        display = display.replace(/tan\(/g, 'Math.tan(');
        display = display.replace(/\^/g, '**');
        var result = eval(display);
        document.getElementById('display').value = result;
    } catch (e) {
        document.getElementById('display').value = 'Error';
    }
}
