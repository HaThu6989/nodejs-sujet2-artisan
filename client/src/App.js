import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import FurnituresList from "./components/Furniture/FurnituresList";
import Home from "./pages/Home";
import OneFurniture from "./components/Furniture/OneFurniture";
import CreateFurniture from "./components/Furniture/CreateFurniture";
import UpdateFurniture from "./components/Furniture/UpdateFurniture";

function App() {
  const [furnitures, setFurnitures] = useState([]);
  const [allMaterials, setAllMaterials] = useState([]);

  console.log("allMaterials", allMaterials);

  useEffect(() => {
    getAllFurnitures();
    getAllMaterials();
  }, []);

  const getAllFurnitures = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/furnitures`)
      .then((response) => {
        setFurnitures(response.data);
      })
      .catch((e) => console.log("error getting furnitures from API..."));
  };

  const getAllMaterials = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/materials`)
      .then((response) => {
        setAllMaterials(response.data);
      })
      .catch((e) =>
        console.log("error getting materials from API...", e.response.status)
      );
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/furnitures"
          element={
            <FurnituresList
              furnitures={furnitures}
              getAllFurnitures={getAllFurnitures}
            />
          }
        />
        <Route
          path="/furnitures/:furnitureId"
          element={
            <OneFurniture
              allMaterials={allMaterials}
              getAllMaterials={getAllMaterials}
              getAllFurnitures={getAllFurnitures}
            />
          }
        />
        <Route
          path="/createFurniture"
          element={
            <CreateFurniture
              allMaterials={allMaterials}
              getAllFurnitures={getAllFurnitures}
            />
          }
        />
        <Route
          path="/furnitures/:furnitureId/update"
          element={
            <UpdateFurniture
              allMaterials={allMaterials}
              furnitures={furnitures}
              getAllFurnitures={getAllFurnitures}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
