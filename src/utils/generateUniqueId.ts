/**
 * generateUniqueId
 * This function generates a unique identifier by combining a timestamp with a random alphanumeric string.
 * It is commonly used to create unique IDs for various purposes in applications.
 */
export function generateUniqueId(length: number = 16): string {
  const timestamp = new Date().getTime().toString(36);
  const randomString = Math.random()
    .toString(36)
    .substring(2, 2 + length - timestamp.length);

  return timestamp + randomString;
}
