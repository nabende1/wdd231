function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('hidden');
}

// Fetch event data from JSON file
fetch('data/events.json')
    .then(response => response.json())
    .then(data => {
        const eventContainer = document.getElementById('event-container');
        
        // Shuffle the events array
        const shuffledEvents = data.sort(() => 0.5 - Math.random());
        
        // Select the first three events from the shuffled array
        const selectedEvents = shuffledEvents.slice(0, 3);
        
        selectedEvents.forEach(event => {
            const eventDiv = document.createElement('section');
            eventDiv.classList.add('event');
            eventDiv.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="event-details">
                    <h3>${event.title}</h3>
                    <p>Date: ${event.date}</p>
                    <p>${event.description}</p>
                </div>
            `;
            eventContainer.appendChild(eventDiv);
        });
    })
    .catch(error => console.error('Error fetching events:', error));


document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const feedback = document.getElementById("form-feedback");

    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simulate form submission success
        feedback.textContent = "Thank you for your message! We'll get back to you shortly.";
        feedback.style.color = "#2972fb";

        // Clear the form fields after submission
        contactForm.reset();

        // Hide the feedback message after a short delay
        setTimeout(() => {
            feedback.textContent = "";
        }, 3000);
    });
});
