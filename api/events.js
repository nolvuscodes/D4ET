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
        setInterval(async () => {
            try {
                const updatedResponse = await fetch(url);
                if (!updatedResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const updatedHtml = await updatedResponse.text();
                const updatedDoc = parser.parseFromString(updatedHtml, 'text/html');

                // Find the updated ul element with class d4t-MapTimers
                const updatedMapTimersList = updatedDoc.querySelector('ul.d4t-MapTimers');

                // Get all updated li elements within the ul
                const updatedMapTimerItems = updatedMapTimersList.querySelectorAll('li');

                // Clear existing list items
                ulElement.innerHTML = '';

                // Append each updated li element to the ul in our HTML
                updatedMapTimerItems.forEach(item => {
                    ulElement.appendChild(item.cloneNode(true));
                });

                console.log('Map timers updated successfully.');

            } catch (error) {
                console.error('Error fetching updated map timers:', error);
            }
        }, 30000); // 30 seconds

    } catch (error) {
        console.error('Error fetching map timers:', error);
    }
});
