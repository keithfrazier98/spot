import React from "react";

function FilterOptions({ setSearchData, searchData, getCoords }) {
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

  return (
    <div className="filterContainer">
      <ul className="fade-in-image">
        <li className="filterItem">
          <div className="filterItemChecks" style={{justifyContent:"center"}}>
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
              className="filterSelect"
            ></input>
            <label htmlFor="open_now" className="filterOption">
              Open now
            </label>
            <input
              name="open_now"
              type="checkbox"
              onChange={modifyOpenNow}
              className="filterSelect"
            ></input>
          </div>
        </li>
        <li className="filterItem">
          <div className="filterItemSelects">
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
          </div>
        </li>
      </ul>
    </div>
  );
}

export default FilterOptions;
