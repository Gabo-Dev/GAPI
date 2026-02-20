export class ApiClient {
  constructor(baseURL, apiKey, options = {}) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.timeout = options.timeout || 10000;
    this.retries = options.retries || 0;
    this.onRateLimit = options.onRateLimit || null;
  }

  async get(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const { params = {}, headers = {} } = options;

    // Build query string
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.apiKey,
          ...headers,
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      // Handle HTTP errors
      if (!response.ok) {
        const errorBody = await response.text().catch(() => "No response body");

        if (response.status === 429) {
          await this._handleRateLimit(endpoint);
        }
        
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorBody,
        );
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new ApiError(
          `Request timeout after ${this.timeout}ms`,
          408,
          "Timeout",
        );
      }

      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(`Network error: ${error.message}`, 0, error.message);
    }
  }

  async _handleRateLimit(endpoint){
    if(this.onRateLimit && typeof this.onRateLimit === 'function'){
      await this.onRateLimit(endpoint);
    }

    throw new ApiError("Rate limit exceeded", 429, "Rate limit exceeded");
  }

  _shouldRetry(error, attempt){
    if(attempt >= this.retries){
      return false;
    }

    if(error.isServerError() || error.status === 0){
      return true;
    }

    if(error.isRateLimit()){
      return false;
    }

    return false;
  }

  _getRetryDelay(attempt){
    // Backoff exponentially
    // Avoid overload API with inmediate retries
    const baseDelay = 1000;
    return baseDelay * attempt;
  }
}

export class ApiError extends Error {
  constructor(message, status, responseBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.responseBody = responseBody;
    this.timestamp = Date.now();
  }

  isRateLimit() {
    return this.status === 429;
  }

  isServerError() {
    return this.status >= 500 && this.status < 600;
  }

  isClientError() {
    return this.status >= 400 && this.status < 500;
  }
}
