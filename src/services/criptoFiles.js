const crypto = require("crypto");
const algorithm = process.env.CRYPTO_ALGORITHM;
const passCrypto = process.env.CRYPTO_PASSWORD;

const encryptText = (value) => {
  const iv = Buffer.from(crypto.randomBytes(16));
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(passCrypto), iv);
  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return `${iv.toString("hex")}:${encrypted.toString("hex")}`;
};

const decryptText = (value) => {
  const [iv, encrypted] = value.split(":");
  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(passCrypto),
    ivBuffer
  );
  let content = decipher.update(Buffer.from(encrypted, "hex"));
  content = Buffer.concat([content, decipher.final()]);
  return content.toString();
};

module.exports = {
  decryptText,
  encryptText,
};
