const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get('https://mobalytics.gg/diablo-4/interactive-map');
        const $ = cheerio.load(data);

        // Example selectors, update these according to the actual structure of the page
        const helltideTimer = $('#helltide-timer').text();
        const worldbossTimer = $('#worldboss-timer').text();
        const legionTimer = $('#legion-timer').text();

        res.status(200).json({
            helltide: helltideTimer,
            worldboss: worldbossTimer,
            legion: legionTimer,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch event timers' });
    }
};
