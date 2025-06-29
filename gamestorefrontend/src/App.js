// App.jsx
import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [cart, setCart] = useState([]);

  // Fetch game list from backend
  useEffect(() => {
    fetch('http://localhost:8081/api/games')
      .then(res => res.json())
      .then(data => setGames(data))
      .catch(err => console.error('Failed to fetch games:', err));
  }, []);

  const addToCart = (game) => {
    const existing = cart.find(item => item.id === game.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === game.id ? { ...item, qty: item.qty + 1 } : item
      ));
    } else {
      setCart([...cart, { ...game, qty: 1 }]);
    }
  };

  const handleCheckout = () => {
    const orderPayload = cart.map(item => ({
      id: item.id,
      stock: item.qty  
    }));

    fetch('http://localhost:8081/api/games/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    })
      .then(res => res.text())
      .then(msg => {
        alert(msg);
        setCart([]);
        return fetch('http://localhost:8081/api/games')
          .then(res => res.json())
          .then(data => setGames(data));
      })
      .catch(err => alert('Error placing order: ' + err));
  };

  return (
    <div className="container">
      <center> Online Games Store</center>
      <div className="products">
        {games.map(game => (
          <div key={game.id} className="product">
            <h2>{game.name}</h2>
            <p>Price: Rs. {game.price}</p>
            <p>Stock: {game.stock}</p>
            <button onClick={() => addToCart(game)}>Buy</button>
          </div>
        ))}
      </div>

      <div className="cart">
       <center> <h2>🛒 Cart </h2></center>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <ul>
              {cart.map(item => (
                <li key={item.id}>
                  {item.name} x {item.qty} = Rs. {item.qty * item.price}
                </li>
              ))}
            </ul>
            <button onClick={handleCheckout}>Place Order</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
