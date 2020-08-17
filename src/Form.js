import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import "./Form.scss";
const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "name must be at least 2 characters long")
    .required(),
  size: yup.string().notOneOf(["--size--"], "please choose a pizza size"),
  tp_pepperoni: yup.boolean(),
  tp_sausage: yup.boolean(),
  tp_hamburger: yup.boolean(),
  tp_ham: yup.boolean(),
  specialInstructions: yup.string(),
});

function Form(props) {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    props.addToOrder(data);
    props.setFormVisible(false);
  };
  return (
    <div className="formContainer">
      <div className="formHeader">
        <h3>Order form</h3>
        <span
          id="closeButton"
          role="img"
          aria-label="close button"
          onClick={() => props.setFormVisible(false)}
        >
          ❌
        </span>
      </div>
      <div className="formBody">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label htmlFor="name">your name:</label>
            <input
              type="text"
              id="name"
              name="name"
              cy-data="name"
              ref={register}
            ></input>
            <p className="error">{errors.name?.message}</p>
          </div>
          <div className="formItem">
            <label htmlFor="size">pizza size:</label>
            <select id="size" name="size" cy-data="size" ref={register}>
              <option name="--size--">--size--</option>
              <option name="small">small</option>
              <option name="medium">medium</option>
              <option name="large">large</option>
            </select>
            <p className="error">{errors.size?.message}</p>
          </div>
          <div className="formItems">
            {Object.keys(schema.fields).map((k) => {
              if (k.includes("tp_")) {
                const topping = k.substr(3);
                return (
                  <label key={`tp_${topping}`} htmlFor={`tp_${topping}`}>
                    <input
                      type="checkbox"
                      name={`tp_${topping}`}
                      id={`tp_${topping}`}
                      cy-name={`tp_${topping}`}
                      ref={register}
                    />
                    {topping}
                  </label>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="formItem">
            <label htmlFor="specialInstructions">special instructions:</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              cy-data="specialInstructions"
              ref={register}
            />
          </div>
          <button type="submit">add to order</button>
        </form>
      </div>
    </div>
  );
}
export default Form;
