document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

// Get modal element and close button
const modal = document.getElementById('membershipModal');
const closeModal = document.getElementById('closeModal');

// Function to open the modal
function openModal() {
    modal.style.display = 'block';
}

// Close the modal when clicking on the close button
closeModal.onclick = function() {
    modal.style.display = 'none';
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
document.addEventListener('DOMContentLoaded', function() {
    // Open modal when a modal-trigger link is clicked
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            const modalId = trigger.getAttribute('data-modal');
            document.getElementById(modalId).style.display = 'flex';
        });
    });

    // Close modal when the close icon is clicked
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modalId = closeBtn.getAttribute('data-close');
            document.getElementById(modalId).style.display = 'none';
        });
    });

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        document.querySelectorAll('.modal').forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
});
