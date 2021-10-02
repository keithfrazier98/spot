import React from "react";

function Results({
  loading,
  loadingRipple,
  userMessage,
  userMessageElement,
  businessesResponseData,
  addFavorite,

}) {
  function formatStars(num) {
    let starRating;

    switch (num) {
      case 1:
        starRating = <ion-icon name="star"></ion-icon>;
        break;
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
        break;
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
      default:
        console.error("Results: default case occured, something is wrong.");
        break;
    }

    return starRating;
  }

  function formatSingleResultLG(responseData) {
    if (!responseData) return;
    const { image_url, name, categories, location, phone, price, rating } =
      responseData;

    const { display_address } = location;

    const basicData = `{"name":"${name}", "display_address":"${display_address}", "phone":"${phone}", "image_url":"${image_url}"}`;
    return (
      <>
        <div className="singleResult">
          <div className="singleResultChild">
            <img src={image_url} className="mainImg" alt="businessImg"></img>
            <div className="flexCol g2">
              <div className="flexRow spcBtw ">
                <div className="flexRow" style={{ width: "fit-content" }}>
                  <h3 style={{ width: "fit-content" }}>{name}</h3>
                  <div className="stars">{formatStars(rating)}</div>
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
                <button
                  className="fav"
                  onClick={addFavorite}
                  data-basic-data={basicData}
                >
                  <ion-icon
                    className="centerH"
                    name="bookmark-outline"
                    data-basic-data={basicData}
                  ></ion-icon>
                </button>
              </div>
              <div className="flexRow"></div>
            </div>
          </div>
        </div>
      </>
    );
  }

  function formatSingleResultSM(responseData) {
    if (!responseData) return;
    const { image_url, name, categories, location, phone, price, rating } =
      responseData;

    const { display_address } = location;

    const basicData = `{"name":"${name}", "display_address":"${display_address}", "phone":"${phone}", "image_url":"${image_url}"}`;
    return (
      <>
        <div className="singleResult">
          <div className="flexCol g1">
            <h3 style={{ width: "fit-content", alignSelf: "center" }}>
              {name}
            </h3>
            <img
              src={image_url}
              className="mainImg"
              alt="businessImg"
              style={{ alignSelf: "center" }}
            ></img>
            <div className="flexCol g2">
              <div className="flexRow spcBtw ">
                <div className="flexRow" style={{ width: "fit-content" }}>
                  <div className="stars">{formatStars(rating)}</div>
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
                <button
                  className="fav"
                  onClick={addFavorite}
                  data-basic-data={basicData}
                >
                  <ion-icon
                    className="centerH"
                    name="bookmark-outline"
                    data-basic-data={basicData}
                  ></ion-icon>
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
    <div className="resultsContainer">
      {loading
        ? loadingRipple
        : userMessage
        ? userMessageElement()
        : businessesResponseData && Array.isArray(businessesResponseData)
        ? false
          ? businessesResponseData.map((responseDataPoint) =>
              formatSingleResultSM(responseDataPoint)
            )
          : businessesResponseData.map((responseDataPoint) =>
              formatSingleResultLG(responseDataPoint)
            )
        : formatSingleResultLG(businessesResponseData)}
    </div>
  );
}

export default Results;
