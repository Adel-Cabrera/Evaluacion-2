const express = require("express");
const QuotesController = require("./controllers/QuotesController");
const PageController = require("./controllers/PageController");
const SqlClient = require("./lib/SqlClient");

const router = express.Router();

// Database Client
const sqlClient = new SqlClient();

// Controllers
const pageController = new PageController();
const quotesController = new QuotesController(sqlClient);

// Routes
router.get("/", quotesController.renderHomeWithQuotes);
router.get("/about", pageController.renderAbout);

router.get("/quotes/create", quotesController.renderQuoteCreationForm);
router.post("/quotes/create", quotesController.insertAndRenderQuote);

router.get("/quotes/:id", quotesController.renderQuoteById);

router.get("/quotes/:id/update", quotesController.renderQuoteUpdateForm);
router.post("/quotes/:id/update", quotesController.updateAndRenderQuote);

router.post(
  "/quotes/:id/delete",
  quotesController.deleteQuoteAndRenderResponse
);

router.get("*", pageController.renderNotFound);

module.exports = router;
