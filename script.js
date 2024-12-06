// Handle Loading Screen and Content Display
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const content = document.getElementById('content');
    const progressBar = document.querySelector('.progress-bar');
    const loadingDots = document.getElementById('loading-dots');
    let progress = 0;

    // Animate loading dots
    setInterval(() => {
        loadingDots.textContent =
            loadingDots.textContent.length < 3 ? loadingDots.textContent + "." : "";
    }, 500);

    const loadingInterval = setInterval(() => {
        progress += 1;
        progressBar.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(loadingInterval);
            loadingScreen.style.opacity = 0;
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                content.style.display = 'block';
                content.style.opacity = 1;
            }, 500);
        }
    }, 100); // Adjust interval for progress speed
});

// Smooth Section Transitions
function changeSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(`${sectionId}-section`);

    // Fade out current section
    sections.forEach(section => {
        section.style.opacity = 0;
        setTimeout(() => section.style.display = 'none', 500); // Match fade-out duration
    });

    // Fade in target section
    setTimeout(() => {
        targetSection.style.display = 'block';
        setTimeout(() => targetSection.style.opacity = 1, 50); // Delay to ensure smooth fade-in
    }, 500);
}

// Search Games
document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('game-search').value.toLowerCase();
    const games = document.querySelectorAll('.game-button');

    games.forEach(game => {
        const gameName = game.dataset.game.toLowerCase();
        game.style.display = gameName.includes(query) ? 'inline-block' : 'none';
    });

    if (![...games].some(game => game.style.display === 'inline-block')) {
        alert('No games found. Try checking your spelling!');
    }
});

// Visit Counter Logic
let visitCount = localStorage.getItem('visitCount') || 0;
visitCount++;
localStorage.setItem('visitCount', visitCount);
document.getElementById('visit-count').textContent = visitCount;

// Sign-In Modal
window.addEventListener('DOMContentLoaded', () => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
        document.getElementById('signin-modal').style.display = 'flex';
    } else {
        alert(`Welcome back, ${email}!`);
    }
});

function signIn() {
    const emailInput = document.getElementById('email-input').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(emailInput)) {
        localStorage.setItem('userEmail', emailInput);

        let storedEmails = JSON.parse(localStorage.getItem('storedEmails')) || [];
        if (!storedEmails.includes(emailInput)) {
            storedEmails.push(emailInput);
            localStorage.setItem('storedEmails', JSON.stringify(storedEmails));
        }

        document.getElementById('signin-modal').style.display = 'none';
        alert('Welcome to the Gaming Hub!');
    } else {
        alert('Please enter a valid email address.');
    }
}

// Logout
function logout() {
    localStorage.removeItem('userEmail');
    alert('You have been logged out.');
    location.reload();
}

// Feedback Modal
function showFeedbackModal() {
    const modal = document.getElementById('feedback-modal');
    modal.style.display = 'flex';
}

document.getElementById('close-modal').addEventListener('click', () => {
    const modal = document.getElementById('feedback-modal');
    modal.style.display = 'none';
});

document.getElementById('submit-feedback').addEventListener('click', () => {
    const feedback = document.getElementById('feedback-text').value.trim();
    const selectedRating = document.querySelector('.star.selected')?.dataset.value;

    if (!selectedRating) {
        alert('Please select a star rating.');
        return;
    }

    if (feedback.split(' ').length >= 3) {
        alert(`Thank you for your feedback! You rated us ${selectedRating} star(s).`);
        document.getElementById('feedback-modal').style.display = 'none';
    } else {
        alert('Please provide at least 3 words of feedback.');
    }
});

// Star Rating Logic
const stars = document.querySelectorAll('.star');
stars.forEach(star => {
    star.addEventListener('mouseover', () => highlightStars(star.dataset.value));
    star.addEventListener('mouseout', resetStars);
    star.addEventListener('click', () => {
        stars.forEach(star => star.classList.remove('selected'));
        star.classList.add('selected');
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        if (star.dataset.value <= rating) {
            star.classList.add('selected');
        } else {
            star.classList.remove('selected');
        }
    });
}

function resetStars() {
    stars.forEach(star => star.classList.remove('selected'));
}

// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// Apply saved dark mode
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}
// Scroll to Games Section
document.getElementById('fab').addEventListener('click', () => {
    const gamesSection = document.getElementById('games-section');
    gamesSection.scrollIntoView({ behavior: 'smooth' });
});
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#66FCF1" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000" },
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false },
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#66FCF1",
            opacity: 0.4,
            width: 1,
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        },
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
        },
        modes: {
            repulse: { distance: 100, duration: 0.4 },
            push: { particles_nb: 4 },
        },
    },
    retina_detect: true,
});
// Create the cursor dot
const cursorDot = document.createElement('div');
cursorDot.id = 'cursor-dot';
document.body.appendChild(cursorDot);

// Move dot with cursor
document.addEventListener('mousemove', (e) => {
    cursorDot.style.top = `${e.clientY}px`;
    cursorDot.style.left = `${e.clientX}px`;
});

// Move dot to title every 10 seconds
setInterval(() => {
    const title = document.querySelector('header h1');
    const titleRect = title.getBoundingClientRect();

    // Calculate position for the dot (period at the end of the title)
    const targetX = titleRect.left + title.offsetWidth - 10; // Adjust for dot size
    const targetY = titleRect.top + title.offsetHeight / 2;

    cursorDot.style.top = `${targetY}px`;
    cursorDot.style.left = `${targetX}px`;
    cursorDot.style.transform = 'scale(1.5)'; // Grow slightly when it moves to the title

    setTimeout(() => cursorDot.style.transform = 'scale(1)', 500); // Return to normal size
}, 10000);
// Cursor Trail Effect
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.top = `${e.clientY}px`;
    trail.style.left = `${e.clientX}px`;
    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove(); // Remove the trail element after animation
    }, 1000); // Match with fadeOut animation duration
});
