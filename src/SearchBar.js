import React from "react";
import { getBusinessByPhone, getAllBusinesses, getAutocompleteSuggestions } from "./utils/api";

function SearchBar({
  searchData,
  setSearchData,
  setLoading,
  setBusinessesResponseData,
  setSearchError,
}) {
  async function processAutoComplete() {
    getAutocompleteSuggestions().then(console.log);
    return <p>hi</p>;
  }

  function getCoords(event) {
    if (event.target.checked) {
      if (navigator.geolocation) {
        console.log("setting coordinates");
        navigator.geolocation.getCurrentPosition((result) => {
          setSearchData({
            ...searchData,
            latitude: result.coords.latitude,
            longitude: result.coords.longitude,
            near_me: true,
          });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    } else {
      setSearchData({
        ...searchData,
        latitude: "",
        longitude: "",
        near_me: false,
      });
    }

    //console.log(coords.latitude, coords.longitude);
  }

  function modifySearch(event) {
    const name = event.target.name;
    if (name === "type") setLoading(false);
    const value = event.target.value;

    //term set when business is set, term will always be business
    name === "business"
      ? setSearchData({ ...searchData, ["term"]: value, [name]: value })
      : setSearchData({ ...searchData, [name]: value });
  }

  function modifyRadius(event) {
    const value = event.target.value;
    const milesArr = [value[0], value[1]];
    const milesNum = Number(milesArr.join(""));
    if (milesArr[0] === "5") {
      setSearchData({ ...searchData, ["radius"]: 8046 });
    } else {
      setSearchData({
        ...searchData,
        ["radius"]: Math.trunc(1609.344 * milesNum),
      });
    }
  }

  function modifyPrice(event) {
    let price;
    switch (event.target.value) {
      case "$":
        price = "1";
        break;
      case "$$":
        price = "1,2";
        break;
      case "$$$":
        price = "1,2,3";
        break;
      case "$$$$":
        price = "1,2,3,4";
        break;
      default:
        console.error("SearchBar: default case occured, something is wrong.");

        break;
    }

    setSearchData({ ...searchData, ["price"]: price });
  }

  function modifyOpenNow(event) {
    setSearchData({ ...searchData, ["open_now"]: !searchData.open_now });
  }

  function validateNumber(phoneNumber) {
    let disected = phoneNumber.split("");
    let filtered = disected.filter((char) =>
      isNaN(Number(char)) || char === " " ? null : char
    );
    let finalString = filtered.join("");

    console.log(finalString, "finalString");
    return finalString;
  }

  async function processRequest(event) {
    event.preventDefault();
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let response;
    try {
      switch (searchData.type) {
        case "name and location":
          //this was getBusinessByArea, switched to search all businesses
          console.log(searchData);
          response = await getAllBusinesses(searchData, signal);
          response = JSON.parse(response);
          setBusinessesResponseData(response.businesses);
          break;
        case "phone":
          const filteredNumber = validateNumber(searchData.phone);
          response = await getBusinessByPhone(filteredNumber, signal);
          response = JSON.parse(response);
          setBusinessesResponseData(response);
          break;
        default:
          console.error("SearchBar: default case occured, something is wrong.");

          break;
      }
    } catch (err) {
      setSearchError(err);
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
      setBusinessesResponseData({
        noResponse: err.message,
      });
      return () => abortController.abort();
    }

    setLoading(false);
    setSearchError(false);

    return () => abortController.abort;
  }

  return (
    <>
      <div className="formContainer">
        <form onSubmit={processRequest}>
          <div className="flexCol">
            <div className="flexRow">
              <select
                name="type"
                className="fade-in-image"
                value={searchData.type}
                onChange={modifySearch}
              >
                <option>name and location</option>
                <option>phone</option>
              </select>
              {searchData.type === "name and location" ? (
                <>
                  {" "}
                  <label htmlFor="business"></label>
                  <input
                    className="fade-in-image"
                    value={searchData.business}
                    name="business"
                    placeholder="search by name"
                    onChange={modifySearch}
                  ></input>
                  <label htmlFor="place"></label>
                  <input
                    className="fade-in-image"
                    value={
                      searchData.near_me
                        ? "checking near you"
                        : searchData.location
                    }
                    name="location"
                    placeholder="search by location"
                    onChange={modifySearch}
                    disabled={searchData.near_me}
                  ></input>
                </>
              ) : (
                <>
                  <input
                    className="fade-in-image"
                    value={searchData.phone}
                    name="phone"
                    placeholder="search by phone"
                    onChange={modifySearch}
                  ></input>
                </>
              )}

              <button type="submit" className="fade-in-image">
                search!
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flexRow centerH">
        <ul className="fade-in-image">
          <li className="filterItem">
            <label
              htmlFor="coords"
              style={{ marginLeft: "0" }}
              className="filterOption"
            >
              Near me
            </label>
            <input name="coords" type="checkbox" onChange={getCoords}></input>
          </li>
          <li className="filterItem">
            <label htmlFor="open_now" className="filterOption">
              Open now
            </label>
            <input
              name="open_now"
              type="checkbox"
              onChange={modifyOpenNow}
            ></input>
          </li>
          <li className="filterItem">
            <label
              htmlFor="price"
              style={{ marginRight: "15px" }}
              className="filterOption"
            >
              Price{"   "}
            </label>
            <select name="price" onChange={modifyPrice}>
              <option>$</option>
              <option>$$</option>
              <option>$$$</option>
              <option>$$$$</option>
            </select>
          </li>
          <li className="filterItem">
            <label
              htmlFor="radius"
              style={{ marginRight: "15px" }}
              className="filterOption"
            >
              Distance
            </label>
            <select name="radius" onChange={modifyRadius}>
              <option>5 miles</option>
              <option>10 miles</option>
              <option>15 miles</option>
              <option>20 miles</option>
              <option>25 miles</option>
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SearchBar;
