const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get('https://mobalytics.gg/diablo-4/interactive-map');
        const $ = cheerio.load(data);

        // Update these selectors to match the actual structure of the Mobalytics page
        const helltideTimer = $('selector-for-helltide-timer').text();
        const worldbossTimer = $('selector-for-worldboss-timer').text();
        const legionTimer = $('selector-for-legion-timer').text();

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
