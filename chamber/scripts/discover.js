document.addEventListener('DOMContentLoaded', () => {
    const visitMessageElement = document.querySelector('.visit-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    const msPerDay = 86400000; // Milliseconds in a day
    let message = "";

    if (lastVisit) {
        const daysBetween = Math.floor((now - lastVisit) / msPerDay);
        if (daysBetween < 1) {
            message = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${daysBetween} days ago.`;
        }
    } else {
        message = "Welcome! Let us know if you have any questions.";
    }

    visitMessageElement.innerText = message;
    localStorage.setItem('lastVisit', now);
});