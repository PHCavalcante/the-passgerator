import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import Gerador from "./components/Gerador/Gerador.tsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Gerador/>
  </React.StrictMode>,
)
