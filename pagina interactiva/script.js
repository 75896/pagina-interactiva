// Manejo del arrastre y soltar de bloques
const blocks = document.querySelectorAll('.block');
const dropArea = document.querySelector('.drop-area');
const sections = document.querySelectorAll('.section');

// Añadir eventos de arrastre a cada bloque
blocks.forEach(block => {
    block.addEventListener('dragstart', dragStart);
    block.addEventListener('dragend', dragEnd);
});

// Añadir eventos a la zona de soltado
dropArea.addEventListener('dragover', dragOver);
dropArea.addEventListener('dragenter', dragEnter);
dropArea.addEventListener('dragleave', dragLeave);
dropArea.addEventListener('drop', drop);

// Funciones para el manejo de eventos de arrastre
function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.classList.add('hide');
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove('hide');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
}

function dragLeave(e) {
    e.target.classList.remove('hovered');
}

function drop(e) {
    e.preventDefault();
    e.target.classList.remove('hovered');
    const id = e.dataTransfer.getData('text/plain');
    const draggable = document.getElementById(id);
    e.target.appendChild(draggable);

    // Verificar si todos los bloques han sido movidos
    checkIfAllBlocksDropped();
}

function checkIfAllBlocksDropped() {
    const droppedBlocks = dropArea.querySelectorAll('.block');
    
    if (droppedBlocks.length === blocks.length) {
        // Todos los bloques han sido arrastrados y soltados
        transformToImage();
        setTimeout(() => {
            transitionToNextSection('drag-section', 'quiz1-section');
        }, 1000); // Esperar un segundo para mostrar la imagen antes de la transición
    }
}

function transformToImage() {
    // Reemplazar el contenido de la zona de destino con una imagen
    dropArea.innerHTML = '<img src="https://via.placeholder.com/300x150.png?text=IA+Creada!" alt="IA Creada" />';
    dropArea.style.border = 'none';  // Eliminar el borde de la zona de soltado
}

function transitionToNextSection(currentSectionId, nextSectionId) {
    document.getElementById(currentSectionId).classList.add('hidden'); // Ocultar la sección actual
    document.getElementById(nextSectionId).classList.remove('hidden'); // Mostrar la siguiente sección
}

// Manejo del quiz
function checkAnswer(questionNumber, answer, currentSectionId = '', nextSectionId = '') {
    const resultDiv = document.getElementById(`result${questionNumber}`);
    if (answer === 'correct') {
        resultDiv.innerText = "¡Correcto!";
        resultDiv.style.color = 'green';
        if (currentSectionId && nextSectionId) {
            setTimeout(() => {
                transitionToNextSection(currentSectionId, nextSectionId);
            }, 1000); // Esperar un segundo antes de la transición a la siguiente sección
        }
    } else {
        resultDiv.innerText = "Incorrecto, intenta de nuevo.";
        resultDiv.style.color = 'red';
    }
}

function restartQuiz() {
    // Reiniciar el quiz al estado inicial
    sections.forEach(section => section.classList.add('hidden'));
    document.getElementById('welcome-section1').classList.remove('hidden');

    // Reiniciar el contenido arrastrable y respuestas del quiz
    dropArea.innerHTML = 'Arrastra los bloques a esta área para crear una IA';
    dropArea.style.border = '2px dashed #4CAF50';
    blocks.forEach(block => {
        block.classList.remove('hide');
        document.querySelector('.block-container').appendChild(block);
    });

    // Reiniciar los resultados de los quizzes
    document.querySelectorAll('[id^="result"]').forEach(result => {
        result.innerText = '';
    });
}
