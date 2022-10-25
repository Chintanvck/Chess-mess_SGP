import React from 'react'
import activehome from "../../images/active_home.png"
import inactivehome from "../../images/inactive_home.png"
import activesearch from "../../images/active_search.png"
import inactivesearch from "../../images/inactive_search.png"
import "./TabOptions.css"
import { Link } from 'react-router-dom'

const tabs = [
    {
        id: 1,
        name: "Search",
        active_img:"https://res.cloudinary.com/dabcooro5/image/upload/v1666693842/active_search_vdtghy.png",
        backdrop: "#FCEEC0",
        inactive_img:"https://res.cloudinary.com/dabcooro5/image/upload/v1666693842/inactive_search_ygsjul.png",
      },
      {
        id: 2,
        name: "Explore",
        active_img:"https://res.cloudinary.com/dabcooro5/image/upload/v1666693842/active_home_vd7cun.png",
        backdrop: "#EDf4FF",
        inactive_img:"https://res.cloudinary.com/dabcooro5/image/upload/v1666693842/inactive_home_iy9xb1.png",
      },
]

const TabOptions = ({ activeTab, setActiveTab }) => {
    return (
      <div className="tab-options">
        <div className="options-wrapper max-width">
          {tabs.map((tab) => (
            <div key={tab.id}
              className={`tab-item absolute-center cur-po ${
                activeTab === tab.name && "active-tab"
              }`}
              onClick={() => setActiveTab(tab.name)
              }
            >
              <div
                className="tab-image-container absolute-center"
                style={{
                  backgroundColor: `${
                    activeTab === tab.name ? tab.backdrop : ""
                  }`,
                }}
              >
                <img
                  src={activeTab === tab.name ? tab.active_img : tab.inactive_img}
                  className="tab-image"
                  alt={tab.name}
                />
              </div>
              <div className="tab-name">{tab.name}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default TabOptions;