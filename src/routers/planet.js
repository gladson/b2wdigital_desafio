const express = require("express");
const { validationResult } = require("express-validator");

const validate = require("../validators/validate");
const Planet = require("../models/planet");

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
        message: "Error: Desculpe ocorreu um problema",
      });
    }
  }
});

router.post("/", validate.validatePlanet(), async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({
        success: false,
        message: errors,
      });
    }

    const planet = new Planet({
      name: req.body.name,
      climate: req.body.climate,
      ground: req.body.ground,
    });

    const resultPlanet = await planet.save();
    res.json(resultPlanet);
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
        message: "Error: Desculpe ocorreu um problema",
      });
    }
  }
});

module.exports = router;
