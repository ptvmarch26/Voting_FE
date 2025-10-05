import CryptoJS from "crypto-js";

export const encryptKey = (skHex, password) =>
  CryptoJS.AES.encrypt(skHex, password).toString();

export const decryptKey = (cipherText, password) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, password);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted || !/^[0-9a-f]{64}$/i.test(decrypted)) {
      return null;
    }

    return decrypted;
  } catch {
    return null;
  }
};
