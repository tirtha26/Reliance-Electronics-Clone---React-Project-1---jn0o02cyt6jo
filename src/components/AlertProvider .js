// import React, { useState } from "react";

// // Global context to manage modal state
// const AlertContext = React.createContext();

// const AlertProvider = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [message, setMessage] = useState("");

//   const showAlert = (msg) => {
//     setMessage(msg);
//     setIsOpen(true);
//   };

//   const hideAlert = () => {
//     setIsOpen(false);
//     setMessage("");
//   };

//   return (
//     <AlertContext.Provider value={{ showAlert }}>
//       {children}
//       {isOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={hideAlert}>&times;</span>
//             <p>{message}</p>
//           </div>
//         </div>
//       )}
//     </AlertContext.Provider>
//   );
// };

