
import React, { useState } from "react";

export default function AdminDashboard() {
  const [inventory, setInventory] = useState([
    { id: 1, name: "Pizza Base", stock: 45 },
    { id: 2, name: "Tomato Sauce", stock: 30 },
    { id: 3, name: "Mozzarella Cheese", stock: 25 },
    { id: 4, name: "Vegetables", stock: 60 },
    { id: 5, name: "Mushrooms", stock: 18 },
  ]);

  const [orders, setOrders] = useState([
    { id: "#1001", customer: "Rahul Sharma", pizza: "Cheese Burst", amount: 500, status: "Preparing" },
    { id: "#1002", customer: "Priya Verma", pizza: "Farmhouse", amount: 450, status: "Delivered" },
    { id: "#1003", customer: "Amit Kumar", pizza: "Veg Supreme", amount: 550, status: "Pending" },
  ]);

  const [newItem, setNewItem] = useState("");
  const [newStock, setNewStock] = useState("");

  const updateStock = (id, value) => {
    setInventory(inventory.map(item =>
      item.id === id
        ? { ...item, stock: Math.max(0, Number(value)) }
        : item
    ));
  };

  const addItem = () => {
    if (!newItem.trim() || newStock === "") return;

    setInventory([
      ...inventory,
      {
        id: Date.now(),
        name: newItem,
        stock: Number(newStock),
      },
    ]);

    setNewItem("");
    setNewStock("");
  };

  const updateStatus = (id, status) => {
    setOrders(orders.map(order =>
      order.id === id ? { ...order, status } : order
    ));
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f4f5f9",
      fontFamily: "Arial, sans-serif",
      color: "#24243a",
    },
    sidebar: {
      width: "220px",
      background: "#202038",
      color: "white",
      padding: "25px",
      minHeight: "100vh",
      boxSizing: "border-box",
    },
    layout: {
      display: "flex",
      minHeight: "100vh",
    },
    main: {
      flex: 1,
      padding: "30px",
      minWidth: 0,
    },
    card: {
      background: "white",
      padding: "22px",
      borderRadius: "12px",
      boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
    },
    stats: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))",
      gap: "18px",
      margin: "25px 0",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "7px",
      marginRight: "8px",
      marginBottom: "8px",
    },
    button: {
      background: "#f15a35",
      color: "white",
      border: "none",
      borderRadius: "7px",
      padding: "10px 16px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
    },
    cell: {
      padding: "14px 10px",
      borderBottom: "1px solid #eee",
    },
  };

  return (
    <div style={styles.layout}>
      <aside style={styles.sidebar}>
        <h2>🍕 Pizza Palace</h2>
        <p style={{ color: "#aaa", marginTop: 8 }}>ADMIN PANEL</p>
        <hr style={{ borderColor: "#444", margin: "25px 0" }} />
        <p>📊 Dashboard</p>
        <p>📦 Inventory</p>
        <p>🛒 Orders</p>
        <p>👥 Customers</p>
        <p>⚙️ Settings</p>
        <button
          style={{ ...styles.button, marginTop: 35 }}
          onClick={() => window.location.href = "/dashboard"}
        >
          Back to Website
        </button>
      </aside>

      <main style={styles.main}>
        <h1>Admin Dashboard</h1>
        <p style={{ color: "#888" }}>
          Welcome back, Admin! Here's your store overview.
        </p>

        <div style={styles.stats}>
          {[
            ["Total Orders", orders.length, "🛒"],
            ["Total Customers", 125, "👥"],
            ["Total Revenue", "₹1,500", "💰"],
            ["Inventory Items", inventory.length, "📦"],
          ].map((item, index) => (
            <div style={styles.card} key={index}>
              <h3>{item[2]} {item[0]}</h3>
              <h1 style={{ color: "#f15a35", marginTop: 15 }}>
                {item[1]}
              </h1>
            </div>
          ))}
        </div>

        <section style={{ ...styles.card, marginBottom: 25 }}>
          <h2>📦 Inventory Management</h2>
          <p style={{ color: "#888", margin: "8px 0 20px" }}>
            Edit stock quantities and add new items.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.cell}>Item</th>
                  <th style={styles.cell}>Available Stock</th>
                  <th style={styles.cell}>Stock Status</th>
                  <th style={styles.cell}>Edit Stock</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map(item => (
                  <tr key={item.id}>
                    <td style={styles.cell}>{item.name}</td>
                    <td style={styles.cell}>{item.stock}</td>
                    <td style={styles.cell}>
                      <span style={{
                        color: item.stock < 20 ? "#dc3545" : "#198754",
                        fontWeight: "bold"
                      }}>
                        {item.stock < 20 ? "Low Stock" : "Available"}
                      </span>
                    </td>
                    <td style={styles.cell}>
                      <input
                        type="number"
                        min="0"
                        value={item.stock}
                        onChange={e => updateStock(item.id, e.target.value)}
                        style={{ ...styles.input, width: 65 }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 style={{ marginTop: 25 }}>Add New Inventory Item</h3>
          <input
            style={styles.input}
            placeholder="Item name"
            value={newItem}
            onChange={e => setNewItem(e.target.value)}
          />
          <input
            style={styles.input}
            type="number"
            min="0"
            placeholder="Quantity"
            value={newStock}
            onChange={e => setNewStock(e.target.value)}
          />
          <button style={styles.button} onClick={addItem}>
            + Add Item
          </button>
        </section>

        <section style={styles.card}>
          <h2>🛒 Recent Customer Orders</h2>
          <p style={{ color: "#888", margin: "8px 0 20px" }}>
            View and update customer order statuses.
          </p>

          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.cell}>Order ID</th>
                  <th style={styles.cell}>Customer</th>
                  <th style={styles.cell}>Pizza</th>
                  <th style={styles.cell}>Amount</th>
                  <th style={styles.cell}>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td style={styles.cell}>{order.id}</td>
                    <td style={styles.cell}>{order.customer}</td>
                    <td style={styles.cell}>{order.pizza}</td>
                    <td style={styles.cell}>₹{order.amount}</td>
                    <td style={styles.cell}>
                      <select
                        value={order.status}
                        onChange={e => updateStatus(order.id, e.target.value)}
                        style={styles.input}
                      >
                        <option>Pending</option>
                        <option>Preparing</option>
                        <option>Out for Delivery</option>
                        <option>Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
