import React from "react";
import NavbarMenu from "./NavbarMenu";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import Table from "react-bootstrap/esm/Table";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Chart(props) {
  const { allMaterials } = props;

  const quantityMaterial = (material) => {
    return allMaterials
      .filter((elm) => elm.title === material)
      .reduce((acc, currValue) => (acc += currValue.quantity), 0);
  };

  const data = {
    labels: ["frene", "chene", "noyer", "acier", "inox", "aluminum", "plastic"],
    datasets: [
      {
        label: "Quelles matières les plus utilisées?",
        data: [
          quantityMaterial("frene"),
          quantityMaterial("chene"),
          quantityMaterial("noyer"),
          quantityMaterial("acier"),
          quantityMaterial("inox"),
          quantityMaterial("aluminum"),
          quantityMaterial("plastic"),
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const materialTotal = [
    { title: "frene", quantity: quantityMaterial("frene") },
    { title: "chene", quantity: quantityMaterial("chene") },
    { title: "noyer", quantity: quantityMaterial("noyer") },
    { title: "acier", quantity: quantityMaterial("acier") },
    { title: "inox", quantity: quantityMaterial("inox") },
    { title: "aluminum", quantity: quantityMaterial("aluminum") },
    { title: "plastic", quantity: quantityMaterial("plastic") },
  ];
  return (
    <>
      <NavbarMenu />
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <div style={{ width: "70%", margin: 25 }}>
          <Bar data={data} />
        </div>
        <div style={{ width: "50%", margin: 25 }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Matière</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {materialTotal.map((elm, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{elm.title}</td>
                    <td>{elm.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Chart;
