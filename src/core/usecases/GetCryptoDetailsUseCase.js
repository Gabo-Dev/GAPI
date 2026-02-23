import { ALLOWED_UUIDS } from "../config/allowedAssets.js";

export class GetCryptoDetailsUseCase {
  constructor(cryptoRepository) {
    this.cryptoRepository = cryptoRepository;
  }

  async execute(uuid) {
    if (!uuid || typeof uuid !== "string") {
      return { error: "Valid crypto UUID is required" };
    }

    // Domain Rule: Security Layer 2 (Check whitelist)
    if (!ALLOWED_UUIDS.includes(uuid)) {
      return { error: "Crypto is not in whitelist" };
    }

    // The repository handles Cache and Fallback JSON.
    const result = await this.cryptoRepository.getCryptoDetails(uuid);
    
    return result;
  }
}