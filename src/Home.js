import React, { useEffect, useState } from "react";
import Categories from "./Categories.js";
import Favorites from "./Favorites.js";
import Results from "./Results.js";
import SearchBar from "./SearchBar.js";
import { getAllBusinesses, getBusinessByPhone } from "./utils/api.js";
import "./Home.css";

function Home() {
  const initalSearchData = {
    business: "",
    location: "",
    type: "name and location",
    phone: "",
    latitude: "",
    longitude: "",
    open_now: false,
    sort_by: "",
    price: "",
    radius: 8046,
    term: "",
    near_me: true,
  };
  const [businessesResponseData, setBusinessesResponseData] = useState(false);
  const [searchData, setSearchData] = useState(initalSearchData);
  const [userMessage, setUserMessage] = useState({
    message: "Your search results will show up here!",
  });
  const [loading, setLoading] = useState(false);
  const [categoriesResponseData, setCategoriesResponseData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!searchData.latitude && !searchData.longitude) {
      setLoading(true);
      getCoords();
    }
  }, []);

  function getCoords() {
    setLoading(true);
    const abortController = new AbortController();
    if (!searchData.latitude && !searchData.longitude) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((result) => {
          setSearchData(
            {
              ...searchData,
              latitude: result.coords.latitude,
              longitude: result.coords.longitude,
              near_me: true,
            },
            setLoading(false)
          );
        });
      } else {
        setUserMessage("Geolocation is not supported by this browser.");
      }
    } else {
      setSearchData({
        ...searchData,
        latitude: "",
        longitude: "",
        near_me: false,
      });
      setLoading(false);
    }
    return () => abortController.abort();
  }

  function validateNumber(phoneNumber) {
    let disected = phoneNumber.split("");
    let filtered = disected.filter((char) =>
      isNaN(Number(char)) || char === " " ? null : char
    );
    let finalString = filtered.join("");
    return finalString;
  }

  async function processRequest(event) {
    if (event && event.target) event.preventDefault();
    setLoading(true);
    const abortController = new AbortController();
    const signal = abortController.signal;
    let response;
    try {
      switch (searchData.type) {
        case "name and location":
          //this was getBusinessByArea, switched to search all businesses
          if (event.category) {
            response = await getAllBusinesses(
              { ...searchData, ["term"]: event.category },
              signal
            );
          } else {
            response = await getAllBusinesses(searchData, signal);
          }
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
      setUserMessage(err);
      setTimeout(() => {
        setLoading(false);
      }, [1000]);
      setBusinessesResponseData({
        noResponse: err.message,
      });
      return () => abortController.abort();
    }

    setLoading(false);
    setUserMessage(false);

    return () => abortController.abort;
  }

  function userMessageElement() {
    return <div className="singleResult font300">{userMessage.message}</div>;
  }

  function addFavorite(event) {
    const data = event.target.dataset.basicData;
    const json = JSON.parse(data);
    if (!favorites.includes(json)) {
      const newFavorites = [json];
      newFavorites.push(...favorites);
      setFavorites(newFavorites);
    }
  }

  function deleteFavorite(event) {
    const index = event.target.id;
    const newFavorites = [...favorites];
    newFavorites.splice(index, 1);
    setFavorites(newFavorites);
  }

  function closeNav(event) {
    document.getElementById(event.target.dataset.for).style.width = "0px";
  }

  const loadingRipple = (
    <>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </>
  );

  return (
    <>
      <div className="tooSmall">
        <h6 className="tooSmallT">
          Your screen is too small for all this website!
        </h6>
        <p className="tooSmallT">(Min Screen Size: 290px)</p>
      </div>
      <div className="spotBody">
        <header>
          <div className="logo">
            <h1>spot</h1>
          </div>
          <div className="flexRow" style={{ justifyContent: "center" }}>
            <h2>find your favorite</h2>
            <div className="box">
              <ul className="ulScroll">
                <li className="item-1 liScroll" key="1">
                  spot
                </li>
                <li className="item-2 liScroll" key="2">
                  doctor
                </li>
                <li className="item-3 liScroll" key="3">
                  bar
                </li>
                <li className="item-4 liScroll" key="4">
                  dojo
                </li>
                <li className="item-5 liScroll" key="5">
                  library
                </li>
                <li className="item-6 liScroll" key="6">
                  spot
                </li>
              </ul>
            </div>
          </div>
        </header>
        <div className="allContentContainer">
          <Categories
            categoriesResponseData={categoriesResponseData}
            loadingRipple={loadingRipple}
            setCategoriesResponseData={setCategoriesResponseData}
            searchData={searchData}
            getCoords={getCoords}
            setSearchData={setSearchData}
            processRequest={processRequest}
            setUserMessage={setUserMessage}
            closeNav={closeNav}
          />
          <div className="resultsContainer">
            <div className="contentContainer">
              <SearchBar
                searchData={searchData}
                setSearchData={setSearchData}
                setLoading={setLoading}
                setBusinessesResponseData={setBusinessesResponseData}
                setUserMessage={setUserMessage}
                getCoords={getCoords}
                loading={loading}
                processRequest={processRequest}
              />
              <Results
                loading={loading}
                loadingRipple={loadingRipple}
                userMessage={userMessage}
                userMessageElement={userMessageElement}
                businessesResponseData={businessesResponseData}
                addFavorite={addFavorite}
              />
            </div>
          </div>
          <Favorites
            favorites={favorites}
            deleteFavorite={deleteFavorite}
            closeNav={closeNav}
          />
        </div>
        <footer>powered by yelp-fusion</footer>
      </div>
    </>
  );
}

export default Home;
