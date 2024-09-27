const JWT=require("jsonwebtoken");
const bcrypt=require("bcrypt");

const hashPassword = async (password) => {
    const saltRounds = 12; // Bcrypt için gerekli tuz sayısı
    return await bcrypt.hash(password, saltRounds);
};

const generateAccessToken = (user) => {
  return JWT.sign({ email: user.email, ...user }, "asdsad", { expiresIn: "1w" });
};

const generateRefreshToken = (user) => {
  return JWT.sign({ email: user.email, ...user }, "asdsad", { expiresIn: "1w" });
};

  
module.exports = {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,

};
