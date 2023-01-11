const salt = window.atob(import.meta.env.VITE_SNT_HASH ?? "");

export const createHash = async (string?: string) => {
  if (!salt || !string) return string ?? "";
  const enc = new TextEncoder();
  const algorithm = { name: "HMAC", hash: "SHA-256" };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(salt),
    algorithm,
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(string)
  );
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
