export function getRandomToken() {
  const alphaNumericString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let token = '';
  for (let i = 0; i < 16; i++) {
    token += alphaNumericString.charAt(
        Math.floor(Math.random() * alphaNumericString.length)
      )
  }
  return token
}
