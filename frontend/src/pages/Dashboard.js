import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const navigate = useNavigate();

  const pizzas = [

    {
      name: "Farmhouse",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591"
    },

    {
      name: "Veg Extravaganza",
      price: 349,
      image:
        "https://images.unsplash.com/photo-1548365328-9f547fb0953b"
    },

    {
      name: "Cheese Burst",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143"
    }

  ];

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div style={styles.container}>

      <div style={styles.navbar}>

        <h1>🍕 Pizza Palace</h1>

        <button
          onClick={logout}
          style={styles.logoutBtn}
        >
          Logout
        </button>

      </div>

      <h2 style={styles.heading}>
        Available Pizzas
      </h2>

      <div style={styles.cardContainer}>

        {
          pizzas.map((pizza, index) => (

            <div
              key={index}
              style={styles.card}
            >

              <img
                src={pizza.image}
                alt={pizza.name}
                style={styles.image}
              />

              <h3>{pizza.name}</h3>

              <p>
                ₹ {pizza.price}
              </p>

              <button
  style={styles.orderBtn}
  onClick={() => navigate("/builder")}
>
  Order Now
</button>

            </div>
          ))
        }

      </div>

    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background: "#f4f4f4",
    paddingBottom: "40px",
  },

  navbar: {
    background: "#ff512f",
    color: "white",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  logoutBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },

  heading: {
    textAlign: "center",
    marginTop: "30px",
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
    marginTop: "40px",
  },

  card: {
    width: "300px",
    background: "white",
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow:
      "0 4px 12px rgba(0,0,0,0.2)",
    textAlign: "center",
    paddingBottom: "20px",
  },

  image: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  orderBtn: {
    background: "#ff512f",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
};