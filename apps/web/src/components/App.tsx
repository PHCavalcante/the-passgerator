import Generator from "./Generator.tsx"
import { Background } from "./Background.tsx"
import Header from "./Header.tsx"

const App = () => {
    return(
        <>
            <Background/>
            <Header/>
            <Generator/>
        </>
    );
}

export default App;