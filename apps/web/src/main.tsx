import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Generator from "./components/Generator.tsx"
import { Background } from "./components/Background.tsx"
import Header from "./components/Header.tsx"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <Background/>
      <Header/>
      <Generator/>
  </React.StrictMode>
)
