import React from "react";
import "../styles/Footer.css";
export const Footer = () => {
  const SocialUrls = [
    {
      id: "1",
      name: "Srakshin Chityala",
      LI: "https://www.linkedin.com/in/srakshin/",
      GH: "https://github.com/Srakshin",
    },
    {
      id: "2",
      name: "Bhanu Chandra",
      LI: "https://www.linkedin.com/in/bhanu-chandra-1b6929269/",
      GH: "#",
    },
    {
      id: "3",
      name: "Jashwanth Mareddy",
      LI: "https://www.linkedin.com/in/jashwanth-mareddy-7361a3216/",
      GH: "https://github.com/jashwanth1234110",
    },
    {
      id: "4",
      name: "Kaushal Siripuram",
      LI: "https://www.linkedin.com/in/siripuram-kaushal-9b7844350/",
      GH: "#",
    },
  ];

  return (
    <footer
      className="text-white mt-5 p-4 text-center"
      id="my-footer"
      style={{
        fontFamily: "Inknut Antiqua",
        height: "80vh",
        borderTop: "2px solid black",
        background: "linear-gradient(to bottom, #FF9933, #ffffff, #138808)", // saffron → white → green
        color: "#000", // black text for readability on white
      }}
    >
      <h1
        style={{
          fontFamily: "'Libre Baskerville', serif", // Classic, elegant font
          color: "black",
          marginTop: "3%",
          textAlign: "center",
          fontSize: "3rem", // Optional: larger heading
        }}
      >
        About Us
      </h1>
      <div
        style={{
          height: "60%",
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          marginTop: "3%",
        }}
      >
        <div
          style={{
            height: "100%",
            width: "60%",
            borderRight: "2px solid black",

            color: "black",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
        </div>

        <div
          style={{
            height: "100%",
            width: "100%",
            borderRight: "2px solid black",
          }}
        >
          <h2 className="Footer-Title">Know us!</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: "80%",
              width: "100%",
              marginTop: "10%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                borderRight: "2px solid black",
              }}
            >

            </div>
            <div
              style={{
                height: "100%",
                width: "100%",
                borderRight: "2px solid black",
              }}
            >
              <h3 className="footer-subtitle">GitHub</h3>
              <ul
                className="content"
                style={{
                  listStyleType: "none",
                  textAlign: "left",
                }}
              >
                {SocialUrls.map((item) => (
                  <li key={item.id}>
                    <a href={item.GH} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
              <h3 className="footer-subtitle">LinkedIn</h3>
              <ul
                className="content"
                style={{
                  listStyleType: "none",
                  textAlign: "left",
                }}
              >
                {SocialUrls.map((item) => (
                  <li key={item.id}>
                    <a href={item.LI} target="_blank" rel="noreferrer">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "90%",
            borderRight: "2px solid black",
          }}
        >
          <h2 className="Footer-Title">Contact us!</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              position: "relative",
              height: "80%",
              width: "100%",
              marginTop: "10%",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                // borderRight: "2px solid black",
                marginLeft: "10px",
                textAlign: "left",
              }}
            >
              <h3 className="footer-subtitle">E-mail</h3>
              <h4 className="footer-subtitle-content">v.stars@gmail.com</h4>
              <h3
                className="footer-subtitle"
                style={{
                  marginTop: "40px",
                }}
              >
                Phone
              </h3>
              <h4 className="footer-subtitle-content">95124XXXX</h4>
            </div>
            {/* <div
              style={{
                height: "100%",
                width: "100%",
              }}
            >
            </div> */}
          </div>
        </div>

        <div
          style={{
            height: "100%",
            width: "60%",
          }}
        >
          <h2 className="Footer-Title">Copyright</h2>
          <ul
            className="content"
            style={{
              listStyleType: "none",
              textAlign: "left",
            }}
          >
            <li>Privacy Policy</li>
            <li>Term of use</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
