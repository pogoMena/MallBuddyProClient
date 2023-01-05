//import * as ReactDOMClient from "react-dom/client";
import ReactDOM from "react-dom";

import React from "react";
import App from "./App.js";


//const rootElement = document.getElementById("root");

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
//const root = ReactDOMClient.createRoot(rootElement);
//root.render(<App callback={() => console.log("renderered")} />);

