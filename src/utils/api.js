const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);
    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();
    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

export async function getBusinessByArea({ business, location }, signal) {
  const url = new URL(
    `${API_BASE_URL}/businesses?business=${business}&location=${location}`
  );
  return await fetchJson(url, signal);
}

export async function getBusinessByPhone(phone, signal) {
  const url = new URL(`${API_BASE_URL}/businesses?phone=${phone}`);
  return await fetchJson(url, signal);
}

export async function getAllCategories(signal) {
  const url = new URL(`${API_BASE_URL}/categories`);
  return await fetchJson(url, signal);
}

export async function getAutocompleteSuggestions(params, signal) {
  //const {lat ="a", lon="b", text="b", loc = "en_US" } = params
  //?lat=${lat}&lon=${lon}&text=${text}&loc=${loc}
  const url = new URL(`${API_BASE_URL}/autocomplete`);
  return await fetchJson(url, signal);
}

export async function getAllBusinesses(params, signal) {
  const {
    latitude,
    longitude,
    open_now,
    location,
    price,
    sort_by,
    radius,
    term,
  } = params;
  console.log(params)
  const url = new URL(
    `${API_BASE_URL}/businesses/search?latitude=${latitude}&longitude=${longitude}&open_now=${open_now}&location=${location}&price=${price}&sort_by=${sort_by}&radius=${radius}&term=${term}`
  );
  return await fetchJson(url, signal);
}

