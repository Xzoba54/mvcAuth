const db = require("../helpers/db");
const bcrypt = require("bcrypt");

class Auth {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
  async save() {
    this.password = await bcrypt.hash(this.password, 10);
    const sql = "INSERT INTO users(id, name, email, password, role) VALUES(?,?,?,?,?)";

    return db.execute(sql, [new Date().getTime(), this.name, this.email, this.password, "admin"]);
  }
  static async findOne(name, password) {
    const sql = "SELECT * FROM users WHERE name = ?";
    const [result, _] = await db.execute(sql, [name]);

    if (!result[0]) return false;
    if (!(await bcrypt.compare(password, result[0].password))) return false;

    return result[0];
  }
  static async deleteOne(id) {
    const sql = "DELETE FROM users WHERE id = ?";
    await db.execute(sql, [id]);

    return true;
  }
}
module.exports = Auth;
