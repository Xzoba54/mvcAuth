require("dotenv").config();
const jwt = require("jsonwebtoken");
const db = require("../helpers/db");

class Jwt {
  constructor(payload, duration) {
    this.payload = payload;
    this.duration = duration;
  }
  async GenerateAccessToken() {
    const token = jwt.sign(this.payload, process.env.ACCESS_TOKEN, { expiresIn: this.duration });

    return token;
  }
  async GenerateRefreshToken() {
    const token = jwt.sign(this.payload, process.env.REFRESH_TOKEN, { expiresIn: this.duration });
    const sql = "INSERT INTO tokens VALUES(?)";
    await db.execute(sql, [token]);

    return token;
  }
  static async VerifyAccessToken(token) {
    let user;
    jwt.verify(token, process.env.ACCESS_TOKEN, (error, payload) => {
      if (error) return;
      user = payload;
    });
    return user;
  }
  static async VerifyRefreshToken(token) {
    let user;
    jwt.verify(token, process.env.REFRESH_TOKEN, (error, payload) => {
      if (error) return;
      user = payload;
    });

    if (!user) return;
    const sql = "SELECT * FROM tokens WHERE token = ?";
    const [result, _] = await db.execute(sql, [token]);

    if (!result[0]) return;
    return user;
  }
  static async findOne(token) {
    const sql = "SELECT * FROM tokens WHERE token = ?";
    const [result, _] = await db.execute(sql, [token]);

    return result[0];
  }
  static async deleteOne(token) {
    const sql = "SELECT * FROM tokens WHERE token = ?";
    const [result, _] = await db.execute(sql, [token]);

    if (result.length === 0) return false;

    const sql2 = "DELETE FROM tokens WHERE token = ?";
    await db.execute(sql2, [token]);

    return true;
  }
}
module.exports = Jwt;
