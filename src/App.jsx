import "./App.css";
import { useEffect, useState } from "react";
import MultiSelector from "./components/MultiSelector";
import ImageGrid from "./components/ImageGrid";

function App() {
  const [data, setData] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((promise) =>
        promise
          .json()
          .then((data) => data && data.message && setData(data.message))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-light" style={{backgroundColor: "gray"}}>
        {/* <span className="navbar-brand mb-0 h1">Buscar Perros</span> */}
        <MultiSelector data={data} setSelected={setSelected} />
      </nav>

      <ImageGrid data={selected} />
    </div>
  );
}

export default App;
