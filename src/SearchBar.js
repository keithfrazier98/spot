import React from "react";
import FilterOptions from "./FilterOptions";

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
            <div className="menuBtns">
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
            <div className="inputField searchBarSelOpt">
              <select
                name="type"
                className="fade-in-image searchBarSelOpt"
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
                    className="fade-in-image searchBarSelOpt"
                    value={searchData.business}
                    name="business"
                    placeholder="search by name"
                    onChange={modifySearch}
                  ></input>
                  <label htmlFor="location"></label>
                  <input
                    className="fade-in-image searchBarSelOpt"
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
                    className="fade-in-image searchBarSelOpt"
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
      <div className="searchFilters">
        <FilterOptions
          searchData={searchData}
          setSearchData={setSearchData}
          getCoords={getCoords}
        />
      </div>
    </>
  );
}

export default SearchBar;
