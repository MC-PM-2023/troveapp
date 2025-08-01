// import { useNavigate } from "react-router-dom";

// import axios from 'axios';
// export default function Gridcards() {
//   // Function to navigate to external URLs
 
//  const navigate=useNavigate();

//   // function gotochatsql() {
//   //   window.location.href = "http://34.93.84.198/";
//   // }
//   // function handleelicita(){
//   //   window.location.href = "https://datasolve-webapp.el.r.appspot.com/"
//   // }
//   function handletextinputsearch(){
//     navigate("/textinputsearch")
//   }
//   function handlesearchwithexcel(){
//     navigate('/searchwithexcel')
//   }



// // function handlechecklistapp(){
// //   window.location.href="http://34.47.237.156:8080/"
// //   //  window.location.href="http://localhost:5173/"
// // }






// // function handlechecklistapp() {
// //   const token = localStorage.getItem("auth_token");

// //   if (!token) {
// //     alert("Unauthorized access! Please log in first.");
// //     return;
// //   }

// //   // Verify the token before redirecting
// //   axios
// //     .get("http://34.93.84.198:4000/api/verifytoken", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //     .then((response) => {
// //       if (response.status === 200) {
// //         // ✅ Redirect to Checklist App with the token
// //         window.location.href = `http://34.47.237.156:8080/?auth=${token}`;
// //       } else {
// //         alert("Unauthorized access");
// //       }
// //     })
// //     .catch(() => {
// //       alert("Access denied. Invalid token.");
// //     });
// // }




// //original code

// // function handlechecklistapp() {
// //   const token = localStorage.getItem("auth_token");

// //   if (!token) {
// //     alert("Unauthorized access! Please log in first.");
// //     return;
// //   }

// //   // ✅ FIX: Use port 5000 instead of 4000
// //   axios
// //     .get("http://34.93.84.198:5000/auth/verify-token", {
// //       headers: { Authorization: `Bearer ${token}` },
// //     })
// //     .then((response) => {
// //       if (response.status === 200) {
// //         console.log("Token verified. Redirecting...");
// //         window.location.href = `http://34.47.237.156:8080/?auth=${token}`;
// //       }
// //     })
// //     .catch((error) => {
// //       console.error("Token Verification Error:", error);
// //       alert("Access denied. Invalid token.");
// //     });
// // }



// // function handlechecklistapp() {
// //   const token = localStorage.getItem("auth_token");

// //   if (!token) {
// //     alert("Please log in first.");
// //     return;
// //   }

// //   axios
// //     .get("http://34.47.237.156:8080/", {
// //       headers: {
// //         Authorization: `Bearer ${token}`,
// //       },
// //     })
// //     .then((response) => {
// //       if (response.status === 200) {
// //         window.location.href = `http://localhost:8080/?auth=${token}`;
// //       } else {
// //         alert("Unauthorized access");
// //       }
// //     })
// //     .catch((error) => console.error("Error:", error));
// // }





// function handlechecklistapp() {
//   const token = sessionStorage.getItem("auth_token"); // ✅ Ensuring consistency with landed.jsx
// console.log(" gridcard checklist Token:",token)
//   if (!token) {
//     alert("Unauthorized access! Please log in first.");
//     return;
//   }

//   axios
//     .get("http://34.93.2.122:5000/auth/verify-token", { // ✅ Ensuring backend consistency
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         console.log("✅ Token verified. Redirecting...");
//         window.location.href = `http://34.93.2.122:8080/?auth=${token}`;
//       }
//     })
//     .catch((error) => {
//       console.error("❌ Token Verification Error:", error);
//       alert("Access denied. Invalid token.");
//       sessionStorage.removeItem("auth_token"); // ✅ Ensuring token is removed on failure
//     });
// }



//   return (
//     <>
//       <div className="container mt-5 mb-5 " >
//         <div className="row row-cols-1 row-cols-md-3 g-4 ">
//           {/* Chat with SQL Card */}
//           {/* <div className="col">
//             <div className="card bg-dark bg-gradient text-white">
//               <div className="card-body">
//                 <h3 className="card-title text-center fw-bold">Chat with SQL</h3>
//                 <p
//                   className="card-text-justify text-justify "
//                   style={{ textAlign: "justify" }}
//                 >
//                   ChatSQL is a powerful tool that transforms natural language
//                   questions into SQL queries, making database interaction
//                   seamless and accessible. It allows users to explore, retrieve,
//                   and analyze data without requiring technical SQL skills. By
//                   bridging the gap between plain language and databases, ChatSQL
//                   simplifies data-driven decision-making for everyone.
//                 </p>
//                 <div className="text-center">
//                   <button
//                     className="btn btn-info bg-gradient"
//                     //onClick={gotochatsql}
//                   >
//                     Chat With SQL
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* Text Input Search Card */}
//           {/* <div className="col">
//             <div className="card bg-dark bg-gradient text-white">
//               <div className="card-body">
//                 <h3 className="card-title text-center fw-bold">
//                   Elicita App
//                 </h3>
//                 <p
//                   className="card-text-justify"
//                   style={{ textAlign: "justify" }}
//                 >
//                   Text Input Search is a simple and effective way to find data
//                   by typing keywords or phrases into a search bar. It
//                   dynamically filters results in real-time, making it ideal for
//                   quick data retrieval. This feature enhances user experience by
//                   providing instant, accurate results in an intuitive and
//                   user-friendly manner.
//                 </p>
//                 <div className="text-center">
//                   <button className="btn btn-info bg-gradient" onClick={handleelicita}>
//                     Elicita App
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div> */}

//           {/* Search With Excel Card */}
//           <div className="col">
//             <div className="card bg-dark bg-gradient text-white">
//               <div className="card-body">
//                 <h3 className="card-title text-center fw-bold">
//                   Search With Excel
//                 </h3>
//                 <p
//                   className="card-text-justify"
//                   style={{ textAlign: "justify" }}
//                 >
//                   Search with Excel using Input Tags lets users filter and
//                   retrieve data by entering criteria through input fields and
//                   export the results to an Excel file. This feature simplifies
//                   data querying, enhances usability, and provides an efficient
//                   way to manage and share data dynamically, catering to diverse
//                   user needs efficiently.
//                 </p>
//                 <div className="text-center">
//                   <button className="btn btn-info bg-gradient" onClick={handlesearchwithexcel}>
//                     Search With Excel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Tools Web App Card */}
//           {/* <div className="col">
//             <div className="card bg-dark bg-gradient text-white">
//               <div className="card-body">
//                 <h3 className="card-title text-center fw-bold">
//                   Tools Web App
//                 </h3>
//                 <p
//                   className="card-text-justify"
//                   style={{ textAlign: "justify" }}
//                 >
//                   Search with Excel using Input Tags lets users filter and
//                   retrieve data by entering criteria through input fields and
//                   export the results to an Excel file. This feature simplifies
//                   data querying, enhances usability, and provides an efficient
//                   way to manage and share data dynamically, catering to diverse
//                   user needs efficiently.
//                 </p>
//                 <div className="text-center">
//                   <button className="btn btn-info bg-gradient">Tools Web App</button>
//                 </div>
//               </div>
//             </div>
//           </div> */}


//   {/* Text input search */}
//    <div className="col">
//             <div className="card bg-dark bg-gradient text-white">
//               <div className="card-body">
//                 <h3 className="card-title text-center fw-bold">
//                   Text Input Search
//                 </h3>
//                 <p
//                   className="card-text-justify"
//                   style={{ textAlign: "justify" }}
//                 >     
// A text input search using a form allows users to enter queries into a text field and submit them via a button or key press to search for specific data dynamically. It is commonly used for filtering or retrieving information from a database, interactive, and precise search functionality in modern applications or websites.</p>
//                 <div className="text-center mt-3">
//                   <button className="btn btn-info bg-gradient " onClick={handletextinputsearch}>Text input Search</button>
//                 </div>
//               </div>
//             </div>
//           </div> 


//   {/* Checklist app */}
//   <div className="col">
//             <div className="card bg-dark bg-gradient text-white">
//               <div className="card-body">
//                 <h3 className="card-title text-center fw-bold">
//                   Refsolve App
//                 </h3>
//                 <p
//                   className="card-text-justify"
//                   style={{ textAlign: "justify" }}
//                 >     
// Refsolve is a powerful and intuitive tool designed to streamline task management and improve productivity. Whether you're managing personal to-do lists, team projects,  this app ensures nothing gets overlooked. With features like real-time collaboration, customizable and users can stay organized effortlessly
//                 <div className="text-center ">
//                   <button className="btn btn-info bg-gradient " onClick={handlechecklistapp}>Refsolve App</button>
//                 </div>
                
//                   </p>
//               </div>
            
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// export default function Gridcards() {
//   const navigate = useNavigate();


// function handlechecklistapp() {
//   const token = sessionStorage.getItem("auth_token"); // ✅ Ensuring consistency with landed.jsx
// console.log(" gridcard checklist Token:",token)
//   if (!token) {
//     alert("Unauthorized access! Please log in first.");
//     return;
//   }

//   axios
//     .get("http://34.93.2.122:5000/auth/verify-token", { // ✅ Ensuring backend consistency
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => {
//       if (response.status === 200) {
//         console.log("✅ Token verified. Redirecting...");
//         window.location.href = `http://34.93.2.122:8080/?auth=${token}`;
//       }
//     })
//     .catch((error) => {
//       console.error("❌ Token Verification Error:", error);
//       alert("Access denied. Invalid token.");
//       sessionStorage.removeItem("auth_token"); // ✅ Ensuring token is removed on failure
//     });
// }



//   return (
//     <main className="container py-5">
//       <h2 className="text-center text-bold mb-4">Our Apps</h2>
//       <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
//         {/* <div className="col">
//           <div className="card mb-4 rounded-3 shadow-sm">
//             <div className="card-header py-3">
//               <h4 className="my-0 fw-normal">Trove</h4>
//             </div>
//             <div className="card-body">
//              <p className="text-left">Search with Excel using Input Tags lets users filter and
//                    retrieve data by entering criteria through input fields and
//                   export the results to an Excel file. This feature simplifies
//                    data querying, enhances usability, and provides an efficient
//                    way to manage and share data dynamically, catering to diverse
//             user needs efficiently.</p>
           
//               <button className="w-100 btn btn-lg btn-outline-primary stretched-link" onClick={() => navigate('/textinputsearch')}>
//                 Trove
//               </button>
//             </div>
//           </div>
//         </div> */}
//  <div className="col">
//           <div className="card mb-4 rounded-3 shadow-sm">
//             <div className="card-header py-3">
//               <h4 className="my-0 fw-normal">RefSolve</h4>
//             </div>
//             <div className="card-body">
//              <p className="text-left">Search with Excel using Input Tags lets users filter and
//                    retrieve data by entering criteria through input fields and
//                   export the results to an Excel file. This feature simplifies
//                    data querying, enhances usability, and provides an efficient
//                    way to manage and share data dynamically, catering to diverse
//             user needs efficiently.</p>
           
//               <button className="w-100 btn btn-lg btn-outline-primary stretched-link" onClick={handlechecklistapp}>
//                 RefSolve
//               </button>
//             </div>
//           </div>
//         </div>

       

     

//       </div>

    
      
//     </main>
//   );
// }



import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Gridcards() {
  const navigate = useNavigate();

  // Function to retrieve token from sessionStorage or localStorage
  function getAuthToken() {
    let token = sessionStorage.getItem("auth_token");

    // Fallback to localStorage if sessionStorage is empty
    if (!token) {
      token = localStorage.getItem("auth_token");
      if (token) {
        //console.warn("⚠️ Using token from localStorage instead of sessionStorage.");
      }
    }

    //console.log("🔑 Retrieved Token:", token);
    return token;
  }

  function handleChecklistApp() {
    const token = getAuthToken();

    if (!token) {
      alert("Unauthorized access! Please log in first.");
      return;
    }

    axios
      .get("http://34.93.2.122:5000/auth/verify-token", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log("✅ Token verified. Redirecting...");
          window.location.href = `http://34.93.2.122:8080/?auth=${token}`;
        }
      })
      .catch((error) => {
        // console.error("❌ Token Verification Error:", error);
        alert("Access denied. Invalid token.");
        sessionStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token"); // Also clear from localStorage
      });
  }

    function handletextinputsearch(){
    navigate("/textinputsearch")
  }

  // Debugging: Log token on component mount
  useEffect(() => {
    // console.log("🛠️ Debug: Checking stored token...");
    getAuthToken();
  }, []);

  return (
    <main className="container py-5">
      <h2 className="text-center text-bold mb-4">Our Apps</h2>
      <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
        <div className="col">
          <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">RefSolve</h4>
            </div>
            <div className="card-body">
              <p className="text-left">
                Search with Excel using Input Tags lets users filter and
                retrieve data by entering criteria through input fields and
                export the results to an Excel file. This feature simplifies
                data querying, enhances usability, and provides an efficient
                way to manage and share data dynamically, catering to diverse
                user needs efficiently.
              </p>
              <button
                className="w-100 btn btn-lg btn-outline-primary stretched-link"
                onClick={handleChecklistApp}
              >
                RefSolve
              </button>
            </div>
          </div>
        </div>
          {/* Text input search */}
                <div className="col">
         <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Trove</h4>
            </div>
            <div className="card-body">
             <p className="text-left">Search with Excel using Input Tags lets users filter and
                   retrieve data by entering criteria through input fields and
                  export the results to an Excel file. This feature simplifies
                   data querying, enhances usability, and provides an efficient
                   way to manage and share data dynamically, catering to diverse
            user needs efficiently.</p>
           
              <button className="w-100 btn btn-lg btn-outline-primary stretched-link" onClick={() => navigate('/textinputsearch')}>
                Trove
              </button>
            </div>
          </div>
        </div> 
      </div>
    </main>
  );
}
