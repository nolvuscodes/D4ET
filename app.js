document.addEventListener('DOMContentLoaded', async () => {
    const eventTimersContainer = document.getElementById('event-timers');

    // Function to fetch data from helltides.com and parse the HTML
    async function fetchEventData() {
        const cachedData = localStorage.getItem('eventData');
        if (cachedData) {
            return JSON.parse(cachedData);
        }

        try {
            const response = await fetch('https://helltides.com/schedule');
            const text = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(text, 'text/html');

            const eventElements = doc.querySelectorAll('ul > li');
            const events = Array.from(eventElements).map(eventElement => {
                const [dateSpan, nameSpan] = eventElement.querySelectorAll('span');
                const dateTime = dateSpan.textContent.trim();
                const name = nameSpan.textContent.trim();
                return { time: dateTime, name };
            });

            localStorage.setItem('eventData', JSON.stringify(events));
            return events;
        } catch (error) {
            console.error('Error fetching event data:', error);
            return null;
        }
    }

    // Function to display event timers
    function displayEventTimers(events) {
        eventTimersContainer.innerHTML = ''; // Clear any existing content

        events.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('mb-4', 'p-4', 'bg-gray-800', 'rounded-lg');

            const eventTime = new Date(event.time);
            const eventLocalTimeString = eventTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            eventElement.innerHTML = `
                <h2 class="text-xl font-bold">${event.name} Spawns In</h2>
                <div id="timer-${event.name}" class="text-3xl my-2">Loading...</div>
                <p>Today at ${eventLocalTimeString}</p>
                <p>Location: ${event.location}</p>
            `;

            eventTimersContainer.appendChild(eventElement);

            // Update the timer every second
            setInterval(() => {
                const now = new Date();
                const timeDifference = eventTime - now;

                if (timeDifference > 0) {
                    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

                    document.getElementById(`timer-${event.name}`).innerText = `${hours}h ${minutes}m ${seconds}s`;
                } else {
                    document.getElementById(`timer-${event.name}`).innerText = 'Event has started!';
                }
            }, 1000);
        });
    }

    // Fetch event data and display timers
    const events = await fetchEventData();
    if (events) {
        displayEventTimers(events);
    } else {
        eventTimersContainer.innerHTML = '<p>Error loading event data.</p>';
    }
});
