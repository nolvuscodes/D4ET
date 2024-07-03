document.addEventListener('DOMContentLoaded', async () => {
    const eventTimersContainer = document.getElementById('event-timers');

    // Function to fetch data from helltides.com
    async function fetchEventData() {
        try {
            const response = await fetch('https://helltides.com/schedule'); // Update with the correct URL or API endpoint
            const data = await response.json();
            return data;
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
