const express = require("express");
const {
    createTrundle,
    getAllTrundle,
    getAllTrundleByAuthor,
    getTrundleById,
    deleteTrundleById
} = require("../controllers/Trundle");
const {createLike, unSetLike} = require("../controllers/likes");
const authentication = require("../middleware/authentication");

const trundleRouter = express.Router();

trundleRouter.post("/trundle//create", authentication ,createTrundle);
trundleRouter.get("/trundle",authentication, getAllTrundle);
trundleRouter.get("/search_1/trundle/:author",authentication, getAllTrundleByAuthor);
trundleRouter.get("/search_2/trundle/:id",authentication, getTrundleById);
trundleRouter.delete("/trundle/:id/:iduser",authentication, deleteTrundleById);

trundleRouter.get("/trundle/:id/like", authentication, createLike);
trundleRouter.get("/trundle/:id/unlike", authentication, unSetLike);

module.exports = trundleRouter;