const express = require("express");

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

module.exports = router;
