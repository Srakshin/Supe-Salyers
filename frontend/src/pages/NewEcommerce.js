import "../styles/EcommercePage.css";
import { EcommerceCard } from "../components/EcommerceCard";
import { useState } from "react";
import Navbarjs from "../components/Navbarr";
import imagesData from "../assets/ecom/E_COMMERCE_CardData/eComCardData";

import { WeHaveMoreImageData } from "../assets/ecom/WeHaveMore/WeHaveMoreData";

import largeImage2 from "../assets/ecom/highdressNew1.png";
import largeImage1 from "../assets/ecom/highdressNew2.png";
import { EcommerceCard2 } from "../components/EcommerceCard2";

import JFY from "../assets/ecom/JFY.png";

import Hottest from "../assets/ecom/Hottest.png";

import SoDidYouLike from "../assets/ecom/SoWhatDidYouLikeBG.png";
import { Footer } from "../components/Footer";
import EcoNavbar from "../components/Navbar";
import TraditionalBoysGallery from "../components/TraditionalBoysGallery";

export const TradePage = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

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

  return (
    <div className="index">
      <Navbarjs />
    <EcoNavbar />
      <div class="Categories-Intro">
        <div class="Categories-Intro-Title">CATEGORIES</div>
      </div>
      <div class="scrolling-wrapper-flexbox">
        {imagesData.map((card, index) => (
          <EcommerceCard
            key={index}
            imgIndex={index}
            title={card.title}
            ImgSrc={card.imgSrc}
          />
        ))}
      </div>

      <div className="dress-showcase-section">
        <div className="rectangle-showcase">
          <div className="rectangle-showcase-1"></div>
          <img
            className="largeImages largeImages1"
            src={largeImage1}
            alt="LargeImage1"
          />
        </div>

        <div className="rectangle-showcase">
          <div className="rectangle-showcase-2"></div>
          <img
            className="largeImages largeImages2"
            src={largeImage2}
            alt="LargeImage2"
          />
        </div>
      </div>
      
      {/* Traditional Boys Gallery Section */}
      <TraditionalBoysGallery />

      <div
        className="hottest-section"
        style={{
          minHeight: "150vh",
          width: "100%",
          position: "relative",
          background: "linear-gradient(135deg, rgba(245, 240, 230, 0.1), rgba(250, 240, 220, 0.2))"
        }}
      >
        <img
          src={Hottest}
          style={{
            width: "98%",
            height: "95%",
            position: "absolute",
            top: 0,
            left: "1%",
            zIndex: 1,
            opacity: 0.7,
            mixBlendMode: "multiply"
          }}
          alt="Hottest section background"
        />
        
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, rgba(245, 240, 230, 0.2), rgba(250, 240, 220, 0.3))",
          zIndex: 2
        }}></div>

        {/* Favorites Bar */}
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
          
          {showFavorites && favorites.length > 0 && (
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
              {favorites.map(product => (
                <div key={product.id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  borderBottom: "1px solid #eee",
                  gap: "10px"
                }}>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    style={{ 
                      width: "60px", 
                      height: "60px", 
                      objectFit: "cover",
                      borderRadius: "5px"
                    }} 
                  />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: "0 0 5px 0" }}>{product.name}</h4>
                    <p style={{ margin: 0, color: "#ff4444" }}>₹{product.price}</p>
                  </div>
                  <button
                    onClick={() => toggleFavorite(product)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#ff4444",
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

        <div className="hottest-header">
          <pre>


          </pre>
          <p>Our most popular items this season, handpicked just for you</p>
          <div className="hottest-filters">
            <button className="filter-btn active">All</button>
            <button className="filter-btn">Trending</button>
            <button className="filter-btn">New Arrivals</button>
            <button className="filter-btn">Best Sellers</button>
          </div>
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
                <button className="add-to-cart-btn">Add to Cart</button>
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
        style={{
          backgroundImage: `url('${SoDidYouLike}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          width: "100vw",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="so-did-you-like-overlay"></div>
        <h1
          style={{
            position: "absolute",
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontFamily: "Inknut Antiqua",
            fontSize: "50px",
            background: "linear-gradient(135deg, #E57373, #D50000)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow: "2px 2px 10px rgba(0,0,0,0.2)",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
            animation: "fadeInUp 1s ease-out",
          }}
        >
          So what did you like?
        </h1>
        <h3
          style={{
            position: "absolute",
            bottom: "20%",
            right: "10%",
            fontFamily: "Inknut Antiqua",
            background: "linear-gradient(135deg, #D32F2F, #B71C1C)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            padding: "10px 20px",
            borderRadius: "30px",
            animation: "pulse 2s infinite",
          }}
        >
          Pssst! we have more
        </h3>
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
              width: "50%", // Set a fixed width
              height: "85%",
              marginLeft: "5%",
              flex: "0 0 auto",
            }}
          ></div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TradePage;
