import { checkPasswordStrength } from "../utils/strenghtCheck";

describe("strenghtCheck", () => {
    it("Should return ['Very weak', 'Instantly'] if the password contain only numbers and it's lenght is from 4 to 11", () => {
        const password = "0123456789";
        const result = checkPasswordStrength(password);
        expect(result).toEqual(["Very weak", "Instantly"]);
    })
    it("Should return ['Very weak', 'Instantly'] if the password contain only 4 to 6 any characters with all chars or not", () => {
        const password = "abcd";
        const result = checkPasswordStrength(password);
        expect(result).toEqual(["Very weak", "Instantly"]);
    })
    it("Should return ['Very weak', 'Instantly] if the password contain only 4 to 6 characters with all characters types", () => {
        const password = "Abc12$";
        const result = checkPasswordStrength(password);
        expect(result).toEqual(["Very weak", "Instantly"]);
    })
    it("Should return ['Very weak', 'Seconds'] if the password contain only 7 chars if it containt at least 2 types of chars", () => {
        const password = "abc1234";
        const result = checkPasswordStrength(password);
        expect(result).toEqual(["Very weak", "Seconds"]);
    })
})