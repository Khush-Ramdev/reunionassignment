import React, { useState, useEffect } from "react";
import List from "./List";
import alldata from "../data.json";

function Search() {
  //search with neighbourhood names or state names
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const defaultsearch = {
    location: "any",
    when: "any",
    price: "any",
    type: "any",
  };
  const [search, setSearch] = useState(defaultsearch);

  useEffect(() => {
    setData(alldata);
  }, []);

  useEffect(() => {
    console.log(search);
  }, [search]);

  useEffect(() => {
    results();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "location") {
      setSearch({ ...search, location: value });
    } else if (id === "when") {
      setSearch({ ...search, when: value });
    } else if (id === "price") {
      setSearch({ ...search, price: value });
    } else if (id === "type") {
      setSearch({ ...search, type: value });
    }
  };

  const handletext = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const results = () => {
    if (text !== "") {
      const results = alldata.filter(
        (property) =>
          property.state.toLowerCase().includes(text.toLowerCase()) ||
          property.neighborhood.toLowerCase().includes(text.toLowerCase())
      );
      setData(results);
    } else {
      setData(alldata);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let results = alldata;
    if (search.location !== "any") {
      results = results.filter(
        (property) => property.state === search.location
      );
    }
    if (search.when !== "any") {
      results = results.filter(
        (property) => parseInt(property.when) <= parseInt(search.when)
      );
    }
    if (search.price !== "any") {
      results = results.filter((property) => {
        console.log(
          parseInt(search.price.split("-")[0]),
          parseInt(search.price.split("-")[1]),
          parseInt(property.price)
        );
        console.log(
          parseInt(property.price) > parseInt(search.price.split("-")[0]) &&
            isNaN(parseInt(search.price.split("-")[1]))
            ? true
            : parseInt(property.price) < parseInt(search.price.split("-")[1])
        );
        return (
          parseInt(property.price) > parseInt(search.price.split("-")[0]) &&
          (isNaN(parseInt(search.price.split("-")[1]))
            ? true
            : parseInt(property.price) < parseInt(search.price.split("-")[1])
            ? true
            : false)
        );
      });
    }
    if (search.type !== "any") {
      results = results.filter((property) => property.type === search.type);
    }
    setData(results);
  };

  const locations = [...new Set(alldata.map((item) => item.state))];

  return (
    <div className="search">
      <div className="searchbar">
        <span className="searchbartext">Search properties to rent </span>
        <input
          type="text"
          value={text}
          onChange={handletext}
          placeholder={"search with searchbar"}
          className="searchbarinput"
        ></input>
      </div>
      <form className="searchform">
        <div className="option">
          {" "}
          <label htmlFor="location">Location</label>
          <select
            name="location"
            id="location"
            onChange={handleChange}
            valuelue={search.location}
            className="select"
          >
            <option value={"any"}>any</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/*  */}
        <div className="option">
          <label htmlFor="when">When</label>
          <select
            name="when"
            id="when"
            onChange={handleChange}
            valuelue={search.when}
            className="select"
          >
            <option value={"any"}>Select move in date</option>
            <option value={"0"}>Immediate</option>
            <option value={"15"}>In 15 days</option>
            <option value={"30"}>In 30 days</option>
            <option value={"45"}>In 45 days</option>
            <option value={"60"}>In 60 days</option>
          </select>
        </div>

        {/*  */}
        <div className="option">
          <label htmlFor="price">Price</label>
          <select
            name="price"
            id="price"
            onChange={handleChange}
            valuelue={search.price}
            className="select"
          >
            <option value={"any"}>Any</option>
            <option value={"0000-0500"}>$0-$500</option>
            <option value={"0500-2500"}>$500-$2500</option>
            <option value={"2500-3500"}>$2500-$3500</option>
            <option value={"3500-4500"}>$3500-$4500</option>
            <option value={"4500-"}>$4500+</option>
          </select>
        </div>

        {/*  */}
        <div className="option">
          <label htmlFor="type">Property Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            value={search.type}
            className="select"
          >
            <option value={"any"}>Any</option>
            <option value={"house"}>Houses</option>
            <option value={"apartment"}>Apartment</option>
            <option value={"condos"}>Condos</option>
            <option value={"townhouse"}>Town house</option>
          </select>
        </div>

        <button type="submit" onClick={handleSubmit} className="formsubmit">
          Search
        </button>
      </form>
      <List data={data} text={text} />
    </div>
  );
}

export default Search;
