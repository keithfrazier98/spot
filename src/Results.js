import React from "react";

function Results({
  loading,
  loadingRipple,
  userMessage,
  userMessageElement,
  businessesResponseData,
  addFavorite,
}) {
  function formatSingleResult(responseData) {
    if (!responseData) return;
    const { image_url, name, categories, location, phone, price, rating } =
      responseData;

    const { display_address } = location;
    let starRating;

    switch (rating) {
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

    const basicData = `{"name":"${name}", "display_address":"${display_address}", "phone":"${phone}", "image_url":"${image_url}"}`
    return (
      <>
        <div className="singleResult">
          <div className="flexRow g1">
            <img src={image_url} className="mainImg" alt="businessImg"></img>
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
        ? businessesResponseData.map((responseDataPoint) =>
            formatSingleResult(responseDataPoint)
          )
        : formatSingleResult(businessesResponseData)}
    </div>
  );
}

export default Results;
