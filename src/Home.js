import React, { useState } from "react";
import Categories from "./Categories.js";
import Favorites from "./Favorites.js";
import Results from "./Results.js";
import SearchBar from "./SearchBar.js";
import "./Home.css";


function Home() {
  const initalSearchData = {
    business: "",
    location: "",
    type: "name and location",
    phone: "",
    categories: [],
    latitude: "",
    longitude: "",
    open_now: false,
    sort_by: "",
    price: "",
    radius: 8046,
    term: "",
    near_me: false,
  };
  const [businessesResponseData, setBusinessesResponseData] = useState(false);
  const [searchData, setSearchData] = useState(initalSearchData);
  const [searchError, setSearchError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoriesResponseData, setCategoriesResponseData] = useState([]);







  function searchErrorElement() {
    return <div className="singleResult font400">{searchError.message}</div>;
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
    <div className="spotBody">
      <header>
        <div className="logo">
          <h1>spot</h1>
        </div>
        <h2>find your favorite</h2>
        <div className="box">
          <ul className="ulScroll">
            <li className="item-1 liScroll">spot</li>
            <li className="item-2 liScroll">doctor</li>
            <li className="item-3 liScroll">bar</li>
            <li className="item-4 liScroll">dojo</li>
            <li className="item-5 liScroll">library</li>
            <li className="item-6 liScroll">spot</li>
          </ul>
        </div>
      </header>
      <div className="flexRow">
        <Categories
          categoriesResponseData={categoriesResponseData}
          loadingRipple={loadingRipple}
          setCategoriesResponseData={setCategoriesResponseData}
        />
        <div className="flexCol g1">
          <div className="contentContainer">
            <SearchBar
              searchData={searchData}
              setSearchData={setSearchData}
              setLoading={setLoading}
              setBusinessesResponseData={setBusinessesResponseData}
              setSearchError={setSearchError}
            />
            <Results
              loading={loading}
              loadingRipple={loadingRipple}
              searchError={searchError}
              searchErrorElement={searchErrorElement}
              businessesResponseData={businessesResponseData}
            />
          </div>
        </div>
        <Favorites />
      </div>

      <footer>powered by yelp-fusion</footer>
    </div>
  );
}

export default Home;
