document.addEventListener('DOMContentLoaded', () => {
    const events = [
        { name: 'Ashava', time: '2024-07-02T22:30:00', location: 'Dry Steppes' },
        // Add more events here
    ];

    const eventTimersContainer = document.getElementById('event-timers');

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
});
