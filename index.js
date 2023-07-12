// JavaScript
let calcButtons = document.querySelectorAll('.filas button');
let calcDisplay = document.querySelector('#pantalla-numerica');
let calcResultDisplay = document.querySelector('#pantalla-numerica-resultados');
let angleMode = 'DEG';
let drgButtons = document.querySelectorAll('.drg-validacion .btn');

calcButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    if (this.id === 'C') {
      calcDisplay.value = '';
    } else if (this.id === 'seno' || this.id === 'coseno' || this.id === 'tangente') {
      calcDisplay.value += this.textContent.slice(0, -3) + '(';
    } else if (this.id === 'igual') {
      let expression = calcDisplay.value;
      let result = evaluateExpression(expression);
      calcResultDisplay.value = result;
    } else if (this.id === 'eliminar') {
      calcDisplay.value = calcDisplay.value.slice(0, -1);
    } else if (this.id === 'drg') {
      if (angleMode === 'DEG') {
        angleMode = 'RAD';
        drgButtons[0].classList.remove('active');
        drgButtons[1].classList.add('active');
      } else if (angleMode === 'RAD') {
        angleMode = 'GRAD';
        drgButtons[1].classList.remove('active');
        drgButtons[2].classList.add('active');
      } else {
        angleMode = 'DEG';
        drgButtons[2].classList.remove('active');
        drgButtons[0].classList.add('active');
      }
    } else {
      calcDisplay.value += this.textContent;
    }
  });
});

document.addEventListener('keydown', function(event) {
  if (event.key >= 0 && event.key <= 9) {
    calcDisplay.value += event.key;
  }
});

function evaluateExpression(expression) {
  try {
    expression = expression.replace(/Sin\(/g, `Math.sin(${angleMode === 'DEG' ? 'degToRad(' : angleMode === 'GRAD' ? 'gradToRad(' : ''}`);
    expression = expression.replace(/Cos\(/g, `Math.cos(${angleMode === 'DEG' ? 'degToRad(' : angleMode === 'GRAD' ? 'gradToRad(' : ''}`);
    expression = expression.replace(/Tan\(/g, `Math.tan(${angleMode === 'DEG' ? 'degToRad(' : angleMode === 'GRAD' ? 'gradToRad(' : ''}`);
    expression = expression.replace(/π/g, 'Math.PI');
    expression = expression.replace(/MOD/g, '%');
    expression = expression.replace(/√\(/g, 'Math.sqrt(');
    let result = eval(expression);
    return result;
  } catch (error) {
    return 'Error';
  }
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function gradToRad(gradians) {
  return gradians * (Math.PI / 200);
}
expression = expression.replace(/√\(/g, 'Math.sqrt(');