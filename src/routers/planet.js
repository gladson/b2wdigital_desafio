const express = require("express");
const { validationResult } = require("express-validator");

const validate = require("../validators/validate");
const Planet = require("../models/planet");
const Swapi = require("../util/swapi");

const router = express.Router();

/**
 * Route => Planet
 */

router.get("/", async (req, res) => {
    try {
        const pageSize = parseInt(req.query.pageSize, 10) || 10;
        const pageNumber = parseInt(req.query.pageNumber, 10) || 1;

        const options = {
            limit: pageSize,
            page: pageNumber,
            sort: "-createdAt",
        };

        Object.keys(req.query).forEach((key) => {
            if (key === "pageNumber" || key === "pageSize") {
                delete req.query[key];
            }
        });

        const query = Object.keys(req.query).reduce((mappedQuery, key) => {
            if (req.query[key]) {
                mappedQuery[key] =
                    typeof req.query[key] === "boolean"
                        ? req.query[key]
                        : new RegExp(req.query[key], "i");
            }
            return mappedQuery;
        }, {});

        const planets = await Planet.paginate(query, options);
        res.status(200).json(planets);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error(GET): Desculpe ocorreu um problema",
            });
        }
    }
});

router.post("/", validate.validatePostPutPlanet(), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: errors,
            });
        }

        const resQuantMov = await Swapi.resultQuantityMovies(req.body.name);
        let qtdMov;
        if (resQuantMov.status == 200) {
            qtdMov =
                resQuantMov.data.count <= 0
                    ? 0
                    : resQuantMov.data.results[0].films.length;
        }
        const planet = new Planet({
            name: req.body.name,
            climate: req.body.climate,
            ground: req.body.ground,
            quantity_movies: qtdMov,
        });

        const resultPlanet = await planet.save();
        res.json(resultPlanet);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error(POST): Desculpe ocorreu um problema",
            });
        }
    }
});

router.get("/:id", async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.id);
        if (planet === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar o planeta em nossa base dados",
            });
        }
        res.json(planet);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error(GET_ID): Desculpe ocorreu um problema",
            });
        }
    }
});

router.patch("/:id", validate.validatePatchPlanet(), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: errors,
            });
        }

        const planet = await Planet.findById(req.params.id);
        if (planet === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar em nossa base dados",
            });
        }
        planet.ground = req.body.ground;
        const resultChangePlanet = await planet.save();
        res.json(resultChangePlanet);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error(PATCH): Desculpe ocorreu um problema",
            });
        }
    }
});

router.put("/:id", validate.validatePostPutPlanet(), async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.status(422).json({
                success: false,
                message: errors,
            });
        }

        const planet = await Planet.findById(req.params.id);
        if (planet === null) {
            res.status(404).json({
                success: false,
                message:
                    "Error: Desculpe não conseguimos encontrar o planeta em nossa base dados",
            });
        }

        const resQuantMov = await Swapi.resultQuantityMovies(req.body.name);
        let qtdMov;
        if (resQuantMov.status == 200) {
            qtdMov =
                resQuantMov.data.count <= 0
                    ? 0
                    : resQuantMov.data.results[0].films.length;
        }

        const planetModel = {
            name: req.body.name,
            climate: req.body.climate,
            ground: req.body.ground,
            quantity_movies: qtdMov,
        };

        planet.set(planetModel);
        const resultChangePlanet = await planet.save();
        res.json(resultChangePlanet);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error(PUT): Desculpe ocorreu um problema",
            });
        }
    }
});

router.delete("/all", async (req, res) => {
    try {
        const planet = await Planet.deleteMany({});
        if (planet.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Sucesso: Todos os arquivos deletados com sucesso",
            });
        }
        res.json(planet);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error(DELETE_ALL): Desculpe ocorreu um problema",
            });
        }
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const planet = await Planet.findByIdAndRemove(req.params.id);
        if (planet != null) {
            res.status(200).json({
                success: true,
                message: `Sucesso: Planeta número: ${planet._id} deletado com sucesso`,
            });
        }
        res.json(planet);
    } catch (error) {
        if (process.env.DEBUG === true) {
            res.status(500).json(`Error: ${error}`);
        } else {
            res.status(500).json({
                success: false,
                message: "Error: Desculpe ocorreu um problema",
            });
        }
    }
});

module.exports = router;
