require("dotenv").config();
const axios = require("axios");
const https = require("https");

/**
 * Error: certificate has expired axios
 */
const agent = new https.Agent({
    rejectUnauthorized: false,
});

const instance = axios.create({
    baseURL: `${process.env.HOST_SWAPI}`,
});

const resultQuantityMovies = async function getQuantityMovies(namePlanet) {
    try {
        const response = await instance.get(`/planets/?search=${namePlanet}`, {
            httpsAgent: agent,
        });
        return response;
    } catch (error) {
        console.error(error);
    }
};

const swapi = {
    resultQuantityMovies,
};

module.exports = swapi;
