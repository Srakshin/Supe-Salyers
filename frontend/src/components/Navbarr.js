// import "./styles.css";
// import React, { useState } from "react";
// import { MdStorefront } from "react-icons/md";
// import { BiSolidUpArrowAlt } from "react-icons/bi"
// import { RiMapPin2Line } from "react-icons/ri";
// import { PiChatsCircleThin } from "react-icons/pi";
// import FloatingChat from "./FloatingChat";
// function Navbarjs() {
//   const [showChat, setShowChat] = useState(false);
//   return (
//     <nav class="menu" id="menu">
//       <input class="menu-toggler" type="checkbox" />
//       <label for="menu-toggler"></label>

//       <ul
//         style={{
//           transition: "all 300ms linear",
//         }}
//       >
//         <li class="menu-item">
//         <a href="/india"><RiMapPin2Line  /></a>
//         </li>
//         <li class="menu-item">
//         <a href="/trade"><MdStorefront /></a>
//         </li>
//         {/* <li class="menu-item">
//           <a href="/chat"><PiChatsCircleThin /></a> 
//         </li> */}
//         <li className="menu-item">
//             <a href="#" onClick={(e) => { e.preventDefault(); setShowChat(!showChat); }}>
//               <PiChatsCircleThin />
//             </a> {/* ✅ Toggle chat popup here */}
//           </li>
//         <li class="menu-item">
//           <a class="" href="#top-section"><BiSolidUpArrowAlt /></a>
//         </li>
//         <li class="menu-item">
//           <a class="fa fa-users" href="#my-footer"></a>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Navbarjs;
// import "./styles.css";
// import { MdStorefront } from "react-icons/md";
// import { BiSolidUpArrowAlt } from "react-icons/bi";
// import { RiMapPin2Line } from "react-icons/ri";
// import { PiChatsCircleThin } from "react-icons/pi";
// import { useState } from "react";
// import FloatingChat from "./FloatingChat";

// function Navbarjs() {
//   const [showChat, setShowChat] = useState(false);

//   const toggleChat = (e) => {
//     e.preventDefault(); // so it doesn't navigate
//     setShowChat((prev) => !prev);
//   };

//   return (
//     <>
//       <nav className="menu" id="menu">
//         <input className="menu-toggler" type="checkbox" />
//         <label htmlFor="menu-toggler"></label>

//         <ul style={{ transition: "all 300ms linear" }}>
//           <li className="menu-item">
//             <a href="/india"><RiMapPin2Line /></a>
//           </li>
//           <li className="menu-item">
//             <a href="/trade"><MdStorefront /></a>
//           </li>
//           <li className="menu-item">
//             {/* Change this to toggle popup */}
//             <a href="#" onClick={toggleChat}><PiChatsCircleThin /></a>
//           </li>
//           <li className="menu-item">
//             <a href="#top-section"><BiSolidUpArrowAlt /></a>
//           </li>
//           <li className="menu-item">
//             <a href="#my-footer">👥</a>
//           </li>
//         </ul>
//       </nav>

//       {showChat && <FloatingChat />}
//     </>
//   );
// }

// export default Navbarjs;
import "./styles.css";
import { MdStorefront } from "react-icons/md";
import { BiSolidUpArrowAlt } from "react-icons/bi";
import { RiMapPin2Line } from "react-icons/ri";
import { PiChatsCircleThin } from "react-icons/pi";
import { useState } from "react";
import FloatingChat from "./FloatingChat";

function Navbarjs() {
  const [showChat, setShowChat] = useState(false);

  const toggleChat = (e) => {
    e.preventDefault(); // so it doesn't navigate
    setShowChat((prev) => !prev);
  };

  return (
    <>
      <nav className="menu" id="menu">
        <input className="menu-toggler" type="checkbox" />
        <label htmlFor="menu-toggler"></label>

        <ul style={{ transition: "all 300ms linear" }}>
          <li className="menu-item">
            <a href="/india"><RiMapPin2Line /></a>
          </li>
          <li className="menu-item">
            <a href="/trade"><MdStorefront /></a>
          </li>
          <li className="menu-item">
            {/* Change this to toggle popup */}
            <a href="#" onClick={toggleChat}><PiChatsCircleThin /></a>
          </li>
          <li className="menu-item">
            <a href="#top-section"><BiSolidUpArrowAlt /></a>
          </li>
          <li className="menu-item">
            <a href="#my-footer">👥</a>
          </li>
        </ul>
      </nav>

      {showChat && <FloatingChat />}
    </>
  );
}

export default Navbarjs;
