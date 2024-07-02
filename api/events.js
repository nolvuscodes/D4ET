document.addEventListener('DOMContentLoaded', async function () {
    const url = 'https://maxroll.gg/d4/map-tool';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Find the ul element with class d4t-MapTimers
        const mapTimersList = doc.querySelector('ul.d4t-MapTimers');

        // Get all li elements within the ul
        const mapTimerItems = mapTimersList.querySelectorAll('li');

        // Clear existing list items
        const ulElement = document.getElementById('mapTimersList');
        ulElement.innerHTML = '';

        // Append each li element to the ul in our HTML
        mapTimerItems.forEach(item => {
            ulElement.appendChild(item.cloneNode(true));
        });

        // Update every 30 seconds (or as needed) to keep it in sync with the remote data
        setInterval(updateMapTimers, 30000); // 30 seconds

    } catch (error) {
        console.error('Error fetching map timers:', error);
    }
});

function updateMapTimers() {
    // Function to update the map timers list periodically
    // Fetch and update the list as shown above
    console.log('Updating map timers...');
    // Repeat the fetching and updating logic here
}
