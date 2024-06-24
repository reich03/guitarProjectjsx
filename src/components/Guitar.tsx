import { Dispatch } from "react";
import { IGuitar } from "../data/db";
import { CartActions } from "../redurcers/cart-reducers";

type GuitarProps = {
  guitarra: IGuitar;
  dispatch: Dispatch<CartActions>;
};

export default function Guitar({ guitarra, dispatch }: GuitarProps) {
  const { id, name, image, description, price } = guitarra;
  // const handleClick = (guitarra) => {
  //     setCart([...cart, guitarra])
  // }
  return (
    <div className="col-md-6 col-lg-4 my-4 row align-items-center">
      <div className="col-4">
        <img
          className="img-fluid"
          src={`/img/${image}.jpg`}
          alt="imagen guitarra"
        />
      </div>
      <div className="col-8">
        <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
        <p>{description}</p>
        <p className="fw-black text-primary fs-3">{price}</p>
        <button
          onClick={() =>
            dispatch({ type: "add-to-cart", payload: { item: guitarra } })
          }
          type="button"
          className="btn btn-dark w-100"
        >
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
}
