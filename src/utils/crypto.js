import * as secp from "@noble/secp256k1";

const bytesToHex = (bytes) => {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

export const generateKeys = () => {
  const { secretKey: sk, publicKey: pk } = secp.keygen();

  const skHex = bytesToHex(sk);
  const pkHex = bytesToHex(pk);

  return { skHex, pkHex };
};