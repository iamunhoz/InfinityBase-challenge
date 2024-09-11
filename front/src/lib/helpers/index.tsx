import CryptoJS from "crypto-js"

// NOT IN USE
// Function to decrypt a token stored in localStorage
export function decryptToken() {
  const encryptedToken = localStorage.getItem("token")

  if (!encryptedToken) {
    return
  }

  const decryptionKey = "15878979798"

  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, decryptionKey)
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

    return decryptedToken
  } catch (error) {
    console.error("Failed to decrypt token:", error)
  }
}
