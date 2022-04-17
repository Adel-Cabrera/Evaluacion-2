const QuotesDAO = require("../models/dao/QuotesDAO");

class QuotesController {
  constructor(db) {
    this.quotesDao = new QuotesDAO(db);
    this.renderHomeWithQuotes = this.renderHomeWithQuotes.bind(this);
    this.renderQuoteById = this.renderQuoteById.bind(this);
    this.renderQuoteCreationForm = this.renderQuoteCreationForm.bind(this);
    this.renderQuoteUpdateForm = this.renderQuoteUpdateForm.bind(this);
    this.insertAndRenderQuote = this.insertAndRenderQuote.bind(this);
    this.updateAndRenderQuote = this.updateAndRenderQuote.bind(this);
    this.deleteQuoteAndRenderResponse =
      this.deleteQuoteAndRenderResponse.bind(this);
  }

  async renderHomeWithQuotes(req, res) {
    const quotes = await this.quotesDao.getAll();
    res.render("home", {
      quotes,
    });
  }

  async renderQuoteById(req, res) {
    const id = req.params.id;

    try {
      const quote = await this.quotesDao.getById(id);

      if (!quote) {
        res.status(404).render("404");
        return;
      }

      res.render("quote", {
        id,
        author: quote.author,
        quote: quote.quote,
        photo: quote.photo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).render("500");
    }
  }

  renderQuoteCreationForm(req, res) {
    res.render("quote-form");
  }

  async renderQuoteUpdateForm(req, res) {
    const id = req.params.id;

    try {
      const quote = await this.quotesDao.getById(id);

      if (!quote) {
        res.status(404).render("404");
        return;
      }

      res.render("quote-form", {
        id,
        author: quote.author,
        quote: quote.quote,
        photo: quote.photo,
      });
    } catch (error) {
      console.log(error);
      res.status(500).render("500");
    }
  }

  async insertAndRenderQuote(req, res) {
    const author = req.body.author;
    const authorQuote = req.body.quote;
    const photo = req.body.photo;

    const quote = { author, authorQuote, photo };

    try {
      const id = await this.quotesDao.create(quote);

      res.redirect(`/quotes/${id}`);
    } catch (error) {
      console.log(error);
      res.status(500).render("500");
    }
  }

  async updateAndRenderQuote(req, res) {
    const id = req.params.id;
    const author = req.body.author;
    const authorQuote = req.body.quote;
    const photo = req.body.photo;

    try {
      const quote = { author, authorQuote, id, photo };

      await this.quotesDao.update(quote);

      res.redirect(`/quotes/${id}`);
    } catch (error) {
      console.log(error);
      res.status(500).render("500");
    }
  }

  async deleteQuoteAndRenderResponse(req, res) {
    const id = req.params.id;

    try {
      const quote = await this.quotesDao.getById(id);

      if (!quote) {
        res.status(404).render("404");
        return;
      }

      await this.quotesDao.delete(id);

      res.render("quote-deleted", {
        id,
        author: quote.author,
      });
    } catch (error) {
      console.log(error);
      res.status(500).render("500");
    }
  }
}

module.exports = QuotesController;
