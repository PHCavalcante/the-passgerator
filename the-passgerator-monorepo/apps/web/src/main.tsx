import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Generator from "./components/Generator/Generator.tsx"
import { Background } from "./components/Background/Background.tsx"
import Header from "./components/Header/Header.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Background/>
      <Header/>
      <Generator/>
  </React.StrictMode>
)
