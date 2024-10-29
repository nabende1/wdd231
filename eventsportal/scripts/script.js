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

//contact page
document.addEventListener("DOMContentLoaded", () => {
    const eventsContainer = document.getElementById("events-container");

    // Fetch events from JSON file
    fetch("data/events.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(event => {
                const eventCard = document.createElement("div");
                eventCard.classList.add("event-card");

                eventCard.innerHTML = `
                    <img src="${event.image}" alt="${event.title}" class="event-image">
                    <div class="event-details">
                        <h3 class="event-title">${event.title}</h3>
                        <p class="event-date-time">📅 ${event.date} | ⏰ ${event.time}</p>
                        <p class="event-location">📍 ${event.location}</p>
                        <p class="event-description">${event.description}</p>
                    </div>
                `;

                eventsContainer.appendChild(eventCard);
            });
        })
        .catch(error => console.error("Error loading events:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const submitEventLink = document.getElementById("submit-event-link");
    const modal = document.getElementById("event-modal");
    const closeModal = document.querySelector(".close");
    const eventForm = document.getElementById("event-form");
    const feedback = document.getElementById("feedback");

    // Open modal when clicking on the submit event link
    submitEventLink.addEventListener("click", (e) => {
        e.preventDefault();
        modal.style.display = "block";
    });

    // Close modal when clicking on the close button
    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        feedback.textContent = ""; // Clear feedback on close
    });

    // Close modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
            feedback.textContent = ""; // Clear feedback on close
        }
    });

    // Handle form submission
    eventForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Simulate a successful submission
        feedback.textContent = "Your event has been successfully submitted!";
        feedback.style.color = "#2972fb";

        // Clear the form after submission
        eventForm.reset();

        // Hide the modal after a short delay
        setTimeout(() => {
            modal.style.display = "none";
            feedback.textContent = ""; // Clear feedback for the next submission
        }, 2000);
    });
});
