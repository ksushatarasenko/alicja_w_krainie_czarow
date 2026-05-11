document.querySelectorAll(".text p").forEach(p => {

    p.addEventListener("click", async (e) => {

        const selection = window.getSelection().toString();

        if (selection.length > 0) return;

        const word = getWordAtPoint(e);

        if (!word) return;

        showPopup(word, e.pageX, e.pageY);

    });

});

function getWordAtPoint(e) {

    const range =
        document.caretRangeFromPoint(e.clientX, e.clientY);

    if (!range) return null;

    const textNode = range.startContainer;

    if (textNode.nodeType !== 3) return null;

    const text = textNode.textContent;

    const offset = range.startOffset;

    const left = text.slice(0, offset)
        .search(/\S+$/);

    const right = text.slice(offset)
        .search(/\s/);

    const end =
        right < 0 ? text.length : offset + right;

    return text.slice(left, end).trim();

}

function showPopup(word, x, y) {

    const old =
        document.querySelector(".word-popup");

    if (old) old.remove();

    const popup =
        document.createElement("div");

    popup.className = "word-popup";

    popup.innerHTML = `
        <strong>${word}</strong>
        <br>
        нажми для перевода
    `;

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;

    popup.addEventListener("click", () => {

        window.open(
            `https://translate.google.com/?sl=pl&tl=ru&text=${word}&op=translate`,
            "_blank"
        );

    });

    document.body.appendChild(popup);

    setTimeout(() => {

        popup.remove();

    }, 3000);

}