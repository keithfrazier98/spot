import React, { cloneElement, useEffect, useState } from "react";
import "./Home.css";
import {
  getAllBusinesses,
  getAllCategories,
  getAutocompleteSuggestions,
  getBusinessByArea,
  getBusinessByPhone,
} from "./utils/api";

function Home() {
  const initalSearchData = {
    business: "",
    location: "",
    type: "name and location",
    phone: "",
    categories: [],
    latitude: "",
    longitute: "",
    open_now: false,
    sort_by: "",
    price: "",
    radius: "",
  };
  const [businessesResponseData, setBusinessesResponseData] = useState(false);
  const [searchData, setSearchData] = useState(initalSearchData);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoriesResponseData, setCategoriesResponseData] = useState(false);

  useEffect(() => {
    //loadCategories()
    //processAutoComplete({lat:"a",lon:"b",text:"c"})
    searchAllBusinesses();
  }, []);

  async function searchAllBusinesses() {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const busObj = await getAllBusinesses(searchData, signal);
    setBusinessesResponseData(busObj);
    return () => abortController.signal;
  }

  async function loadCategories() {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const catObj = await getAllCategories(signal);
    setCategoriesResponseData(catObj);
    return () => abortController.signal;
  }

  function formatCategories(responseData) {
    if (!responseData) return;
    const categories = responseData;
    const parent_aliases = categories.map((cat) => cat.parent_aliases[0]);
    console.log("parents", parent_aliases);
    const parents = parent_aliases.map(() => {
      return <button>{parent_aliases[0]}</button>;
    });

    //const parentsSet = new Set(parents)
    return <p>hi</p>;
  }

  function modifySearch(event) {
    const name = event.target.name;
    if (name === "type") setLoading(false);
    const value = event.target.value;
    console.log(name, value);
    setSearchData({ ...searchData, [name]: value });
  }

  async function processAutoComplete() {
    getAutocompleteSuggestions().then(console.log);
    return <p>hi</p>;
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
          console.log("business");
          response = await getBusinessByArea(searchData, signal);
          console.log(response, "response from api");
          break;
        case "phone":
          const filteredNumber = validateNumber(searchData.phone);
          response = await getBusinessByPhone(filteredNumber, signal);
          console.log(response, "response from api");
          break;
      }
    } catch (err) {
      console.error("setting error", err);
      setSearchError(err);
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
      setBusinessesResponseData({
        noResponse: err.message,
      });
      return () => abortController.abort();
    }

    if (response) {
      const lastType = searchData.type;
      setSearchData({ ...initalSearchData, ["type"]: lastType });
      setBusinessesResponseData(response);
    } else {
      setBusinessesResponseData({
        noResponse: response.message,
      });
    }

    setLoading(false);
    setSearchError(false);

    return () => abortController.abort;
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

  function searchErrorElement() {
    return <div className="singleResult font400">{searchError.message}</div>;
  }

  function formatSingleResult(responseData) {
    if (!responseData) return;

    responseData = JSON.parse(responseData);

    const { image_url, name, categories, location, phone, price, rating } =
      responseData;

    const { display_address } = location;
    let starRating;

    console.log(rating);
    switch (rating) {
      case 1:
        starRating = <ion-icon name="star"></ion-icon>;
      case 1.5:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-half"></ion-icon>
          </>
        );
        break;
      case 2:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
          </>
        );
        break;
      case 2.5:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-half"></ion-icon>
          </>
        );
      case 3:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
          </>
        );
        break;
      case 3.5:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-half"></ion-icon>
          </>
        );
        break;
      case 4:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
          </>
        );
        break;
      case 4.5:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star-half"></ion-icon>
          </>
        );
        break;
      case 5:
        starRating = (
          <>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
            <ion-icon name="star"></ion-icon>
          </>
        );
        break;
    }
    console.log(starRating);

    return (
      <>
        <div className="singleResult">
          <div className="flexRow g1">
            <img src={image_url} alt="businessImg"></img>
            <div className="flexCol g2">
              <div className="flexRow spcBtw ">
                <div className="flexRow">
                  <t3>{name}</t3>
                  <div className="stars">{starRating}</div>
                </div>
                {<span>{price}</span>}
              </div>
              <div className="flexRow">
                {categories.map((obj) => {
                  return <span className="categories">{obj.title}</span>;
                })}
              </div>
              <p>{`${display_address}`}</p>
              <div className="flexRow spcBtw">
                <p>{<a href={`tel:${phone}`}>{phone}</a>}</p>
                <button className="fav">
                  {"Favorite "}
                  <ion-icon name="bookmark-outline"></ion-icon>
                </button>
              </div>
              <div className="flexRow"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="spotBody">
      <header>
        <div className="logo">
          <h1>spot</h1>
        </div>
        <h2>find your favorite</h2>
        <div className="box">
          <ul>
            <li className="item-1">spot</li>
            <li className="item-2">doctor</li>
            <li className="item-3">bar</li>
            <li className="item-4">dojo</li>
            <li className="item-5">library</li>
            <li className="item-6">spot</li>
          </ul>
        </div>
      </header>
      <div className="flexRow">
        <div className="flexCol centerVself contentContainer g3">
          <div className="centerVself">
            <h3>Categories</h3>
            {/*formatCategories(categoriesResponseData)*/}
          </div>
        </div>
        <div className="flexCol g1">
          <div className="contentContainer">
            <div className="formContainer">
              <form onSubmit={processRequest}>
                <div className="flexCol">
                  <div className="flexRow centerH">
                    <label htmlFor="open_now" className="filterOption centerVself">
                      Open now: <input name="open_now"  className="centerVself" type="checkbox"></input>
                    </label>{" "}
                    <label htmlFor="price" className="filterOption centerVself">
                      Price:
                    </label>
                    <select name="price">
                      <option>$</option>
                      <option>$$</option>
                      <option>$$$</option>
                      <option>$$$$</option>
                    </select>
                    <label htmlFor="radius" className="filterOption">
                      Distance
                    </label>
                    <select name="radius">
                      <option>5 miles</option>
                      <option>10 miles</option>
                      <option>15 miles</option>
                      <option>20 miles</option>
                      <option>25 miles</option>
                    </select>
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
                        <label htmlFor="place"></label>
                        <input
                          className="fade-in-image"
                          value={searchData.location}
                          name="location"
                          placeholder="search by location"
                          onChange={modifySearch}
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

            <div className="resultsContainer">
              {loading ? (
                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>
              ) : searchError ? (
                searchErrorElement()
              ) : businessesResponseData &&
                businessesResponseData.length > 1 ? (
                businessesResponseData.forEach((responseData) => {
                  formatSingleResult(responseData);
                })
              ) : (
                formatSingleResult(businessesResponseData)
              )}
            </div>
          </div>
        </div>
        <div className="flexCol contentContainer g3">
          <div className="centerVself">
            <h3>Your Favorites!</h3>
          </div>
        </div>
      </div>

      <footer>powered by yelp-fusion</footer>
    </div>
  );
}

export default Home;
