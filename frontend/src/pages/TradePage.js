import "../styles/TradePage.css";
import { EcommerceCard } from "../components/EcommerceCard";
import { useState, useEffect } from "react";
import CircularMenu1 from "../components/CircularMenu2";
import imagesData from "../assets/ecom/E_COMMERCE_CardData/eComCardData";
import { WeHaveMoreImageData } from "../assets/ecom/WeHaveMore/WeHaveMoreData";
import EcoNavbar from "../components/Navbar";
import TraditionalBoysGallery from "../components/TraditionalBoysGallery";
import { LoadingPage } from "./LoadingPage";

export const TradePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [cartWindow, setCartWindow] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const initialProducts = [
    {
      id: 1,
      name: "Designer Kurta Set",
      price: 1899,
      originalPrice: 2499,
      discount: "24%",
      rating: 4,
      reviews: 42,
      badge: "New",
      image: "https://img.faballey.com/images/Product/WLK00532A/d3.jpg"
    },
    {
      id: 2,
      name: "Festive Sherwani",
      price: 3499,
      originalPrice: 4999,
      discount: "30%",
      rating: 5,
      reviews: 89,
      badge: "Bestseller",
      image: "https://cdn.sareesaga.com/image/cache/data18/blue-and-multi-colour-banarasi-jacquard-festival-sherwani-197192-1000x1375.jpg"
    },
    {
      id: 3,
      name: "Traditional Dhoti Set",
      price: 2299,
      originalPrice: 2999,
      discount: "23%",
      rating: 4,
      reviews: 36,
      badge: "Limited",
      image: "https://ramrajcotton.in/cdn/shop/files/5_c4599121-0854-4266-abe1-9b628c8db04e.jpg?v=1740457301"
    },
    {
      id: 4,
      name: "Wedding Collection Kurta",
      price: 1699,
      originalPrice: 2999,
      discount: "43%",
      rating: 5,
      reviews: 103,
      badge: "Sale",
      image: "https://www.manyavar.com/dw/image/v2/BJZV_PRD/on/demandware.static/-/Library-Sites-ManyavarSharedLibrary/default/dw3f97cca9/How%20to%20Style%20a%20Kurta%20for%20a%20Wedding%20Party%20Dos%20and%20Don%E2%80%99ts_Blog_2_D_M.jpg"
    }
  ];

  const [products] = useState(initialProducts);

  // Simulate initial page loading with product image preloading
  useEffect(() => {
    // Collect all product images for preloading
    const imagesToPreload = [
      ...initialProducts.map(p => p.image),
      ...imagesData.map(item => item.imgSrc),
      // Add other important images here
    ];
    
    let loadedCount = 0;
    let progress = 10; // Start at 10% immediately for better UX
    setLoadingProgress(progress);
    
    // Initial progress increment (simulates application loading)
    const initialInterval = setInterval(() => {
      progress += 2;
      if (progress >= 30) { // Cap at 30% until images start loading
        clearInterval(initialInterval);
      }
      setLoadingProgress(progress);
    }, 100);
    
    // Preload images
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        // Calculate progress: 30% base + 70% for images
        const imageProgress = Math.floor((loadedCount / imagesToPreload.length) * 70);
        progress = 30 + imageProgress;
        setLoadingProgress(progress);
        
        if (loadedCount === imagesToPreload.length) {
          clearInterval(initialInterval);
          // Complete loading
          setLoadingProgress(100);
          setTimeout(() => {
            setInitialLoading(false);
          }, 500);
        }
      };
      img.onerror = () => {
        loadedCount++;
        // Still count errors as progress to avoid getting stuck
        const imageProgress = Math.floor((loadedCount / imagesToPreload.length) * 70);
        progress = 30 + imageProgress;
        setLoadingProgress(progress);
      };
      img.src = src;
    });
    
    return () => clearInterval(initialInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleFavorite = (product) => {
    setFavorites(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(fav => fav.id === product.id);
      if (isAlreadyFavorite) {
        return prevFavorites.filter(fav => fav.id !== product.id);
      } else {
        return [...prevFavorites, product];
      }
    });
  };

  const toggleCart = (product) => {
    setCartItems(prevCartItems => {
      const isInCart = prevCartItems.some(item => item.id === product.id);
      if (isInCart) {
        return prevCartItems.filter(item => item.id !== product.id);
      } else {
        return [...prevCartItems, product];
      }
    });
  };

  const openCartWindow = () => {
    if (cartWindow && !cartWindow.closed) {
      cartWindow.focus();
      return;
    }

    const width = 600;
    const height = 600;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    const newWindow = window.open('', 'cartWindow', 
      `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );

    if (newWindow) {
      newWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Shopping Cart</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background: #f5f5f5; }
              .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 1px solid #ddd; }
              .cart-title { font-size: 28px; color: #333; margin: 0; }
              .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #666; }
              .cart-items { max-height: 400px; overflow-y: auto; }
              .cart-item { display: flex; align-items: center; padding: 20px; background: white; margin-bottom: 15px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
              .item-image { width: 100px; height: 100px; object-fit: cover; border-radius: 4px; margin-right: 20px; }
              .item-details { flex: 1; }
              .item-name { font-size: 18px; margin: 0 0 8px 0; color: #333; }
              .item-price { color: #4CAF50; font-weight: bold; font-size: 16px; margin: 0; }
              .remove-btn { background: none; border: none; color: #ff4444; cursor: pointer; font-size: 24px; padding: 5px; }
              .cart-footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; }
              .total { display: flex; justify-content: space-between; font-size: 20px; margin-bottom: 20px; }
              .checkout-btn { width: 100%; padding: 15px; background: #4CAF50; color: white; border: none; border-radius: 4px; font-size: 18px; cursor: pointer; transition: background 0.3s; }
              .checkout-btn:hover { background: #45a049; }
              .empty-cart { text-align: center; padding: 40px; color: #666; font-size: 18px; }
              .order-form { display: none; padding: 20px; background: white; border-radius: 8px; margin-top: 20px; }
              .form-group { margin-bottom: 15px; }
              .form-group label { display: block; margin-bottom: 5px; color: #333; }
              .form-group input { width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
              .order-success { display: none; text-align: center; padding: 40px; background: #E8F5E9; border-radius: 8px; margin-top: 20px; }
              .order-success h2 { color: #2E7D32; margin-bottom: 20px; font-size: 28px; }
              .order-success p { color: #1B5E20; margin-bottom: 15px; font-size: 18px; }
              .success-icon { font-size: 64px; margin-bottom: 20px; color: #2E7D32; }
            </style>
          </head>
          <body>
            <div class="cart-header">
              <h1 class="cart-title">Shopping Cart</h1>
              <button class="close-btn" onclick="window.close()">×</button>
            </div>
            <div id="cartContent">
              <div class="cart-items">
                ${cartItems.length === 0 ? 
                  '<div class="empty-cart">Your cart is empty</div>' : 
                  cartItems.map(item => `
                    <div class="cart-item">
                      <img src="${item.image}" alt="${item.name}" class="item-image">
                      <div class="item-details">
                        <h3 class="item-name">${item.name}</h3>
                        <p class="item-price">₹${item.price}</p>
                      </div>
                      <button class="remove-btn" onclick="window.opener.removeFromCart(${item.id})">×</button>
                    </div>
                  `).join('')
                }
              </div>
              ${cartItems.length > 0 ? `
                <div class="cart-footer">
                  <div class="total">
                    <span>Total:</span>
                    <span>₹${cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  <button class="checkout-btn" onclick="showOrderForm()">Proceed to Checkout</button>
                </div>
              ` : ''}
            </div>

            <div id="orderForm" class="order-form">
              <h2>Shipping Details</h2>
              <div class="form-group">
                <label>Full Name</label>
                <input type="text" id="fullName" required>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input type="email" id="email" required>
              </div>
              <div class="form-group">
                <label>Phone</label>
                <input type="tel" id="phone" required>
              </div>
              <div class="form-group">
                <label>Address</label>
                <input type="text" id="address" required>
              </div>
              <div class="form-group">
                <label>City</label>
                <input type="text" id="city" required>
              </div>
              <div class="form-group">
                <label>Postal Code</label>
                <input type="text" id="postalCode" required>
              </div>
              <button class="checkout-btn" onclick="placeOrder()">Place Order</button>
            </div>

            <div id="orderSuccess" class="order-success">
              <div class="success-icon">✓</div>
              <h2>Order Placed Successfully!</h2>
              <p>Thank you for your purchase.</p>
              <p>Order confirmation has been sent to your email.</p>
              <p>Your order will be shipped within 2-3 business days.</p>
              <button class="checkout-btn" onclick="window.close()">Close</button>
            </div>

            <script>
              function showOrderForm() {
                document.getElementById('cartContent').style.display = 'none';
                document.getElementById('orderForm').style.display = 'block';
              }

              function placeOrder() {
                document.getElementById('orderForm').style.display = 'none';
                document.getElementById('orderSuccess').style.display = 'block';
              }
            </script>
          </body>
        </html>
      `);

      newWindow.removeFromCart = (productId) => {
        window.removeFromCart(productId);
        
        if (newWindow && !newWindow.closed) {
          newWindow.close();
          openCartWindow();
        }
      };

      setCartWindow(newWindow);
    }
  };

  window.removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  return (
    <div className="index">
      {initialLoading && <LoadingPage percentage={loadingProgress} />}
      <CircularMenu1 />
      <EcoNavbar />
      <div className="Categories-Intro">
        <div className="Categories-Intro-Title">CATEGORIES</div>
      </div>
      <div className="scrolling-wrapper-flexbox">
        {imagesData.map((card, index) => (
          <EcommerceCard
            key={index}
            imgIndex={index}
            title={card.title}
            ImgSrc={card.imgSrc}
          />
        ))}
      </div>

      <TraditionalBoysGallery />

      <div
        className="hottest-section"
        style={{
          minHeight: "150vh",
          width: "100%",
          position: "relative",
          padding: "40px 20px",
          background: "linear-gradient(to right, #ffe5d9, #ffd6b3)",
          boxShadow: "inset 0 0 50px rgba(255, 214, 179, 0.3)"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "40px",
            textAlign: "center"
          }}
        >
          <div
            style={{
              fontFamily: "Inknut Antiqua, serif",
              fontSize: "48px",
              background: "linear-gradient(45deg, #D32F2F, #FF5252)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "2px 2px 8px rgba(211, 47, 47, 0.2)",
              animation: "fadeInScale 1.2s ease-out",
              marginBottom: "5px"
            }}
          >
            Trade
          </div>
          <div
            style={{
              width: "100%",
              height: "2px",
              background: "linear-gradient(to right, #D32F2F, transparent)",
              margin: "0 auto",
              position: "relative",
              animation: "fadeInScale 1.2s ease-out"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-1px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "50%",
                height: "4px",
                background: "linear-gradient(to right, transparent, #FF5252, transparent)",
                filter: "blur(1px)"
              }}
            ></div>
          </div>
        </div>

        <style>
          {`
            @keyframes fadeInScale {
              0% {
                opacity: 0;
                transform: scale(0.8) translateY(-20px);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
              }
            }
          `}
        </style>

        <div className="hottest-header">
          <h2>Hottest Items</h2>
          <p style={{ color: "#333" }}>Our most popular items this season, handpicked just for you</p>
          <div className="hottest-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Trending</button>
            <button className="filter-btn">New Arrivals</button>
            <button className="filter-btn">Best Sellers</button>
          </div>
        </div>

        <div className="cart-bar" style={{
          position: "absolute",
          top: "80px",
          right: "120px",
          zIndex: "100",
          width: "60px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "30px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0"
        }}>
          <button 
            onClick={() => setShowCart(!showCart)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "#666",
              position: "relative",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            🛒
            {cartItems.length > 0 && (
              <span style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "#ff4444",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {cartItems.length}
              </span>
            )}
          </button>
          
          {showCart && (
            <div style={{
              position: "absolute",
              top: "60px",
              right: "0",
              background: "white",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              width: "300px",
              maxHeight: "500px",
              overflowY: "auto",
              padding: "15px"
            }}>
              <div style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h3 style={{ margin: 0 }}>Shopping Cart</h3>
                <button 
                  onClick={() => setShowCart(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#666"
                  }}
                >
                  ✕
                </button>
              </div>
              
              {cartItems.length === 0 ? (
                <p style={{ textAlign: "center", color: "#666" }}>Your cart is empty</p>
              ) : (
                <>
                  <div style={{
                    maxHeight: "300px",
                    overflowY: "auto",
                    marginBottom: "15px"
                  }}>
                    {cartItems.map(item => (
                      <div key={item.id} style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px",
                        borderBottom: "1px solid #eee"
                      }}>
                        <img 
                          src={item.image} 
                          alt={item.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "15px",
                            borderRadius: "4px"
                          }}
                        />
                        <div style={{ flex: 1 }}>
                          <h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>{item.name}</h4>
                          <p style={{ margin: 0, color: "#4CAF50", fontWeight: "bold", fontSize: "14px" }}>₹{item.price}</p>
                        </div>
                        <button 
                          onClick={() => toggleCart(item)}
                          style={{
                            background: "none",
                            border: "none",
                            color: "#ff4444",
                            cursor: "pointer",
                            fontSize: "16px"
                          }}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div style={{
                    padding: "10px 0",
                    borderTop: "1px solid #eee",
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: "bold",
                    fontSize: "16px"
                  }}>
                    <span>Total:</span>
                    <span>₹{cartItems.reduce((sum, item) => sum + item.price, 0)}</span>
                  </div>
                  
                  <button 
                    onClick={openCartWindow}
                    style={{
                      width: "100%",
                      padding: "10px",
                      background: "linear-gradient(to right, #66BB6A, #43A047)",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      cursor: "pointer",
                      marginTop: "10px"
                    }}
                  >
                    Checkout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        <div className="favorites-bar" style={{
          position: "absolute",
          top: "80px",
          right: "40px",
          zIndex: "100",
          width: "60px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "30px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px 0"
        }}>
          <button 
            onClick={() => setShowFavorites(!showFavorites)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "24px",
              color: "#ff4444",
              position: "relative",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            ♥
            {favorites.length > 0 && (
              <span style={{
                position: "absolute",
                top: "-5px",
                right: "-5px",
                background: "#ff4444",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                fontSize: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {favorites.length}
              </span>
            )}
          </button>
          
          {showFavorites && (
            <div style={{
              position: "absolute",
              top: "60px",
              right: "0",
              background: "white",
              boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
              borderRadius: "10px",
              width: "300px",
              maxHeight: "500px",
              overflowY: "auto",
              padding: "15px"
            }}>
              <div style={{
                borderBottom: "1px solid #eee",
                paddingBottom: "10px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h3 style={{ margin: 0 }}>Favorites</h3>
                <button 
                  onClick={() => setShowFavorites(false)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px",
                    color: "#666"
                  }}
                >
                  ✕
                </button>
              </div>
              
              {favorites.length === 0 ? (
                <p style={{ textAlign: "center", color: "#666" }}>You haven't added any items to your favorites yet</p>
              ) : (
                <div style={{
                  maxHeight: "300px",
                  overflowY: "auto"
                }}>
                  {favorites.map(item => (
                    <div key={item.id} style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      borderBottom: "1px solid #eee"
                    }}>
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                          marginRight: "15px",
                          borderRadius: "4px"
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ margin: "0 0 5px 0", fontSize: "14px" }}>{item.name}</h4>
                        <p style={{ margin: 0, color: "#4CAF50", fontWeight: "bold", fontSize: "14px" }}>₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => toggleFavorite(item)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "#ff4444",
                          cursor: "pointer",
                          fontSize: "18px"
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="Hottest-card-containers">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-badge">{product.badge}</div>
              <div className="product-image" style={{ 
                backgroundImage: `url('${product.image}')`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat"
              }}></div>
              <div className="product-details">
                <h3>{product.name}</h3>
                <div className="product-price">
                  <span className="actual-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount">{product.discount} off</span>
                </div>
                <div className="product-rating">
                  <span className="stars">{"★".repeat(product.rating)}{"☆".repeat(5-product.rating)}</span>
                  <span className="reviews">({product.reviews})</span>
                </div>
              </div>
              <div className="product-actions">
                <button 
                  className={`add-to-cart-btn ${cartItems.some(item => item.id === product.id) ? 'in-cart' : ''}`}
                  onClick={() => toggleCart(product)}
                  style={{
                    background: cartItems.some(item => item.id === product.id) 
                      ? 'linear-gradient(135deg, #66BB6A, #43A047)'
                      : 'linear-gradient(135deg, #E57373, #D50000)',
                  }}
                >
                  {cartItems.some(item => item.id === product.id) ? 'In Cart' : 'Add to Cart'}
                </button>
                <button 
                  className={`wishlist-btn ${favorites.some(fav => fav.id === product.id) ? 'active' : ''}`}
                  onClick={() => toggleFavorite(product)}
                  style={{
                    color: favorites.some(fav => fav.id === product.id) ? '#ff4444' : '#666'
                  }}
                >
                  ♥
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="weHaveMoreSection"
        style={{ width: "100%", overflowX: "auto" }}
      >
        {WeHaveMoreImageData.map((image, index) => (
          <div
            key={index}
            className="WHM-image"
            style={{
              backgroundImage: `url('${image.imageSrc}')`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              width: "50%", 
              height: "85%",
              marginLeft: "5%",
              flex: "0 0 auto",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default TradePage; 