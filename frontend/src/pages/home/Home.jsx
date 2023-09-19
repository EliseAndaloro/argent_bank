import React from "react";
import "./home.css";
import Banner from "../../components/banner/Banner";
import FeaturesChat from "../../components/accueil/FeaturesChat";
import FeaturesMoney from "../../components/accueil/FeaturesMoney";
import FeaturesSecurity from "../../components/accueil/FeaturesSecurity";

const Home = () => {
  return (
    <div className="pageContainer">
      <Banner />
      <section className="features">
        <h2 className="sr-only">Features</h2>
        <FeaturesChat />
        <FeaturesMoney />
        <FeaturesSecurity />
      </section>
    </div>
  );
};

export default Home;