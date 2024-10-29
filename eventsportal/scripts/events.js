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
