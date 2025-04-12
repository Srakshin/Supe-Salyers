// src/components/LandingPage.js
import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";


//images
import clouds_1 from "../assets/HomePage/clouds_1.png";
import clouds_2 from "../assets/HomePage/clouds_2.png";
import bg from "../assets/HomePage/full.png";
import fg from "../assets/HomePage/man2.png";
import ramayanBG from "../assets/HomePage/ramayanBG.png";
import ramayanFG from "../assets/HomePage/ramayanFG.png";
import krishnaBG from "../assets/HomePage/krishnaBG.png";
import krishnaFG from "../assets/HomePage/krishnaFG.png";
import arrowBG from "../assets/HomePage/arrowBG.png";
import arrowFG from "../assets/HomePage/arrowFG.png";
import arrowBGNew from "../assets/HomePage/RamHoverBG_Large.png";

import arrowBorders from "../assets/HomePage/arrowBorders.png";
import arrowDots from "../assets/HomePage/arrowDots.png";
import arrowFull from "../assets/HomePage/arrowFull.png";
import arrowRotate from "../assets/HomePage/arrowRotate.png";
import rathBG from "../assets/HomePage/rathBG.png";
import rathFG from "../assets/HomePage/rathFG.png";


import flybird from "../assets/HomePage/flybird.gif";
import birdy from "../assets/HomePage/birdy.gif";

import Navbarjs from "../components/Navbarr3";
import { Footer } from "../components/Footer";
import { LoadingPage } from "./LoadingPage";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const [arrowBGNew1, setRathBgSrc] = useState(`${arrowBGNew}`);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const imageUrls = [
    clouds_1,
    clouds_2,
    bg,
    fg,
    ramayanBG,
    ramayanFG,
    arrowFG,
    arrowBGNew,
    arrowRotate,
    rathBG,
    rathFG,
  ];

  useEffect(() => {
    const RathBGImg = new Image();
    RathBGImg.src = "../assets/HomePage/RamHoverBG.png";
    RathBGImg.onload = () => {
      setRathBgSrc(RathBGImg.src);
    };

    const images = imageUrls.map((url) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        if (images.every((image) => image.complete)) {
          setImagesLoaded(true);
        }
      };
      return img;
    });

    gsap.to("#menu", {
      scrollTrigger: {
        trigger: "#my-footer",
        scrub: true,
      },
      start: "top 100%",
      y: "-790",
    });

    gsap.to("#menu", {
      x: 0,
      scrollTrigger: {
        trigger: ".section3",
        scrub: true,
        x: -500,
      },
    });

    gsap.to("#bg", {
      scrollTrigger: {
        scrub: 1,
      },
      scale: 1.5,
    });

    gsap.to("#man", {
      scrollTrigger: {
        scrub: 1,
      },
      scale: 0.5,
    });

    gsap.to("#rmynFG", {
      scrollTrigger: {
        trigger: "#rmynFG", 
        scrub: 1,
        start: "top center",
        end: "bottom center",
       
      },
      x: -250,
      y: -50,
      scale: 0.7,
    });

    gsap.to("#cloud1", {
      x: 750,
      scrollTrigger: {
        scrub: 1,
      },
    });

    gsap.to("#cloud2", {
      x: -750,
      scrollTrigger: {
        scrub: 1,
      },
    });

    gsap.to("#krishnaBG", {
      scrollTrigger: {
        scrub: 2,
      },
      scale: 5,
    });


    gsap.to("#text", {
      scrollTrigger: {
        scrub: 1,
      },
      y: 800,
    });

    gsap.to("#heading-h2", {
      scrollTrigger: {
        trigger: "#heading",
        scrub: 1,
      },
      x: "100%",
    });

    gsap.to(".arrowBGNew", {
      scrollTrigger: {
        trigger: ".section2",
        scrub: 1,
      },
      scale: 1.2,
    });

    gsap.to(".section2 #arrowRotate", {
      scale: 1,
      duration: 2.5,
      rotate: 360,
      scrollTrigger: {
        ease: "power2.inOut",
        trigger: ".section2",
        scroller: "body",
     
        scrub: true,
      },
    });

    gsap.fromTo(
      "#rathFG",
      { x: 200 },
      {
        duration: 3,
        x: 0,
        scrollTrigger: {
          ease: "power2.inOut",
          trigger: ".section3",
          scrub: 2,
        },
      }
    );

    gsap.to(".arrow", {
      
      opacity: 0,
      scrollTrigger: {
        trigger: ".arrow",
        start: "top center",
        end: "50% center",
        scrub: true,
      },
    });

    gsap.to("#bird5", {
      x: -1400,
      duration: 10,
      repeat: -1,
      repeatDelay: 0.5,
      scrollTrigger: {
        trigger: "#section2",
       
        start: "top -35%",
        end: "bottom 100%",
      },
    });

  }, []);

  return (
    <div>
      {imagesLoaded ? "" : <LoadingPage percentage={""} />}
      <Navbarjs />
      <section className="section" id="top-section">
        <img src={bg} id="bg" alt="bg" />
        {/* <IndianHeritageText /> */}
        <h5 id="text">INDIAN HERITAGE</h5>
        <img src={fg} alt="man2" id="man" />
        <img
          src={clouds_1}
          style={{
            position: "absolute",
          }}
          alt="cloud1"
          id="cloud1"
        />
        <img
          src={clouds_2}
          style={{
            position: "absolute",
          }}
          alt="cloud2"
          id="cloud2"
        />
      </section>

      <section className="section1">
        <img src={ramayanBG} id="rmynBG" alt="rmynBG" />
        <img src={ramayanFG} id="rmynFG" alt="rmynFG" />
        <img
          src={require("../assets/HomePage/flybird.gif")}
          id="bird1"
          alt="bird"
        />
        <img
          src={require("../assets/HomePage/flybird.gif")}
          id="bird2"
          alt="bird"
        />
        <img
          src={require("../assets/HomePage/flybird.gif")}
          id="bird3"
          alt="bird"
        />
        <img
          src={require("../assets/HomePage/flybird.gif")}
          id="bird4"
          alt="bird"
        />
        
        <img
          src={require("../assets/HomePage/birdy.gif")}
          id="bird5"
          alt="bird"
        />
      </section>

      <section className="section2">
        <img
          src={arrowBGNew1}
          id="arrowBG123"
          className="arrowBGNew"
          alt="Arrow BG Sky"
        />
        <img src={arrowRotate} id="arrowRotate" alt="arrowRotate" />
        <img src={arrowFG} id="arrowFG" alt="arrowFG" />
      </section>

      <section className="section3">
        <img src={rathBG} id="rathBG" alt="rathBG" />
        <img src={rathFG} id="rathFG" alt="rathFG" />
      </section>


      <svg
        className="arrow"
        width="40px"
        height="80px"
        viewBox="0 0 247 390"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{
          fillRule: "evenodd",
          clipRule: "evenodd",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeMiterlimit: "1.5",
        }}
      >

      </svg>
     
      <div class="sec">
        <div id="heading">
          <h2
            style={{
              textAlign: "center",
              color: "rgb(13, 59, 102)"
            }}
         
          >
            
            The Indian Legacy
          </h2>
        </div>
        <br />
        <p id="para">
          <div className="grid-image-showcase">
            <p data-aos="fade-right">
              <i className="para-italic" >India's Geographical Diversity:</i>{" "}
              From the snow capped peaks of the Himalayas to the sunny shores of Kerala, India is a land full of breathtaking natural beauty. Each region has its own unique landscapes that have shaped local cultures and traditions. Join us on a virtual journey across mountains, rivers, deserts, and forests and discover how geography plays a vital role in India’s rich heritage.
            </p>
            <img
              src="https://d27k8xmh3cuzik.cloudfront.net/wp-content/uploads/2017/03/best-landscapes-in-india.jpg"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <img
              src="https://qph.cf2.quoracdn.net/main-qimg-9fe8adaf109c27a3913d7b49f4b46c6a-pjlq"
              width={"80%"}
              data-aos="fade-right"
            />
            <p data-aos="fade-left">
              <i className="para-italic">Regional Diversity: </i> 
              India's heritage is like a colorful patchwork quilt, stitched together by the unique cultures of its different regions. From the majestic forts of Rajasthan in the west to the peaceful backwaters of Kerala in the south, every corner of the country tells its own story. Discover the languages, festivals, food, and traditions that make North, South, East, West, and Central India truly special.
            </p>
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <p data-aos="fade-right">
              <i className="para-italic">Time Travel through Dynasties:</i>{" "}
              Step into the past and explore the powerful dynasties that shaped India's rich history. From the wisdom of the Mauryas and the golden age of the Guptas to the grandeur of the Mughals and the valor of the Marathas each era brought its own legacy. Discover their majestic forts, intricate art, and lasting cultural impact that still echoes across the country today.
            </p>
            <img
              src="https://www.re-thinkingthefuture.com/wp-content/uploads/2020/08/A158-Spotting-Architectural-Expressions-in-Indian-Architectural-Marvels-Image-1.jpg"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
        </p>
      </div>

      <div class="sec">
        <div id="heading">
          <h2
            style={{
              textAlign: "center",
              color: "rgb(13, 59, 102)"
            }}
          >
            Echoes of India's Past
          </h2>
        </div>
        <br />
        <p id="para">
          <div className="grid-image-showcase">
            <p data-aos="fade-right">
              <i className="para-italic">Indus Valley Civilization: </i>Travel back over 4,000 years to uncover the roots of India’s ancient past. The Indus Valley was one of the world’s earliest urban civilizations, known for its advanced city planning, mysterious script, and thriving trade networks. Discover how the people of Harappa and Mohenjo daro built a society far ahead of its time.
            </p>
            <img
              src="https://i3.wp.com/www.thetalentedindian.com/wp-content/uploads/2023/04/Screenshot-2023-04-16-at-9.53.57-AM.png"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <img
              src="https://i0.wp.com/d1v9pyzt136u2g.cloudfront.net/blog/wp-content/uploads/2021/12/09110423/taj6-2.jpg?resize=701%2C436&ssl=1"
              width={"80%"}
              data-aos="fade-right"
            />
            <p data-aos="fade-left">
              <i className="para-italic">The Mughal Era:</i> Immerse yourself in the opulence and artistry of the Mughal dynasty. Marvel at the breathtaking Taj Mahal, explore the majestic Red Fort, and witness the elegant fusion of Indian and Persian cultures that defined this golden age of architecture, art, and culture.
            </p>
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <p data-aos="fade-left">
              <i className="para-italic">Independence Struggle:</i> Step into the pages of India’s courageous fight for freedom from British colonial rule. Delve into the life and philosophy of Mahatma Gandhi, whose path of non-violence inspired a nation, and discover the sacrifices of countless freedom fighters who ignited the flame of independence.
            </p>
            <img
              src="https://scholarblogs.emory.edu/postcolonialstudies/files/2014/06/Marche_sel.jpg"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
        </p>
      </div>

      <div class="sec">
        <div id="heading">
          <h2
            style={{
              textAlign: "center",
              color: "rgb(13, 59, 102)"
            }}
          >
            Timeless Art & Grandeur
          </h2>
        </div>
        <br />
        <p id="para">
          <div className="grid-image-showcase">
            <p data-aos="fade-right">
              <i className="para-italic">Temples of Khajuraho:</i> Uncover the artistry and symbolism etched in stone at Khajuraho, a UNESCO World Heritage site. Admire its intricate carvings that celebrate life, spirituality, and human expression through exquisite temple architecture.
            </p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Khajuraho-Lakshmana_temple.JPG/640px-Khajuraho-Lakshmana_temple.JPG"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <img
              src="https://blog-content.ixigo.com/wp-content/uploads/2013/08/800px-AJANTA_CAVES_-_C.SHELARE_4.jpg"
              width={"80%"}
              data-aos="fade-right"
            />
            <p data-aos="fade-left">
              <i className="para-italic">Ellora and Ajanta Caves:</i> Ellora & Ajanta Caves
              Journey through time in the rock-cut sanctuaries of Ellora and Ajanta. These ancient caves, adorned with vibrant murals and intricate sculptures, chronicle the evolution of Indian art, spirituality, and craftsmanship across centuries.
            </p>
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <p data-aos="fade-right">
              <i className="para-italic">Majestic Forts & Royal Palaces: </i>Step into India’s regal past through its grand forts and opulent palaces. From the hilltop Amber Fort in Jaipur to the illuminated splendor of Mysore Palace, uncover the architectural brilliance, rich history, and legendary tales etched into their walls.
            </p>
            <img
              src="https://vagatrip.com/storage/blogs/April2023/1.%20Amber%20Fort,%20Jaipur,%20Rajasthan.jpg"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
        </p>
      </div>

      <div class="sec">
        <div id="heading">
          <h2
            style={{
              textAlign: "center",
              color: "rgb(13, 59, 102)"
            }}
          
          >
            Flavors of India
          </h2>
        </div>
        <br />
        <p id="para">
          <div className="grid-image-showcase">
            <p data-aos="fade-right">
              <i className="para-italic">Spice Trails of India: </i> From fiery chilies to fragrant cardamom, Indian cuisine is a vibrant celebration of spices. Embark on a flavorful journey across the diverse regions of India, uncovering the stories, ingredients, and iconic dishes that define its world-renowned culinary heritage.
            </p>
            <img
              src="https://earlyfoods.com/cdn/shop/articles/ever-wonder-what-to-do-with-your-extra-spices-and-herbs_2048x.jpg?v=1503383599"
              width={"80%"}
              data-aos="fade-left"
            />
          </div>
          <br />
          <br />
          <div className="grid-image-showcase">
            <img
              src="https://www.alcofoods.com/cdn/shop/articles/Pani_puri.jpg?v=1681207815"
              width={"80%"}
              data-aos="fade-right"
            />
            <p data-aos="fade-left">
              <i className="para-italic">Savoring the Streets: </i>
              Dive into India’s buzzing street food scene, where every corner offers a burst of flavor. Whether it’s tangy chaat in Delhi or the iconic vada pav of Mumbai, the streets serve up a delicious adventure like no other.
            </p>
          </div>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
