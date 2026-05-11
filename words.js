const container =
    document.getElementById("wordsContainer");

const savedWords =
    JSON.parse(localStorage.getItem("savedWords")) || [];

const dictionary =
    JSON.parse(localStorage.getItem("dictionary")) || {};

/* =========================
   RENDER WORDS
========================= */

function renderWords() {

    container.innerHTML = "";

    if (savedWords.length === 0) {

        container.innerHTML = `
            <p class="empty">
                Нет сохранённых слов
            </p>
        `;

        return;

    }

    savedWords.forEach(word => {

        const translation =
            dictionary[word] || "...";

        const card =
            document.createElement("div");

        card.className = "word-card";

        card.innerHTML = `

            <div>

                <div class="word-title">
                    ${word}
                </div>

                <div class="word-translation">
                    ${translation}
                </div>

            </div>

            <div class="word-actions">

                <button onclick="speakWord('${word}')">
                    🔊
                </button>

                <button onclick="removeWord('${word}')">
                    ❌
                </button>

            </div>

        `;

        container.appendChild(card);

    });

}

/* =========================
   SPEAK
========================= */

function speakWord(word) {

    const utterance =
        new SpeechSynthesisUtterance(word);

    utterance.lang = "pl-PL";

    speechSynthesis.speak(utterance);

}

/* =========================
   REMOVE WORD
========================= */

function removeWord(word) {

    const updated =
        savedWords.filter(w => w !== word);

    localStorage.setItem(
        "savedWords",
        JSON.stringify(updated)
    );

    location.reload();

}

renderWords();