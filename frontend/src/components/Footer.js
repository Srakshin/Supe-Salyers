import React from "react";
import "../styles/Footer.css";
<<<<<<< Updated upstream
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
=======
>>>>>>> Stashed changes

export const Footer = () => {
  const SocialUrls = [
    {
      id: "1",
      name: "Srakshin Chityala",
      LI: "https://www.linkedin.com/in/srakshin/",
      GH: "https://github.com/Srakshin",
      email: "bsrakshin@gmail.com",
      phone: "+91 8341606749"
    },
    {
      id: "2",
      name: "Megharaj Bhanu Chandra",
      LI: "https://www.linkedin.com/in/bhanu-chandra-1b6929269/",
      GH: "#",
      email: "mbhanuchandra003@gmail.com",
      phone: "+91 8374108107"
    },
    {
      id: "3",
      name: "Jashwanth Mareddy",
      LI: "https://www.linkedin.com/in/jashwanth-mareddy-7361a3216/",
      GH: "https://github.com/jashwanth1234110",
      email: "jashwanthmareddy@gmail.com",
      phone: "+91 9347310160"
    },
    {
      id: "4",
      name: "Kaushal Siripuram",
      LI: "https://www.linkedin.com/in/siripuram-kaushal-9b7844350/",
      GH: "https://github.com/Kaushal1201",
      email: "kaushalsiripuram@gmail.com",
      phone: "+91 9063304286"
    },
  ];

  return (
<<<<<<< Updated upstream
    <footer
      className="text-white mt-5 p-4 text-center"
      id="my-footer"
      style={{
        fontFamily: "Inknut Antiqua",
        height: "80vh",
        // borderTop: "2px solid black",
        background: "linear-gradient(to bottom, #FF9933, #ffffff, #138808)", // saffron → white → green
        color: "#000", // black text for readability on white
      }}
    >
      <h1
        style={{
          fontFamily: "'Merriweather', serif",
          color: "black",
          marginTop: "3%",
          textAlign: "center",
          fontSize: "3rem",
        }}
      >
        About Us
      </h1>
      <div
        style={{
          height: "60%",
          width: "100%",
          display: "flex",
          justifyContent: "space-around", // or use gap if preferred
          alignItems: "flex-start",
          gap: "20px",
          marginTop: "3%",
        }}
      >
        <div
        // style={{
        //   height: "100%",
        //   width: "50%",
        //   borderRight: "2px solid black",

        //   color: "black",
        //   textAlign: "left",
        //   display: "flex",
        //   flexDirection: "column",
        //   alignItems: "center",
        //   position: "relative",
        // }}
        >
        </div>

        <div
          style={{
            height: "100%",
            width: "80%",
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
            // style={{
            //   height: "100%",
            //   width: "100%",
            //   borderRight: "2px solid black",
            // }}
            >

            </div>
            <div
              style={{
                height: "100%",
                width: "90%",
                // borderRight: "2px solid black",
              }}
            >
              <h3 className="footer-subtitle">
                <FontAwesomeIcon icon={faGithub} /> GitHub
              </h3>
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
              <h3 className="footer-subtitle">
                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
              </h3>
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
            width: "100%",
            borderRight: "2px solid black",
          }}
        >
          <h2 className="Footer-Title">Contact us!</h2>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              position: "relative",
              height: "80%",
              width: "100%",
              marginTop: "10%",
              gap: "10%",
            }}
          >
            <div
              style={{
                width: "50%",
                marginLeft: "10px",
                textAlign: "left",
              }}
            >
              <h3 className="footer-subtitle">
                <FontAwesomeIcon icon={faEnvelope} /> E-mail
              </h3>

              <h4 className="footer-subtitle-content">bsrakshin@gmail.com</h4>
              <h4 className="footer-subtitle-content">kaushalsiripuram@gmail.com</h4>
              <h4 className="footer-subtitle-content">jashwanthmareddy@gmail.com</h4>
              <h4 className="footer-subtitle-content">mbhanuchandra003@gmail.com</h4>
            </div>

            {/* Phone Section */}
            <div
              style={{
                width: "60%",
                textAlign: "center",
              }}
            >
              <h3 className="footer-subtitle">
                <FontAwesomeIcon icon={faPhone} /> Phone
              </h3>

              <h4 className="footer-subtitle-content">+91 8341606749</h4>
              <h4 className="footer-subtitle-content">+91 9063304286</h4>
              <h4 className="footer-subtitle-content">+91 9347310160</h4>
              <h4 className="footer-subtitle-content">+91 8374108107</h4>
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
=======
    <footer id="my-footer" className="footer-container">
      <div className="footer-wrapper">
        <div className="footer-content">
          <div className="footer-sections horizontal">
            <div className="footer-section">
              <h2 className="footer-title">Know us!</h2>
              <div className="footer-columns">
                <div className="footer-column">
                  <h3 className="footer-subtitle">GitHub</h3>
                  <ul className="footer-list">
                    {SocialUrls.map((item) => (
                      <li key={`gh-${item.id}`}>
                        <a href={item.GH} target="_blank" rel="noreferrer">{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="footer-column">
                  <h3 className="footer-subtitle">LinkedIn</h3>
                  <ul className="footer-list">
                    {SocialUrls.map((item) => (
                      <li key={`li-${item.id}`}>
                        <a href={item.LI} target="_blank" rel="noreferrer">{item.name}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="footer-section">
              <h2 className="footer-title">Contact us!</h2>
              <div className="footer-columns">
                <div className="footer-column">
                  <h3 className="footer-subtitle">E-mail</h3>
                  <ul className="footer-list">
                    <li><a href={`mailto:${SocialUrls[0].email}`}>{SocialUrls[0].email}</a></li>
                    <li><a href={`mailto:${SocialUrls[1].email}`}>{SocialUrls[1].email}</a></li>
                    <li><a href={`mailto:${SocialUrls[2].email}`}>{SocialUrls[2].email}</a></li>
                    <li><a href={`mailto:${SocialUrls[3].email}`}>{SocialUrls[3].email}</a></li>
                  </ul>
                </div>
                <div className="footer-column">
                  <h3 className="footer-subtitle">Phone</h3>
                  <ul className="footer-list">
                    <li><a href={`tel:${SocialUrls[0].phone.replace(/\s/g, '')}`}>{SocialUrls[0].phone}</a></li>
                    <li><a href={`tel:${SocialUrls[1].phone.replace(/\s/g, '')}`}>{SocialUrls[1].phone}</a></li>
                    <li><a href={`tel:${SocialUrls[2].phone.replace(/\s/g, '')}`}>{SocialUrls[2].phone}</a></li>
                    <li><a href={`tel:${SocialUrls[3].phone.replace(/\s/g, '')}`}>{SocialUrls[3].phone}</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="footer-divider horizontal-divider"></div>
          
          <div className="footer-copyright-section">
            <h2 className="footer-title centered-title">Copyright</h2>
            <ul className="footer-list centered-list">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
            <div className="copyright-text">
              <p>© 2023 Indian Heritage. All rights reserved.</p>
            </div>
          </div>
        </div>
        
        <div className="footer-divider horizontal-divider"></div>
        
        <div className="footer-bottom">
          <p>Designed with <span>❤</span> celebrating Indian culture</p>
>>>>>>> Stashed changes
        </div>
      </div>
    </footer>
  );
};
