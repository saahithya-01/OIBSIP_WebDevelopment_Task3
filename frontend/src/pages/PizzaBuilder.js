import { useState } from "react";

export default function PizzaBuilder() {

  const [base, setBase] = useState("");
  const [sauce, setSauce] = useState("");
  const [cheese, setCheese] = useState("");
  const [veggies, setVeggies] = useState([]);

  const veggieOptions = [
    "Onion",
    "Capsicum",
    "Mushroom",
    "Corn",
    "Olives",
  ];

  const toggleVeggie = (veg) => {

    if (veggies.includes(veg)) {

      setVeggies(
        veggies.filter((v) => v !== veg)
      );

    } else {

      setVeggies([...veggies, veg]);
    }
  };

  const placeOrder = async () => {

  try {

    const orderData = {

      pizza: {
        base,
        sauce,
        cheese,
        veggies,
      },

      amount: 500,

      status: "Order Received",
    };

    await fetch(
      "http://localhost:5000/api/order/create",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify(orderData),
      }
    );

    alert("Order Placed 🍕");

  } catch (err) {

    console.log(err);

    alert("Failed To Place Order");
  }
};

  const razor = new window.Razorpay(options);

  razor.open();
};

  return (

    <div style={styles.container}>

      <div style={styles.card}>

        <h1>
          🍕 Build Your Pizza
        </h1>

        <label>
          Choose Base
        </label>

        <select
          value={base}
          onChange={(e) =>
            setBase(e.target.value)
          }
          style={styles.select}
        >

          <option value="">
            Select Base
          </option>

          <option>Thin Crust</option>

          <option>Cheese Burst</option>

          <option>Hand Tossed</option>

          <option>Fresh Pan</option>

          <option>Wheat Thin Crust</option>

        </select>

        <label>
          Choose Sauce
        </label>

        <select
          value={sauce}
          onChange={(e) =>
            setSauce(e.target.value)
          }
          style={styles.select}
        >

          <option value="">
            Select Sauce
          </option>

          <option>Tomato</option>

          <option>Barbeque</option>

          <option>Peri Peri</option>

          <option>Garlic</option>

          <option>Cheese Sauce</option>

        </select>

        <label>
          Choose Cheese
        </label>

        <select
          value={cheese}
          onChange={(e) =>
            setCheese(e.target.value)
          }
          style={styles.select}
        >

          <option value="">
            Select Cheese
          </option>

          <option>Mozzarella</option>

          <option>Cheddar</option>

          <option>Parmesan</option>

        </select>

        <label>
          Choose Veggies
        </label>

        <div style={styles.veggieBox}>

          {
            veggieOptions.map((veg) => (

              <button
                key={veg}
                onClick={() =>
                  toggleVeggie(veg)
                }
                style={{
                  ...styles.veggieBtn,

                  background:
                    veggies.includes(veg)
                      ? "#ff512f"
                      : "#eee",

                  color:
                    veggies.includes(veg)
                      ? "white"
                      : "black",
                }}
              >
                {veg}
              </button>
            ))
          }

        </div>

        <button
          style={styles.orderBtn}
          onClick={placeOrder}
        >
          Proceed To Payment
        </button>

      </div>

    </div>
  );


const styles = {

  container: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg,#ff512f,#dd2476)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },

  card: {
    width: "500px",
    background: "white",
    padding: "40px",
    borderRadius: "20px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.3)",
  },

  select: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  veggieBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "15px",
    marginBottom: "25px",
  },

  veggieBtn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  orderBtn: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#ff512f",
    color: "white",
    fontSize: "18px",
    cursor: "pointer",
  },
};