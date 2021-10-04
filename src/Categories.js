import React, { useEffect } from "react";
import { getAllBusinesses, getAllCategories } from "./utils/api";
import "./Home.css";
import FilterOptions from "./FilterOptions";

function Categories({
  setCategoriesResponseData,
  categoriesResponseData,
  loadingRipple,
  searchData,
  getCoords,
  setSearchData,
  processRequest,
  setUserMessage,
  closeNav,
}) {
  useEffect(() => {
    loadCategories();
  }, [searchData]);

  async function loadCategories() {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const catArr = await getAllCategories(signal);
    setCategoriesResponseData(catArr);
    return () => abortController.signal;
  }

  function searchBusinessesByCategory(event) {
    const category = event.target.innerHTML;
    const near_me = document.getElementById("coords");
    const coords = searchData.latitude && searchData.longitute;

    if (near_me.checked === false && coords === false) {
      const sendRequest = function () {
        setTimeout(() => {
          processRequest({ category: category });
        }, [2000]);
      };
      setUserMessage({ message: "Getting your coordinates..." });
      near_me.checked = true;
      getCoords();
      const targetNode = document.getElementById("location");
      const config = { attributes: true, childList: false, subtree: false };
      // Create an observer instance linked to the callback function
      const observer = new MutationObserver(sendRequest);
      // Start observing the target node for configured mutations
      observer.observe(targetNode, config);
    } else {
      setSearchData(
        { ...searchData, ["term"]: category },
        processRequest({ category: category })
      );
    }
  }

  function formatCategory(responseData, index) {
    if (!responseData) return;
    return (
      <li className="catItem" key={index} value={responseData}>
        <button
          onClick={searchBusinessesByCategory}
          disabled={!searchData.latitude && !searchData.longitute}
          className="catButton"
        >
          {responseData}
        </button>
      </li>
    );
  }

  return (
    <div className="catContContainer" id="catContContainer">
      <button
        className="catCloseBtn"
        type="button"
        data-for="catContContainer"
        onClick={closeNav}
      >
        <ion-icon data-for="catContContainer" name="close-outline"></ion-icon>
      </button>
      <div className="catFilters">
        <FilterOptions
          searchData={searchData}
          setSearchData={setSearchData}
          getCoords={getCoords}
        />
      </div>

      <div className="centerVself">
        <h3>Categories</h3>{" "}
      </div>
      <div
        className="centerVself catMessage"
        style={
          searchData.longitude ? { height: "0px" } : { height: "fit-content" }
        }
      >
        <p>Click 'Near me' to use categories!</p>
      </div>
      <div className="catListDiv centerVself">
        <div className="divScroll">
          <ul className="catList">
            {categoriesResponseData ? (
              categoriesResponseData.map((cat, index) =>
                formatCategory(cat, index)
              )
            ) : (
              <div className="catItem centerVself">{loadingRipple}</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Categories;
