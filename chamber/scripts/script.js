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
        const response = await fetch('data/members.json');  // Correct path to members.json
        if (!response.ok) throw new Error('Network response was not ok');
        const members = await response.json();  // Parse the JSON
        console.log('Members fetched:', members); // Log members data
        displayMembers(members);  // Display 2-3 random members
    } catch (error) {
        console.error('Error fetching members data:', error);
    }
}


// Fetch members data and display them
async function fetchMembers() {
    try {
        const response = await fetch('data/members.json');  // Fetch the JSON data
        if (!response.ok) throw new Error('Network response was not ok');  // Check for a successful response
        const members = await response.json();  // Parse the JSON
        console.log('Members fetched:', members); // Debugging log to check fetched members
        displayMembers(members);  // Display members
    } catch (error) {
        console.error('Error fetching members data:', error);  // Log any fetch errors
    }
}

// Function to display members
function displayMembers(members) {
    const container = document.getElementById('members-container');
    container.innerHTML = '';  // Clear existing content

    // Check if members array is empty
    if (!members || members.length === 0) {
        console.warn('No members to display'); // Log warning if no members are found
        container.innerHTML = '<p>No members found.</p>'; // Display message if no members
        return;
    }

    // Select 2-3 random members
    const selectedMembers = [];
    const numberOfMembersToDisplay = Math.min(3, members.length);  // Limit to 3 or total members available

    while (selectedMembers.length < numberOfMembersToDisplay) {
        const randomIndex = Math.floor(Math.random() * members.length);  // Get random index
        const selectedMember = members[randomIndex];

        // Avoid duplicates
        if (!selectedMembers.includes(selectedMember)) {
            selectedMembers.push(selectedMember); // Add selected member
        }
    }

    // Display selected members
    selectedMembers.forEach(member => {
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

        container.appendChild(memberCard); // Append member card to the container
    });
}

// Function to convert membership level to text
function getMembershipLevel(level) {
    if (level === 1) return 'Member';
    if (level === 2) return 'Silver';
    if (level === 3) return 'Gold';
    return 'Unknown';
}

// Initialize by fetching and displaying members
fetchMembers();
// Fetch events data and display them
async function fetchEvents() {
    try {
        const response = await fetch('data/events.json');  // Correct path to events.json
        if (!response.ok) throw new Error('Network response was not ok');
        const events = await response.json();  // Parse the JSON
        console.log('Events fetched:', events); // Log events data
        displayEvents(events);  // Display events
    } catch (error) {
        console.error('Error fetching events data:', error);
    }
}

// Function to display events
function displayEvents(events) {
    const eventsContainer = document.getElementById('events-container');
    eventsContainer.innerHTML = '';  // Clear existing content

    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');

        eventCard.innerHTML = `
            <h3>${event.name}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Description:</strong> ${event.description}</p>
        `;

        eventsContainer.appendChild(eventCard);
    });
}

// Initialize by fetching and displaying members and events
fetchMembers();
fetchEvents();
const apiKey = '5fe6ad17e385ba48594eff17129134b8';  // Your OpenWeatherMap API key

        // Fetch weather data based on latitude and longitude
        async function fetchWeatherData(lat, lon) {
            const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`;
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKey}`;
            
            try {
                // Fetch current weather
                const weatherResponse = await fetch(currentWeatherUrl);
                if (!weatherResponse.ok) throw new Error('Failed to fetch current weather data');
                const weatherData = await weatherResponse.json();
                displayWeatherData(weatherData);  // Display current weather

                // Fetch 5-day forecast
                const forecastResponse = await fetch(forecastUrl);
                if (!forecastResponse.ok) throw new Error('Failed to fetch forecast data');
                const forecastData = await forecastResponse.json();
                displayForecastData(forecastData);  // Display forecast data
            } catch (error) {
                console.error('Error fetching weather data:', error);
                document.getElementById('weather-container').innerHTML = '<p>Error fetching current weather data. Please try again later.</p>';
                document.getElementById('forecast-container').innerHTML = '<p>Error fetching forecast data. Please try again later.</p>';
            }
        }

        // Function to display the current weather data
        function displayWeatherData(data) {
            const weatherContainer = document.getElementById('weather-container');
            weatherContainer.innerHTML = '';

            const locationElement = document.createElement('h3');
            locationElement.textContent = `${data.name}, ${data.sys.country}`;

            const tempElement = document.createElement('p');
            tempElement.textContent = `Temperature: ${data.main.temp} °C`;

            const weatherElement = document.createElement('p');
            weatherElement.textContent = `Weather: ${data.weather[0].description}`;

            const humidityElement = document.createElement('p');
            humidityElement.textContent = `Humidity: ${data.main.humidity}%`;

            const windElement = document.createElement('p');
            windElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;

            weatherContainer.appendChild(locationElement);
            weatherContainer.appendChild(tempElement);
            weatherContainer.appendChild(weatherElement);
            weatherContainer.appendChild(humidityElement);
            weatherContainer.appendChild(windElement);
        }

        // Function to display the 5-day forecast data
        function displayForecastData(data) {
            const forecastContainer = document.getElementById('forecast-container');
            forecastContainer.innerHTML = '<h3>5-Day Forecast</h3>';

            // Filter the forecast data to show 1 item per day (every 24 hours at 12:00)
            const dailyForecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00'));

            dailyForecasts.forEach(forecast => {
                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');

                const dateElement = document.createElement('p');
                dateElement.textContent = new Date(forecast.dt_txt).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

                const tempElement = document.createElement('p');
                tempElement.textContent = `Temp: ${forecast.main.temp} °C`;

                const weatherElement = document.createElement('p');
                weatherElement.textContent = `Weather: ${forecast.weather[0].description}`;

                forecastItem.appendChild(dateElement);
                forecastItem.appendChild(tempElement);
                forecastItem.appendChild(weatherElement);

                forecastContainer.appendChild(forecastItem);
            });
        }

        // Function to get the user's current position using the Geolocation API
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const { latitude, longitude } = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
                    fetchWeatherData(latitude, longitude); // Fetch weather and forecast based on user's current location
                }, error => {
                    console.error('Error getting location:', error);
                    document.getElementById('weather-container').innerHTML = '<p>Unable to retrieve your location. Please allow location access.</p>';
                    document.getElementById('forecast-container').innerHTML = '<p>Unable to retrieve forecast data. Please allow location access.</p>';
                });
            } else {
                document.getElementById('weather-container').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
                document.getElementById('forecast-container').innerHTML = '<p>Geolocation is not supported by this browser.</p>';
            }
        }

        // Call getLocation on window load to get the user's location and fetch weather and forecast data
        window.onload = getLocation;
    
   // Set the current timestamp in the hidden field
   document.getElementById('timestamp').value = new Date().toISOString();


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