import React, { useState } from "react";
import "./EventsPopup.css";

function EventsPopup() {
  const [visible, setVisible] = useState(true); // For toggling visibility

  if (!visible) return null;

  return (
    <div className="floating-popup-box">
      <div className="popup-header">
        🎉 Traditional Events
        <span className="close-btn" onClick={() => setVisible(false)}>✖</span>
      </div>
      <div className="popup-content">
        <ul>
          <li>Diwali (Festival of Lights)</li>
          <li>Holi (Festival of Colors)</li>
          <li>Navratri & Dussehra</li>
          <li>Pongal / Makar Sankranti</li>
          <li>Onam</li>
          <li>Eid / Christmas</li>
        </ul>
      </div>
    </div>
  );
}

// export default EventsPopup;

// export default EventsPopup;
// import React, { useState } from "react";
// import "./EventPopup.css";

// function EventsPopup() {
//   const [visible, setVisible] = useState(true); // For toggling visibility

//   if (!visible) return null;

//   return (
//     <div className="floating-popup-box">
//       <div className="popup-header">
//         🎉 Traditional Events
//         <span className="close-btn" onClick={() => setVisible(false)}>✖</span>
//       </div>
//       <div className="popup-content">
//         <ul>
//           <li>Diwali (Festival of Lights)</li>
//           <li>Holi (Festival of Colors)</li>
//           <li>Navratri & Dussehra</li>
//           <li>Pongal / Makar Sankranti</li>
//           <li>Onam</li>
//           <li>Eid / Christmas</li>
//         </ul>
//       </div>
//     </div>
//   );
// }

export default EventsPopup;
