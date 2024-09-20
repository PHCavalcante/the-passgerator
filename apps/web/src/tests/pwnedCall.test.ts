import { pwnedCall } from "../services/pwnedCall";

describe("pwnedcall", () => {
    it("should return some error if internet connection is bad or not working", async () => {
        expect(await pwnedCall("12345678")).toBe("Error: Please check your internet connection");
    })
})