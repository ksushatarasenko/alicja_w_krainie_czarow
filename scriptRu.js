
document.addEventListener('click', function (e) {

    const trigger = e.target.closest('[data-modal]');

    if (trigger && !trigger.classList.contains('modal')) {
        const modalName = trigger.dataset.modal;
        const modal = document.querySelector(`.modal[data-modal="${modalName}"]`);
        modal.classList.toggle('active');
    }

    // закрытие
    if (e.target.classList.contains('close')) {
        e.target.closest('.modal').classList.remove('active');
    }

    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
    }
});