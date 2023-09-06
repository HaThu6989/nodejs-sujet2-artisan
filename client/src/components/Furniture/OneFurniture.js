import React, { useEffect, useState } from "react";
import NavbarMenu from "../../pages/NavbarMenu";
import Container from "react-bootstrap/esm/Container";
import { useParams } from "react-router-dom";
import axios from "axios";
import CreateMaterial from "../Material/CreateMaterial";
import Table from "react-bootstrap/Table";
import UpdateMaterial from "../Material/UpdateMaterial";
import DeleteMaterial from "../Material/DeleteMaterial";

function OneFurniture(props) {
  const { allMaterials, getAllMaterials, getAllFurnitures } = props;
  const [furniture, setFurniture] = useState(null);
  const { furnitureId } = useParams();

  useEffect(() => {
    getOneFurniture();
    getAllMaterials();
    getAllFurnitures();
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

            <div style={{ marginBottom: 20, marginTop: 20 }}>
              <CreateMaterial
                furnitureId={furnitureId}
                getAllMaterials={getAllMaterials}
                getAllFurnitures={getAllFurnitures}
                getOneFurniture={getOneFurniture}
              />
            </div>

            {furniture.materials ? (
              <strong>Liste des matières premières</strong>
            ) : null}

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Titre</th>
                  <th>Compagnie</th>
                  <th>Quantité</th>
                  <th>Editer/Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {furniture.materials?.map((elm, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{elm.title}</td>
                      <td>{elm.compagny}</td>
                      <td>{elm.quantity}</td>
                      <td>
                        <div style={{ display: "flex" }}>
                          <UpdateMaterial
                            furnitureId={furnitureId}
                            material={elm}
                            getAllMaterials={getAllMaterials}
                            getAllFurnitures={getAllFurnitures}
                            getOneFurniture={getOneFurniture}
                          />
                          <DeleteMaterial
                            furnitureId={furnitureId}
                            material={elm}
                            getAllMaterials={getAllMaterials}
                            getAllFurnitures={getAllFurnitures}
                            getOneFurniture={getOneFurniture}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </div>
  );
}

export default OneFurniture;
