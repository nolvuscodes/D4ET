const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get('https://helltides.com');
        const $ = cheerio.load(data);

        const helltideTimer = $('.helltide-timer').text().trim();
        const worldbossTimer = $('.worldboss-timer').text().trim();
        const legionTimer = $('.legion-timer').text().trim();

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
