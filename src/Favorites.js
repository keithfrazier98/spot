import React from "react";

function Favorites({ favorites, deleteFavorite }) {
  function formatFavorites(item, index) {
    const { name, phone, display_address, image_url } = item;
    return (
      <div className="flexCol favItem" style={{ justifyContent: "center" }}>
        <div className="flexRow spcBtw">
          <t3>{name}</t3>{" "}
          <button className="favDltBtn" id={index} onClick={deleteFavorite}>
            <ion-icon name="trash-outline"></ion-icon>
          </button>
        </div>
        <div className="flexCol">
          <div className="flexRow" style={{ justifyContent: "center", margin:"0" }}>
            <img src={image_url} className="favImg" alt="businessImg"></img>
          </div>
          <p>{<a href={`tel:${phone}`}>{phone}</a>}</p>
          <p>{`${display_address}`}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favContContainer">
      <div className="centerVself">
        <h3>Your Spots!</h3>
      </div>
      <div
        style={{ margin: "0 20px 0 20px" }}
        className={`${
          favorites.length ? "favContainer" : "favContainer"
        } flexCol`}
      >
        {favorites.map((item, index) => formatFavorites(item, index))}
        {favorites.length ? null : (
          <div className="placeHolderFav">
            <p>
              Click the <ion-icon name="bookmark-outline"></ion-icon> button on the search results to save a spot!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
