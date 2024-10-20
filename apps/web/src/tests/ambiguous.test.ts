import { ambiguousAlgorithm } from "@repo/shared-utils";

describe("ambiguous", () => {
    it("should return true for 'O0nb123'", () => {
        expect(ambiguousAlgorithm('O0nb123')).toBe(true);
    })
    it("should return false for an non ambiguous password like 'password123'", () => {
        expect(ambiguousAlgorithm('password123')).toBe(false);
    })
})