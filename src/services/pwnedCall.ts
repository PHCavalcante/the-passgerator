import { stringToHash } from "../utils/passToHash";
export async function pwnedCall(password: string) {
  const hash = stringToHash(password).toLocaleUpperCase();
  try {
    const response = await fetch(
      `https://api.pwnedpasswords.com/range/${hash}`,
      {
        method: "GET",
        mode: "cors",
      }
    );
    const lines = (await response.text()).split("\n");
    const foundLine = lines.find(line => line.startsWith(hash));
    if (foundLine) {
      const [hash, count] = foundLine.split(":");
      return`Hash ${hash} found with: ${count} records`;
    } else {
      return"No records found";
    }
  } catch (error:unknown) {
    return(`Unexpected error:, ${error}`);
  }
}
