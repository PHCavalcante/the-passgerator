import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Gerador from "./components/Gerador/Gerador.tsx"
import { Background } from "./components/Background/Background.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Background/>
      <Gerador/>
  </React.StrictMode>
)
