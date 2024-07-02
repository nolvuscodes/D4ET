const axios = require('axios');
const cheerio = require('cheerio');

module.exports = async (req, res) => {
    try {
        const { data } = await axios.get('https://helltides.com');
        const $ = cheerio.load(data);

        const helltideTimer = $('.text-xl xl:text-[1.35rem] font-mono mb-2').text().trim();
        const worldbossTimer = $('.text-xl xl:text-[1.35rem] text-center font-mono mb-2').text().trim();
        const legionTimer = $('.text-xl xl:text-[1.35rem] text-center font-mono mb-2').text().trim();

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
