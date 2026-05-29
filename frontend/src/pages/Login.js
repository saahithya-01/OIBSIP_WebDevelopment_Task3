import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isLogin) {

        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        localStorage.setItem("token", res.data.token);

        navigate("/dashboard");

      } else {

        await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password,
          }
        );

        alert("Signup Successful ✅");

        setIsLogin(true);
      }

    } catch (err) {

      console.log(err);

      alert("Something went wrong ❌");
    }
  };

  return (

    <div style={styles.container}>

      <div style={styles.overlay}></div>

      <div style={styles.card}>

        <h1 style={styles.title}>
          🍕 Pizza Palace
        </h1>

        <p style={styles.subtitle}>
          {isLogin
            ? "Welcome Back!"
            : "Create Your Account"}
        </p>

        <form onSubmit={handleSubmit}>

          {
            !isLogin && (

              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={styles.input}
              />
            )
          }

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            style={styles.input}
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            style={styles.input}
          />

          <button
            type="submit"
            style={styles.button}
          >
            {
              isLogin
                ? "Login"
                : "Sign Up"
            }
          </button>

        </form>

        <p style={styles.switchText}>

          {
            isLogin
              ? "Don't have an account?"
              : "Already have an account?"
          }

          <span
            style={styles.switchBtn}
            onClick={() =>
              setIsLogin(!isLogin)
            }
          >
            {
              isLogin
                ? " Sign Up"
                : " Login"
            }
          </span>

        </p>

      </div>

    </div>
  );
}

const styles = {

  container: {
    height: "100vh",
    background:
      "linear-gradient(135deg, #ff512f, #dd2476)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Arial",
  },

  overlay: {
    position: "absolute",
    width: "700px",
    height: "700px",
    background:
      "rgba(255,255,255,0.08)",
    borderRadius: "50%",
    top: "-150px",
    right: "-150px",
    filter: "blur(50px)",
  },

  card: {
    width: "380px",
    padding: "40px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    boxShadow:
      "0 8px 32px rgba(0,0,0,0.25)",
    textAlign: "center",
    color: "white",
    zIndex: 2,
  },

  title: {
    fontSize: "38px",
    marginBottom: "10px",
  },

  subtitle: {
    marginBottom: "30px",
    color: "#f1f1f1",
    fontSize: "16px",
  },

  input: {
    width: "100%",
    padding: "14px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background:
      "rgba(255,255,255,0.2)",
    color: "white",
  },

  button: {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    background: "#ffffff",
    color: "#dd2476",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  switchText: {
    marginTop: "20px",
    fontSize: "15px",
    color: "#f1f1f1",
  },

  switchBtn: {
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};