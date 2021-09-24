import React, { cloneElement, useState } from "react";
import "./Home.css";
import { getBusinessByArea, getBusinessByPhone } from "./utils/api";

function Home() {
  const initalSearchData = {
    business: "",
    location: "",
    type: "name and location",
    phone: "",
    categories: [],
  };
  const [responseData, setResponseData] = useState(false);
  const [searchData, setSearchData] = useState(initalSearchData);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);

  function modifySearch(event) {
    const name = event.target.name;
    if (name === "type") setLoading(false);
    const value = event.target.value;
    console.log(name, value);
    setSearchData({ ...searchData, [name]: value });
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
          console.log(response);
          break;
        case "phone":
          console.log("phone");
          response = await getBusinessByPhone(searchData.phone, signal);
          console.log(response);
          break;
      }
    } catch (err) {
      console.error(err);
      setSearchError(err);
      setLoading(false);
    }

    if (response) {
      const lastType = searchData.type;
      setSearchData({ ...initalSearchData, ["type"]: lastType });
      setResponseData(response);
      setSearchError(false);
      setLoading(false);
    }

    return () => abortController.abort;
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
          <div className="resultsRow g1">
            <img src={image_url} alt="businessImg"></img>
            <div className="resultsCol g2">
              <div className="resultsRow spcBtw ">
                <div className="resultsRow">
                  <t3>{name}</t3>
                  <div className="stars">{starRating}</div>
                </div>
                {<span>{price}</span>}
              </div>
              <div className="resultsRow">
                {categories.map((obj) => {
                  return <span className="categories">{obj.title}</span>;
                })}
              </div>
              <p>{`${display_address}`}</p>
              <div className="resultsRow spcBtw">
                <p>{<a href={`tel:${phone}`}>{phone}</a>}</p>
                <button className="fav">
                  {"Favorite "}
                  <ion-icon name="bookmark-outline"></ion-icon>
                </button>
              </div>
              <div className="resultsRow"></div>
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

      <div className="contentContainer">
        <div className="formContainer">
          <form onSubmit={processRequest}>
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
          </form>
        </div>

        <div className="resultsContainer">
          {loading ? "loading..." : formatSingleResult(responseData)}
        </div>
      </div>

      <footer>powered by yelp-fusion</footer>
    </div>
  );
}

export default Home;
