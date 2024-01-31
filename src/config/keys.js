module.exports = {
  database: {
    host: process.env.DB_HOST,
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    url() {
      return `mongodb+srv://${this.username}:${this.password}@${this.host}/${this.name}?retryWrites=true&w=majority`;
    },
  },
  crypto: {
    password: process.env.CRYPTO_PASSWORD,
    algorithm: process.env.CRYPTO_ALGORITHM,
  },
};
