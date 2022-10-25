import {React, useState } from 'react'
import { Helmet } from 'react-helmet';
import Header from '../components/Header/Header'
import TabOptions from '../components/TabOptions/TabOptions';
import ExplorePage from './ExplorePage';
import SearchPage from './SearchPage';

const HomePage = () => {

    const [activeTab, setActiveTab] = useState("Explore");

  return (
    <div>
      <Helmet>
        <title>Ches-mess</title>
      </Helmet>
        {/* <Header /> */}
        <TabOptions activeTab={activeTab} setActiveTab={setActiveTab} />
      {getCorrectScreen(activeTab)}
    </div>
  )
}

const getCorrectScreen = (tab) => {
    switch (tab) {
      case "Search":
        return <SearchPage />;
  
      case "Explore":
        return <ExplorePage />;
  
      default:
        return <ExplorePage />;
    }
  }

export default HomePage