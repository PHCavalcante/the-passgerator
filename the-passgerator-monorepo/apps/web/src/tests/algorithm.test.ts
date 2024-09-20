import { algorithm } from "../utils/algorithm";

describe("algorithm", () => {
    it("the password returned length should be the same as specified in parameter", () => {
        const lengthItShouldBe = 8;
        expect(algorithm(true, true, true, true, false,lengthItShouldBe).length).toBe(lengthItShouldBe);
    })
    it("the password should have all characters specified in the parameters", () => {
        const password = algorithm(true, true, true, true, false, 12);
        const array = [/[a-z]/.test(password), /[A-Z]/.test(password), /[0-9]/.test(password), /[!@#$%^&*(),.?:{}|<>]/.test(password)];

        expect(array).toBe([true, true, true, true]);
    })
})