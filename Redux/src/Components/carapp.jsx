import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Car from "./car";
import useMySelector from "../Redux/mySelector";
import myDispatch from "../Redux/myDispatch";

export default function CarApp() {
  // Redux
  // const cars = useSelector((state) => state.cars);
  // const dispatch = useDispatch();

  // using custom "Provider" and "useSelector"
  const cars = useMySelector((state) => state.cars);
  const dispatch = myDispatch();

  const sellCarHandler = (id) => {
    dispatch({
      type: "CARS_DECREMENT",
      payload: id,
    });
  };

  const addStockHandler = (id) => {
    dispatch({
      type: "CARS_INCREMENT",
      payload: id,
    });
  };

  return (
    <div>
      {cars.map((car) => {
        return (
          <Car
            car={car}
            sellCarHandler={sellCarHandler}
            addStockHandler={addStockHandler}
            key={car.id}
          />
        );
      })}
    </div>
  );
}
