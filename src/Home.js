import React from "react";
import "./Home.css";

function Home() {
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

      <div>
        <form>
          <label htmlFor="business"></label>
          <input name="business" placeholder="search by name"></input>
          <label htmlFor="place"></label>
          <input name="place" placeholder="search by place"></input>
          <button type="submit">search!</button>
        </form>
      </div>

      <footer>powered by yelp-fusion</footer>
    </div>
  );
}

export default Home;
