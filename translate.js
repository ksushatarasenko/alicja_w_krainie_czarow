// document.querySelectorAll(".text p").forEach(p => {

//     p.addEventListener("click", async (e) => {

//         const selection = window.getSelection().toString();

//         if (selection.length > 0) return;

//         const word = getWordAtPoint(e);

//         if (!word) return;

//         showPopup(word, e.pageX, e.pageY);

//     });

// });

// function getWordAtPoint(e) {

//     const range =
//         document.caretRangeFromPoint(e.clientX, e.clientY);

//     if (!range) return null;

//     const textNode = range.startContainer;

//     if (textNode.nodeType !== 3) return null;

//     const text = textNode.textContent;

//     const offset = range.startOffset;

//     const left = text.slice(0, offset)
//         .search(/\S+$/);

//     const right = text.slice(offset)
//         .search(/\s/);

//     const end =
//         right < 0 ? text.length : offset + right;

//     return text.slice(left, end).trim();

// }

// function showPopup(word, x, y) {

//     const old =
//         document.querySelector(".word-popup");

//     if (old) old.remove();

//     const popup =
//         document.createElement("div");

//     popup.className = "word-popup";

//     popup.innerHTML = `
//         <strong>${word}</strong>
//         <br>
//         нажми для перевода
//     `;

//     popup.style.left = `${x}px`;
//     popup.style.top = `${y}px`;

//     popup.addEventListener("click", () => {

//         window.open(
//             `https://translate.google.com/?sl=pl&tl=ru&text=${word}&op=translate`,
//             "_blank"
//         );

//     });

//     document.body.appendChild(popup);

//     setTimeout(() => {

//         popup.remove();

//     }, 3000);

// }

const dictionary =
    JSON.parse(localStorage.getItem("dictionary")) || {};

const savedWords =
    JSON.parse(localStorage.getItem("savedWords")) || [];

/* =========================
   CLICK WORD
========================= */

document.querySelectorAll(".text p").forEach(p => {

    p.addEventListener("click", async (e) => {

        const word = getWord(e);

        if (!word) return;

        const translation =
            await translateWord(word);

        showPopup(
            word,
            translation,
            e.pageX,
            e.pageY
        );

    });

});

/* =========================
   GET WORD
========================= */

function getWord(e) {

    const range =
        document.caretRangeFromPoint(
            e.clientX,
            e.clientY
        );

    if (!range) return null;

    const node = range.startContainer;

    if (node.nodeType !== 3) return null;

    const text = node.textContent;

    const offset = range.startOffset;

    const left =
        text.slice(0, offset)
        .search(/\S+$/);

    const right =
        text.slice(offset)
        .search(/\s/);

    const end =
        right < 0
        ? text.length
        : offset + right;

    return text
        .slice(left, end)
        .replace(/[.,!?;:()"']/g, "")
        .trim()
        .toLowerCase();

}

/* =========================
   TRANSLATE
========================= */

async function translateWord(word) {

    /* already translated */

    if (dictionary[word]) {

        return dictionary[word];

    }

    try {

        const response = await fetch(

            `https://api.mymemory.translated.net/get?q=${word}&langpair=pl|ru`

        );

        const data = await response.json();

        const translated =
            data.responseData.translatedText;

        dictionary[word] = translated;

        localStorage.setItem(
            "dictionary",
            JSON.stringify(dictionary)
        );

        return translated;

    } catch (error) {

        console.log(error);

        return "Ошибка перевода";

    }

}

/* =========================
   POPUP
========================= */

function showPopup(
    word,
    translation,
    x,
    y
) {

    const old =
        document.querySelector(".word-popup");

    if (old) old.remove();

    const popup =
        document.createElement("div");

    popup.className = "word-popup";

    popup.innerHTML = `

    <button class="popup-close">
        ✕
    </button>

    <div class="popup-word">
        ${word}
    </div>

    <div class="popup-translation">
        ${translation}
    </div>

    <div class="popup-buttons">

        <button onclick="speakWord('${word}')">
            🔊
        </button>

        <button onclick="saveWord('${word}')">
            ⭐
        </button>

    </div>

`;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    setTimeout(() => {

    const rect =
        popup.getBoundingClientRect();

    if (rect.right > window.innerWidth) {

        popup.style.left =
            `${window.innerWidth - rect.width - 20}px`;

    }

    if (rect.bottom > window.innerHeight) {

        popup.style.top =
            `${window.innerHeight - rect.height - 20}px`;

    }

}, 0);

    document.body.appendChild(popup);

    const closeBtn =
    popup.querySelector(".popup-close");

closeBtn.addEventListener("click", () => {

    popup.remove();

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
   SAVE WORD
========================= */

function saveWord(word) {

    if (!savedWords.includes(word)) {

        savedWords.push(word);

        localStorage.setItem(
            "savedWords",
            JSON.stringify(savedWords)
        );

    }

    alert("Слово сохранено ⭐");

}

document.addEventListener("click", (e) => {

    const popup =
        document.querySelector(".word-popup");

    if (!popup) return;

    const clickedPopup =
        popup.contains(e.target);

    const clickedText =
        e.target.closest(".text p");

    if (!clickedPopup && !clickedText) {

        popup.remove();

    }

});