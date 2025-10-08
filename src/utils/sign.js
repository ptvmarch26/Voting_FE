export const signMessage = async (privKeyHex, messageHex) => {
  try {
    const msgBytes = Uint8Array.from(
      messageHex.match(/.{1,2}/g).map((b) => parseInt(b, 16))
    );

    const hashBuffer = await window.crypto.subtle.digest("SHA-256", msgBytes);
    const msgHash = new Uint8Array(hashBuffer);

    const ec = new (await import("elliptic")).ec("secp256k1");
    const keyPair = ec.keyFromPrivate(privKeyHex, "hex");
    const signature = keyPair.sign(msgHash, { canonical: true });

    const rHex = signature.r.toString("hex").padStart(64, "0");
    const sHex = signature.s.toString("hex").padStart(64, "0");
    return rHex + sHex;
  } catch {
    return null;
  }
};
