import React from "react";
import { createRoot } from "react-dom/client";
import CatScene from "./CatScene";

const Cat = () => {
  const catDiv = document.createElement("div");
  catDiv.id = "cat-container";
  if (catDiv) {
    const avatarRoot = createRoot(catDiv);
    avatarRoot.render(React.createElement(CatScene));
    document.body.appendChild(catDiv);
  }
  return catDiv;
};

export default Cat;
