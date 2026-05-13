import React from "react";

import PlumberCard from "./PlumberCard.jsx";
import StarRating from "./PlumberRating.jsx";
import InfoRow from "./InfoRow.jsx";
import PlumberDetail from "./PlumberDetail.jsx";
import ResultsPanel from "./ResultsPanel.jsx";
import PlumbingHero from "./PlumbingHiro.jsx";

function index() {
  return (
    <>
      <PlumbingHero/>
      <StarRating />
      <PlumberCard />
      <InfoRow />
      <PlumberDetail />
      <ResultsPanel />
    </>
  );
}

export default index;
