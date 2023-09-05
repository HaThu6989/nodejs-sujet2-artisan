import React, { useEffect, useState } from "react";
import NavbarMenu from "../../pages/NavbarMenu";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateMaterial from "../Material/CreateMaterial";

function OneFurniture(props) {
  const { getAllMaterials, getAllFurnitures } = props;
  const [furniture, setFurniture] = useState(null);
  const { furnitureId } = useParams();

  useEffect(() => {
    getOneFurniture();
  }, []);

  const getOneFurniture = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/furnitures/${furnitureId}`)
      .then((response) => {
        const oneFurniture = response.data;
        setFurniture(oneFurniture);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <NavbarMenu />
      <Container className="my-4">
        {furniture && (
          <>
            <h3 className="font-link text-uppercase">{furniture.title}</h3>
            <p className="font-italic">{furniture.description}</p>
            <p>
              {furniture.model ? <strong>Model : </strong> : null}
              {furniture.model}
            </p>
            <CreateMaterial
              furnitureId={furnitureId}
              getAllMaterials={getAllMaterials}
              getAllFurnitures={getAllFurnitures}
            />
            {furniture.materials ? (
              <strong>Liste des matières premières</strong>
            ) : null}
            {furniture.materials?.map((elm) => {
              return (
                <li>
                  {elm.title} - {elm.compagny} - {elm.quantity}
                </li>
              );
            })}
          </>
        )}
      </Container>
    </div>
  );
}

export default OneFurniture;
