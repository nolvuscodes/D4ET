// script.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/events'); // Assuming your server serves this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch event timers');
        }
        const { helltide, worldboss, legion } = await response.json();

        startCountdown('helltide-timer', helltide);
        startCountdown('worldboss-timer', worldboss);

        if (legion !== "Unspecified") {
            document.getElementById('legion-timer').textContent = legion;
        } else {
            document.getElementById('legion-timer').textContent = "Unspecified";
        }
    } catch (error) {
        console.error('Error fetching event timers:', error);
    }
});

function startCountdown(id, startTime) {
    const element = document.getElementById(id);
    let startTimeMillis = Date.parse(startTime);

    const countdownInterval = setInterval(() => {
        let now = Date.now();
        let timeDiff = startTimeMillis - now;

        if (timeDiff <= 0) {
            element.textContent = "Event is ongoing";
            clearInterval(countdownInterval);
        } else {
            let hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            hours = hours < 10 ? "0" + hours : hours;
            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            element.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }, 1000);
}
