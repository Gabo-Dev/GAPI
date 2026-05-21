import { describe, it, expect } from "vitest";
import { formatPrice } from "./formatPrice.js";

describe("Utility: formatPrice", () => {
	it("should format numbers >= 1 with 2 decimals and $ prefix", () => {
		expect(formatPrice(64272.3)).toBe("$64,272.30");
		expect(formatPrice(1)).toBe("$1.00");
	});

	it("should format numbers < 1 with 4 decimals and $ prefix", () => {
		expect(formatPrice(0.137)).toBe("$0.1370");
		expect(formatPrice(0.005)).toBe("$0.0050");
	});

	it("should handle string inputs correctly", () => {
		expect(formatPrice("64000")).toBe("$64,000.00");
	});

	it('should return "$—" for invalid inputs', () => {
		expect(formatPrice(null)).toBe("$—");
		expect(formatPrice("not-a-number")).toBe("$—");
		expect(formatPrice(undefined)).toBe("$—");
	});
});
