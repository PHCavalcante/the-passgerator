import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Generator from "./components/Generator/Generator.tsx"
import { Background } from "./components/Background/Background.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Background/>
      <Generator/>
  </React.StrictMode>
)
