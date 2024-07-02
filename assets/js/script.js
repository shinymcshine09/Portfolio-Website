const navBtn = document.querySelector('#hamburger');
const nav = document.querySelector('#navbar');
const crossBtn = document.querySelector('#cross');

navBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('hide');
    navBtn.classList.add('hide');
});

crossBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.add('hide');
    navBtn.classList.remove('hide');
});

document.addEventListener('click', e => {
    if (!nav.contains(e.target) && e.target !== navBtn) {
        nav.classList.add('hide');
        navBtn.classList.remove('hide');
    }
});

const showButtons = document.querySelectorAll('.show-btn');

showButtons.forEach(button => {
    button.addEventListener('click', function () {
        const target = this.getAttribute('data-target');
        const targetElement = document.getElementById(target);
        document.getElementById('overlay').classList.remove('hidden');
        document.getElementById('overlay').classList.add('visible');
        targetElement.classList.remove('hidden');
        targetElement.classList.add('visible');
        document.body.classList.add('modal-open');
    })
})

// Event listener for overlay
document.getElementById('overlay').addEventListener('click', function() {
    document.querySelectorAll('.modal.visible').forEach(modal => {
        modal.classList.remove('visible');
        modal.classList.add('hidden');
    });
    document.getElementById('overlay').classList.remove('visible');
    document.getElementById('overlay').classList.add('hidden');
    document.body.classList.remove('modal-open');
});

(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init({
    publicKey: "r588IplFP8PloORH4",
    });
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        // these IDs from the previous steps
        emailjs.sendForm('service_ns9woux', 'template_hdnu45j', this)
            .then(() => {
                console.log('SUCCESS!');
                location.reload()
            }, (error) => {
                console.log('FAILED...', error);
            });
    });
};