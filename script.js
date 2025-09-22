document.addEventListener('DOMContentLoaded', () => {
    const materiaSelect = document.getElementById('materia-select');
    const topicoSelect = document.getElementById('topico-select');
    const filterButton = document.getElementById('filter-button');
    const shuffleAllButton = document.getElementById('shuffle-all-button');
    const flashcardContainer = document.getElementById('flashcard');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const currentCardIndexSpan = document.getElementById('current-card-index');
    const totalCardsSpan = document.getElementById('total-cards');

    let currentFlashcards = [];
    let currentIndex = 0;

    function initialize() {
        populateMaterias();
        currentFlashcards = [...allFlashcards];
        shuffleArray(currentFlashcards);
        updateFlashcard();
        updateNavigation();
    }

    function populateMaterias() {
        const materias = [...new Set(allFlashcards.map(card => card.materia))];
        materias.sort();
        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.textContent = materia;
            materiaSelect.appendChild(option);
        });
    }

    function populateTopicos(materia) {
        topicoSelect.innerHTML = '<option value="all">Todos os Tópicos</option>';
        if (materia === 'all') return;

        const topicos = [...new Set(allFlashcards.filter(card => card.materia === materia).map(card => card.topico))];
        topicos.sort();
        topicos.forEach(topico => {
            const option = document.createElement('option');
            option.value = topico;
            option.textContent = topico;
            topicoSelect.appendChild(option);
        });
    }

    function updateFlashcard() {
        if (currentFlashcards.length === 0) {
            flashcardContainer.querySelector('.flashcard-materia').textContent = '';
            flashcardContainer.querySelector('.flashcard-topico').textContent = '';
            flashcardContainer.querySelector('.flashcard-pergunta').textContent = 'Nenhum flashcard encontrado.';
            flashcardContainer.querySelector('.flashcard-resposta').textContent = '';
            return;
        }

        const card = currentFlashcards[currentIndex];
        flashcardContainer.querySelector('.flashcard-materia').textContent = card.materia;
        flashcardContainer.querySelector('.flashcard-topico').textContent = card.topico;
        flashcardContainer.querySelector('.flashcard-pergunta').textContent = card.pergunta;
        flashcardContainer.querySelector('.flashcard-resposta').textContent = card.resposta;
        flashcardContainer.classList.remove('flipped');
    }

    function updateNavigation() {
        currentCardIndexSpan.textContent = currentFlashcards.length > 0 ? currentIndex + 1 : 0;
        totalCardsSpan.textContent = currentFlashcards.length;
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    materiaSelect.addEventListener('change', () => {
        populateTopicos(materiaSelect.value);
    });

    filterButton.addEventListener('click', () => {
        const selectedMateria = materiaSelect.value;
        const selectedTopico = topicoSelect.value;

        currentFlashcards = allFlashcards.filter(card => {
            const materiaMatch = selectedMateria === 'all' || card.materia === selectedMateria;
            const topicoMatch = selectedTopico === 'all' || card.topico === selectedTopico;
            return materiaMatch && topicoMatch;
        });

        currentIndex = 0;
        shuffleArray(currentFlashcards);
        updateFlashcard();
        updateNavigation();
    });

    shuffleAllButton.addEventListener('click', () => {
        materiaSelect.value = 'all';
        topicoSelect.value = 'all';
        currentFlashcards = [...allFlashcards];
        shuffleArray(currentFlashcards);
        currentIndex = 0;
        updateFlashcard();
        updateNavigation();
    });

    flashcardContainer.addEventListener('click', () => {
        flashcardContainer.classList.toggle('flipped');
    });

    prevButton.addEventListener('click', () => {
        if (currentFlashcards.length === 0) return;
        currentIndex = (currentIndex - 1 + currentFlashcards.length) % currentFlashcards.length;
        updateFlashcard();
        updateNavigation();
    });

    nextButton.addEventListener('click', () => {
        if (currentFlashcards.length === 0) return;
        currentIndex = (currentIndex + 1) % currentFlashcards.length;
        updateFlashcard();
        updateNavigation();
    });

    if (typeof allFlashcards !== 'undefined' && allFlashcards.length > 0) {
        initialize();
    } else {
        console.error('O arquivo flashcards.js não foi carregado ou está vazio.');
    }
});


