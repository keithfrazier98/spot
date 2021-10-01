import React from "react";
import { getAutocompleteSuggestions } from "./utils/api";

function SearchBar({
  searchData,
  setSearchData,
  setLoading,
  getCoords,
  processRequest,
  loading,
}) {
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

  function openNav(event) {
  document.getElementById(event.target.dataset.for).style.width = "300px";
  }

  return (
    <>
      <div className="formContainer">
        <form
          onSubmit={
            loading
              ? (event) => {
                  event.preventDefault();
                }
              : processRequest
          }
        >
          <div className="flexCol">
            <div className="flexRow spcBtw menuBtns">
              <button
                className="catMenuBtn"
                type="button"
                data-for="catContContainer"
                onClick={openNav}
              >
                <ion-icon
                  data-for="catContContainer"
                  name="list-outline"
                ></ion-icon>
              </button>
              <button
                className="favMenuBtn"
                type="button"
                data-for="favContContainer"
                onClick={openNav}
              >
                <ion-icon
                  data-for="favContContainer"
                  name="star-outline"
                ></ion-icon>
              </button>
            </div>
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
                  <label htmlFor="location"></label>
                  <input
                    className="fade-in-image"
                    value={
                      searchData.latitude && searchData.longitute
                        ? "checking near you"
                        : searchData.location
                    }
                    name="location"
                    id="location"
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

              <button type="submit" id="search" className="fade-in-image">
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
            <input
              name="coords"
              id="coords"
              type="checkbox"
              onChange={getCoords}
            ></input>
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
            </select>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SearchBar;
