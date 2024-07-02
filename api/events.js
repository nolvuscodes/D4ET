const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get('https://mobalytics.gg/diablo-4/interactive-map');
        const $ = cheerio.load(data);

        // Update these selectors to match the actual structure of the Mobalytics page
        const helltideTimer = $('.m-1ecy270 .m-9kkwtd').first().find('.m-vfzgit span').text().trim();
        const worldbossTimer = $('.m-1ecy270 .m-9kkwtd').eq(1).find('.m-vfzgit span').text().trim();
        const legionTimer = $('.m-1ecy270 .m-9kkwtd').last().find('.m-vfzgit span').text().trim();

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
