import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    loadOrders();

  }, []);

  const loadOrders = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/order/all"
    );

    setOrders(res.data);
  };

  const updateStatus = async (
    id,
    status
  ) => {

    await axios.put(
      `http://localhost:5000/api/order/status/${id}`,
      { status }
    );

    loadOrders();
  };

  return (

    <div style={styles.container}>

      <h1>
        🍕 Admin Dashboard
      </h1>

      {
        orders.map((order) => (

          <div
            key={order._id}
            style={styles.card}
          >

            <h2>
              {order.pizza.base}
            </h2>

            <p>
              Sauce:
              {order.pizza.sauce}
            </p>

            <p>
              Cheese:
              {order.pizza.cheese}
            </p>

            <p>
              Veggies:
              {
                order.pizza.veggies.join(
                  ", "
                )
              }
            </p>

            <h3>
              Status:
              {order.status}
            </h3>

            <div style={styles.btnBox}>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "In Kitchen"
                  )
                }
              >
                In Kitchen
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Out for Delivery"
                  )
                }
              >
                Delivery
              </button>

              <button
                onClick={() =>
                  updateStatus(
                    order._id,
                    "Delivered"
                  )
                }
              >
                Delivered
              </button>

            </div>

          </div>
        ))
      }

    </div>
  );
}

const styles = {

  container: {
    padding: "30px",
    background: "#f4f4f4",
    minHeight: "100vh",
  },

  card: {
    background: "white",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },

  btnBox: {
    display: "flex",
    gap: "10px",
  },
};