import React, { useState } from "react";
import Pipes from "./Pipes";
import Adapters from "./Adapters";

const index = ({ type }) => {
  const [openPipes, setOpenPipes] = useState(true);
  const [openFittings, setOpenFittings] = useState(false);

  const props = {
    openPipes,
    setOpenPipes,
    openFittings,
    setOpenFittings,
    type,
  };

  return (
    <>
      <Pipes {...props} />
      <hr className="my-5" />
      <Adapters {...props} />
    </>
  );
};

export default index;
