const db = require("../helpers/db");

class Users {
  static async all() {
    const sql = "SELECT id, name, email, role FROM users";
    const [result, _] = await db.execute(sql);

    return result;
  }
}
module.exports = Users;
