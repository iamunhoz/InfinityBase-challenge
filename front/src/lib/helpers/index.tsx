import CryptoJS from "crypto-js"

// NOT IN USE
// Function to decrypt a token stored in localStorage
export function decryptToken() {
  // Read token from localStorage
  const encryptedToken = localStorage.getItem("token")

  // Ensure token exists
  if (!encryptedToken) {
    // console.log("No token found in localStorage")
    return
  }

  // Decryption key (this should match the key used for encryption)
  const decryptionKey = "mySecretKey123" // Replace with your actual key

  try {
    // Decrypt the token
    const bytes = CryptoJS.AES.decrypt(encryptedToken, decryptionKey)
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8)

    // Log the decrypted token
    // console.log("Decrypted token:", decryptedToken)
  } catch (error) {
    console.error("Failed to decrypt token:", error)
  }
}
