// const axios = require('axios');
// const cheerio = require('cheerio');

// module.exports = async (req, res) => {
//     try {
//         const { data } = await axios.get('https://mobalytics.gg/diablo-4/interactive-map');
//         const $ = cheerio.load(data);

//         // Update these selectors to match the actual structure of the Mobalytics page
//         const helltideTimer = $('.m-1ecy270 .m-9kkwtd').first().find('.m-vfzgit span').text().trim();
//         const worldbossTimer = $('.m-1ecy270 .m-9kkwtd').eq(1).find('.m-vfzgit span').text().trim();
//         const legionTimer = $('.m-1ecy270 .m-9kkwtd').last().find('.m-vfzgit span').text().trim();

//         res.status(200).json({
//             helltide: helltideTimer,
//             worldboss: worldbossTimer,
//             legion: legionTimer,
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to fetch event timers' });
//     }
// };


// script.js

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/events'); // Assuming your server serves this endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch event timers');
        }
        const { helltide, worldboss, legion } = await response.json();

        startCountdown('helltide-timer', parseDuration(helltide));
        startCountdown('worldboss-timer', parseDuration(worldboss));

        if (legion !== "Unspecified") {
            document.getElementById('legion-timer').textContent = legion;
        } else {
            document.getElementById('legion-timer').textContent = "Unspecified";
        }
    } catch (error) {
        console.error('Error fetching event timers:', error);
    }
});

function startCountdown(id, duration) {
    const element = document.getElementById(id);
    let time = duration;

    const countdownInterval = setInterval(() => {
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        element.textContent = `${hours}:${minutes}:${seconds}`;

        if (--time < 0) {
            clearInterval(countdownInterval);
        }
    }, 1000);
}

function parseDuration(durationString) {
    // Example parsing logic, adjust as per your actual data format
    const [hours, minutes, seconds] = durationString.split(':').map(part => parseInt(part, 10));
    return hours * 3600 + minutes * 60 + seconds;
}
