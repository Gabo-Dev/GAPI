export class ApiClient {
  constructor(baseURL, apiKey) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
  }

  async get(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const { params = {}, headers = {} } = options;

    // Build query string
    const queryString = new URLSearchParams(params).toString();
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": this.apiKey,
        ...headers,
      },
    });

    // Handle HTTP errors
    if (!response.ok) {
      throw new ApiError(
        `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        await response.text(),
      );
    }

    return await response.json();
  }
}

export class ApiError extends Error {
  constructor(message, status, body) {
    super(message);
    this.status = status;
    this.body = body;
  }
}
