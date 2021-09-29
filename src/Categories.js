import React, { useEffect } from "react";
import { getAllCategories } from "./utils/api";
import "./Home.css";


function Categories({ setCategoriesResponseData, categoriesResponseData, loadingRipple }) {
  useEffect(() => {
    loadCategories();
    //processAutoComplete({lat:"a",lon:"b",text:"c"})
  }, []);

  async function loadCategories() {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const catArr = await getAllCategories(signal);
    console.log(catArr);
    setCategoriesResponseData(catArr);
    return () => abortController.signal;
  }

  function formatCategory(responseData) {
    if (!responseData) return;
    return (
      <li className="catItem">
        <button className="catButton">{responseData}</button>
      </li>
    );
  }

  return (
    <div className="flexCol contentContainer g3">
      <div className="centerVself">
        <h3>Categories</h3>
      </div>
      <div className="catListDiv centerVself">
        <div className="divScroll">
          <ul className="catList">
            {categoriesResponseData ? (
              categoriesResponseData.map((cat) => formatCategory(cat))
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
