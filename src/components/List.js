import React, { useEffect } from "react";
import bed from "../assests/bed.png";
import bath from "../assests/bath.png";
import size from "../assests/size.png";

function List({ data }) {
  useEffect(() => {
    console.log(data);
  }, [data]);
  const list = data.map((property, index) => {
    return (
      <div key={index} className="card">
        <div className="propertyimage">
          <img
            src={property.img}
            alt="not available"
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = "/noimage.jpg";
            }}
          />
        </div>
        <div className="propertydetails">
          <div className="price">
            {"$"}
            {property.price}
            <span className="month">/month</span>
          </div>
          <div className="neighborhood">{property.neighborhood}</div>
          <div className="housetype">
            <div>
              {property.type === "townhouse"
                ? "Town House"
                : property.type === "house"
                ? "House"
                : property.type === "condo"
                ? "Condominium"
                : "Apartment"}
            </div>
            <div>
              {parseInt(property.when) === 0
                ? "Immediate"
                : parseInt(property.when) <= 15
                ? "In 15 days"
                : parseInt(property.when) === 30
                ? "In 30 days"
                : "In 45 days"}
            </div>
          </div>
          <div className="address">{property.state}</div>
          <div className="bedbathsize">
            <div className="bed">
              <div className="icon">
                <img src={bed} alt="bed:"></img>
              </div>
              {property.bed}
              {" Bed"}
              {parseInt(property.bed) > 1 ? "s" : ""}
            </div>
            <div className="bath">
              <div className="icon">
                <img src={bath} alt="bath:"></img>
              </div>
              {property.bath} {" Bathroom"}
              {parseInt(property.bath) > 1 ? "s" : ""}
            </div>
            <div className="size">
              <div className="icon">
                <img src={size} alt="size:"></img>
              </div>
              {property.size}
              {" m"}
              <sup>2</sup>
            </div>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="list">
      {list.length > 0 ? (
        list
      ) : (
        <span className="noresult">No results Found</span>
      )}
    </div>
  );
}

export default List;
