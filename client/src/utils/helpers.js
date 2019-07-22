export function safeJsonParse (str) {
  try {
    return [null, JSON.parse(str)]
  } catch (err) {
    return [err]
  }
}
