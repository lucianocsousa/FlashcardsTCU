document.addEventListener('DOMContentLoaded', () => {
    const materiaSelect = document.getElementById('materia-select');
    const topicoSelect = document.getElementById('topico-select');
    const filterButton = document.getElementById('filter-button');
    const shuffleAllButton = document.getElementById('shuffle-all-button');
    const flashcardElement = document.getElementById('flashcard');
    const flashcardMateria = flashcardElement.querySelector('.flashcard-materia');
    const flashcardTopico = flashcardElement.querySelector('.flashcard-topico');
    const flashcardPergunta = flashcardElement.querySelector('.flashcard-pergunta');
    const flashcardResposta = flashcardElement.querySelector('.flashcard-resposta');
    const currentCardIndexSpan = document.getElementById('current-card-index');
    const totalCardsSpan = document.getElementById('total-cards');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    let currentFlashcards = [];
    let currentIndex = 0;

    // Populate Materia and Topico filters
    function populateFilters() {
        const materias = new Set();
        const topicos = new Set();

        allFlashcards.forEach(card => {
            materias.add(card.materia);
            topicos.add(card.topico);
        });

        materiaSelect.innerHTML = '<option value="all">Todas as Matérias</option>';
        materias.forEach(materia => {
            const option = document.createElement('option');
            option.value = materia;
            option.textContent = materia;
            materiaSelect.appendChild(option);
        });

        topicoSelect.innerHTML = '<option value="all">Todos os Tópicos</option>';
        topicos.forEach(topico => {
            const option = document.createElement('option');
            option.value = topico;
            option.textContent = topico;
            topicoSelect.appendChild(option);
        });
    }

    // Display current flashcard
    function displayFlashcard() {
        if (currentFlashcards.length === 0) {
            flashcardMateria.textContent = '';
            flashcardTopico.textContent = '';
            flashcardPergunta.textContent = 'Nenhum flashcard encontrado.';
            flashcardResposta.textContent = '';
            currentCardIndexSpan.textContent = 0;
            totalCardsSpan.textContent = 0;
            return;
        }

        const card = currentFlashcards[currentIndex];
        flashcardMateria.textContent = card.materia;
        flashcardTopico.textContent = card.topico;
        flashcardPergunta.textContent = card.pergunta;
        flashcardResposta.textContent = card.resposta;
        currentCardIndexSpan.textContent = currentIndex + 1;
        totalCardsSpan.textContent = currentFlashcards.length;
        flashcardElement.classList.remove('flipped');
    }

    // Filter flashcards
    filterButton.addEventListener('click', () => {
        const selectedMateria = materiaSelect.value;
        const selectedTopico = topicoSelect.value;

        currentFlashcards = allFlashcards.filter(card => {
            const materiaMatch = selectedMateria === 'all' || card.materia === selectedMateria;
            const topicoMatch = selectedTopico === 'all' || card.topico === selectedTopico;
            return materiaMatch && topicoMatch;
        });

        currentIndex = 0;
        displayFlashcard();
    });

    // Shuffle all flashcards
    shuffleAllButton.addEventListener('click', () => {
        currentFlashcards = [...allFlashcards]; // Reset to all flashcards
        for (let i = currentFlashcards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentFlashcards[i], currentFlashcards[j]] = [currentFlashcards[j], currentFlashcards[i]];
        }
        currentIndex = 0;
        displayFlashcard();
    });

    // Flip flashcard
    flashcardElement.addEventListener('click', () => {
        flashcardElement.classList.toggle('flipped');
    });

    // Navigation
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            displayFlashcard();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentIndex < currentFlashcards.length - 1) {
            currentIndex++;
            displayFlashcard();
        }
    });

    // Initial load
    populateFilters();
    currentFlashcards = [...allFlashcards]; // Initially show all flashcards
    displayFlashcard();
});

