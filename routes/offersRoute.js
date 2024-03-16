const express = require("express");
const Router = express.Router();
const Offers = require("../controllers/offer");
const offers = new Offers;


Router.post("/make", (req, res) => offers.make(req, res));
Router.post("/edit", (req, res) => offers.edit(req, res));
Router.post("/copy", (req, res) => offers.copy(req, res));
Router.post("/buy", (req, res) => offers.buy(req, res));
Router.post("/select_offers", (req, res) => offers.select_offers(req, res));
Router.post("/stop", (req, res) => offers.stop(req, res));
Router.post("/notifyMe", (req, res) => offers.notifyMe(req, res));



module.exports = Router;