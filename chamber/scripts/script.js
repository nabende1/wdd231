document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = document.lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
	navigation.classList.toggle('open');
	hamButton.classList.toggle('open');
});

// Fetch members data and display them
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');  // Fetch the JSON data
        const members = await response.json();  // Parse the JSON
        displayMembers(members);  // Display members in the grid view by default
    } catch (error) {
        console.error('Error fetching members data:', error);
    }
}

// Function to display members
function displayMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = '';  // Clear existing content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Membership Level:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
            <p><strong>Description:</strong> ${member.description}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        container.appendChild(memberCard);
    });
}

// Function to convert membership level to text
function getMembershipLevel(level) {
    if (level === 1) return 'Member';
    if (level === 2) return 'Silver';
    if (level === 3) return 'Gold';
    return 'Unknown';
}

// Event listeners for toggle buttons
document.getElementById('grid-view-btn').addEventListener('click', () => {
    document.getElementById('members-container').classList.remove('list-view');
    document.getElementById('members-container').classList.add('grid-view');
});

document.getElementById('list-view-btn').addEventListener('click', () => {
    document.getElementById('members-container').classList.remove('grid-view');
    document.getElementById('members-container').classList.add('list-view');
});

// Initialize by fetching and displaying members
fetchMembers();
