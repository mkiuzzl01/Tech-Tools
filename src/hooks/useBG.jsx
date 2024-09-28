import React, { useState } from "react";

const useBG = () => {
  const [isTransparent, setTransparent] = useState(false);
  return { isTransparent, setTransparent };
};

export default useBG;
