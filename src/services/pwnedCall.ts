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
      console.log(`Hash ${hash} encontrada com count: ${count}`);
      return`Hash ${hash} found with: ${count} records`;
    } else {
      console.log(`Hash ${hash} não encontrada`);
      return"No records found";
    }
  } catch (error:any) {
    console.error(error);
    return(error);
  }
}
