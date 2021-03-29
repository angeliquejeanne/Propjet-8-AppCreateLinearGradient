const inputColor = document.querySelectorAll('.inputColor');
const inputRange = document.querySelector('.inputRange');
const button = document.querySelectorAll('button');
const bgColor = document.body;
const containerColors = document.querySelector('.containerColors');
const span = document.querySelector('span');
const buttonRandom = document.querySelector('.random');

// Démarrage
let colorValue = ['#373D24', '#989888'];
let incline = 45;
let index = 3;
inputColor[0].value = colorValue[0];
inputColor[1].value = colorValue[1];
inputColor[0].style.background = colorValue[0];
inputColor[1].style.background = colorValue[1];
bgColor.style.background = `linear-gradient(${incline}deg, ${colorValue})`;


// incline

inputRange.addEventListener('input', (e) => {

    incline = e.target.value * 3.6;
    bgColor.style.background = `linear-gradient(${incline}deg, ${colorValue})`;

})


// Rajout / Suppression

button.forEach(btn => {
    btn.addEventListener('click', addRemove);
})


function addRemove(e){

    span.innerText = '';
    const allInputs = document.querySelectorAll('.inputColor');
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    // console.log(randomColor);

    if(e.target.className === "add"){

        if(allInputs.length > 8){
            return;
        }

        const nvCouleur = document.createElement('input');
        nvCouleur.setAttribute('class', 'inputColor');
        nvCouleur.setAttribute('data-index', index);
        nvCouleur.setAttribute('maxlength', 7);
        nvCouleur.value = `#${randomColor.toUpperCase()}`;
        nvCouleur.style.background = `#${randomColor}`;
        containerColors.appendChild(nvCouleur);

        colorValue.push(`#${randomColor.toUpperCase()}`)

        // Maj du bgColor
        bgColor.style.background = `linear-gradient(${incline}deg, ${colorValue})`;
        index++;
    } 
    else if(e.target.className === "minus"){
        if(colorValue.length === 2){
            span.innerText = 'You need at least two colors !'
        } else {
            colorValue.pop();
            allInputs[allInputs.length - 1].remove();
            index--;
            bgColor.style.background = `linear-gradient(${incline}deg, ${colorValue})`;
        }
    }

    // MAJ DES INPUTS
    allInputs.forEach(inp => {
        inp.addEventListener('input', boldColors);
    });



}

// INPUTS  DE BASE
inputColor.forEach(inp => {
    inp.addEventListener('input', boldColors);
});

function boldColors(e){

    let currentIndex = e.target.getAttribute('data-index');
    e.target.value = e.target.value.toUpperCase();
    colorValue[currentIndex - 1] = e.target.value.toUpperCase();
    e.target.style.background = colorValue[currentIndex - 1];
    bgColor.style.background = `linear-gradient(${incline}deg, ${colorValue})`;
}

// Couleurs aléatoires

buttonRandom.addEventListener('click', () => {

    const inputs = document.querySelectorAll('.inputColor');
    for(i = 0; i < colorValue.length; i++) {
        colorValue[i] = `#${Math.floor(Math.random()*16777215).toString(16)}`;
        inputs[i].value = colorValue[i].toUpperCase();
        inputs[i].style.background = colorValue[i].toUpperCase();
        bgColor.style.background = `linear-gradient(${incline}deg, ${colorValue})`;

    }

})

