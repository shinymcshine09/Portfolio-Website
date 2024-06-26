
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

const svg = document.getElementById('svg-hamburger');
const scrollPoint = window.innerHeight;

const lightTheme = document.getElementById('bootstrap-light');
const darkTheme = document.getElementById('bootstrap-dark');

var path = window.location.pathname;
var page = path.split("/").pop();

function setThemeBasedOnPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        lightTheme.disabled = true;
        darkTheme.disabled = false;
        svg.querySelector('path').setAttribute('fill', 'white');
    } else {
        lightTheme.disabled = false;
        darkTheme.disabled = true;
        if (window.scrollY > scrollPoint || page !== 'index.html') {
            svg.querySelector('path').setAttribute('fill', 'black');
        }
    }
}

// Initial theme setup
setThemeBasedOnPreference();

// Listen for changes in the system's color scheme preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', setThemeBasedOnPreference);

window.addEventListener('scroll', function() {
    if (window.scrollY > scrollPoint && (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches)) {
        svg.querySelector('path').setAttribute('fill', 'black');
    }
    else if (window.scrollY < scrollPoint && (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) &&  page !== 'index.html' ) {
        svg.querySelector('path').setAttribute('fill', 'black');
    } 
    else {
        svg.querySelector('path').setAttribute('fill', 'white');
    }
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
}