class QuotesDAO {
  constructor(dbClient) {
    this.db = dbClient;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll() {
    const response = await this.db.query(
      "SELECT id, author, quote, photo FROM quotes ORDER BY created_at DESC"
    );
    const rows = response[0];
    return rows;
  }

  async getById(id) {
    const response = await this.db.query(
      "SELECT id, author, quote, photo FROM quotes WHERE id = ?",
      [id]
    );
    const rows = response[0];
    return rows[0];
  }

  async create(quote) {
    console.log(quote);
    const response = await this.db.query(
      "INSERT INTO quotes (author, quote, photo) VALUES (?, ?, ?)",
      [quote.author, quote.authorQuote, quote.photo]
    );
    const result = response[0];
    return result.insertId;
  }

  async update(quote) {
    const response = await this.db.query(
      "UPDATE quotes SET author = ?, quote = ?, photo = ? WHERE id = ?",
      [quote.author, quote.authorQuote, quote.photo, quote.id]
    );
    const result = response[0];
    return result;
  }

  async delete(id) {
    const response = await this.db.query("DELETE FROM quotes WHERE id = ?", [
      id,
    ]);
    const result = response[0];
    return result;
  }
}

module.exports = QuotesDAO;
