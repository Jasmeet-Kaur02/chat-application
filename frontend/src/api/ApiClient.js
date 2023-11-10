import { API_URL, localStorageKeys } from "../constants";

export class ApiClient {
  baseUrl = API_URL;

  formatUrl = (endpoint) => `${API_URL}${endpoint}`;

  async request(method, endpoint, data) {
    const url = this.formatUrl(endpoint);
    const contentType = data instanceof FormData ? null : "application/json";
    const apiConfig = {
      mode: "cors", // no-cors, *cors, same-origin
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        Accept: "application/json",
      },
    };
    contentType !== null &&
      apiConfig?.headers &&
      Object.assign(apiConfig?.headers, { "Content-Type": contentType });

    const token = await localStorage.getItem(
      localStorageKeys.loggedInUserToken
    );
    const parsedToken = token && JSON.parse(token);

    const tokenObj = { Authorization: `Bearer ${parsedToken}` };
    const configWithToken = {
      ...apiConfig,
      headers: {
        ...apiConfig.headers,
        ...(parsedToken && tokenObj),
      },
    };
    console.log(`${method} REQUEST: ${url}`);
    console.log("HEADER:", configWithToken);
    console.log("DATA:", data);

    const body = method !== "GET" && {
      body: data instanceof FormData ? data : JSON.stringify(data),
    };
    return await fetch(url, {
      ...configWithToken,
      method: method,
      ...body, // body data type must match "Content-Type" header
    })
      .then((response) => response.json())
      .catch((error) => error); // to handle system generated erros
  }

  async post(endpoint = "", data = {}) {
    return this.request("POST", endpoint, data);
  }

  async get(endpoint = "", data = {}) {
    return this.request("GET", endpoint, data);
  }

  async delete(endpoint = "", data = {}) {
    return this.request("DELETE", endpoint, data);
  }

  async put(endpoint = "", data = {}) {
    return this.request("PUT", endpoint, data);
  }

  async patch(endpoint = "", data = {}) {
    return this.request("PATCH", endpoint, data);
  }
}
