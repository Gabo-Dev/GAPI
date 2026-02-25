import { describe, it, expect } from "vitest";
import { CryptoAsset } from "./CryptoAsset.js";

describe("Domain Entity: CryptoAsset", () => {
  it("Should create a valid CryptoAsset", () => {
    // Arrange
    const validData = {
      uuid: "btc-1",
      name: "Bitcoin",
      symbol: "BTC",
      price: 64000,
      change24h: 2.5,
    };

    // Act
    const crypto = new CryptoAsset(validData);

    // Assert
    expect(crypto.name).toBe("Bitcoin");
    expect(crypto.symbol).toBe("BTC");
    expect(crypto.price).toBe(64000);
  });

  it("should throw error if no price (Defensive Validation)", () => {
    const invalidData = {
        uuid: 'btc-1',
        name: 'Bitcoin',
        symbol: 'BTC',
        // price is missing
    };

    // wrapp Act in a function to test for error throwing
    expect(() => new CryptoAsset(invalidData)).toThrowError();
  });
});
