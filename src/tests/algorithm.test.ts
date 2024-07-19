import { algorithm } from "../utils/algorithm";

describe("algorithm", () => {
    it("the password returned lenght shoud be the same as specified in paramenter", () => {
        const lenghtItShouldBe = 8;
        expect(algorithm(true, true, true, true, false,lenghtItShouldBe).length).toBe(lenghtItShouldBe);
    })
    it("the password should have all characters specified in the parameters", () => {
        const password = algorithm(true, true, true, true, false, 12);

        // Test only for Lowercases  
        // expect(password).toMatch(/[a-z]/);

        // Test only for Uppercases
        // expect(password).toMatch(/[A-Z]/);

        // Test only for Numbers
        // expect(password).toMatch(/[0-9]/);

        // Test only for Symbols
        // expect(password).toMatch(/[!@#$%^&*(),.?:{}|<>]/);

        //Test for all characters
        expect(password).toMatch(/[a-z]/ && /[A-Z]/ && /[0-9]/ && /[!@#$%^&*(),.?:{}|<>]/);

        // Test for lower, upper and numbers
        //expect(password).toMatch(/[a-z]/ && /[A-Z]/ && /[0-9]/);
        
        // Test for lower, upper and symbols
        // expect(password).toMatch(/[a-z]/ && /[A-Z]/ && /[!@#$%^&*(),.?:{}|<>]/);

        // Test for lower and upper
        // expect(password).toMatch(/[a-z]/ && /[A-Z]/);

        // Test for lower, numbers and symbols
        // expect(password).toMatch(/[a-z]/ && /[A-Z]/ && /[0-9]/);

        // Test for lowers and numbers
        // expect(password).toMatch(/[a-z]/ && /[0-9]/);

        // Test for lowers and symbols
        // expect(password).toMatch(/[a-z]/ && /[!@#$%^&*(),.?:{}|<>]/);

        // Test for upper, numbers and symbols
        // expect([password]).toMatch(/[A-Z]/ && /[0-9]/ && /[!@#$%^&*(),.?:{}|<>]/);

        // Test uppers and numbers
        // expect(password).toMatch(/[A-Z]/ && /[0-9]/);

        // Test for upper and symbols
        // expect(password).toMatch(/[A-Z]/ && /[!@#$%^&*(),.?:{}|<>]/);

        // Test for numbers and symbols
        // expect(password).toMatch(/[0-9]/ && /[!@#$%^&*(),.?:{}|<>]/);
    })
})