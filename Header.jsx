import React, { useState } from "react";
import './Header.css'
// import './Email.css';

function Header() {
  const [email, setEmail] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setEmail("");
        console.log("Email sent successfully!");
      } else {
        console.error("Error sending email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending email:", error.message);
    }
  };

  return (


<form id="email-registration" action="/" method="post" onSubmit={handleSubscribe}>
   <div className="anku" >
    <span>
     SIGN UP FOR OUR DAILY INSIDER 
       <input className="ip" name="email" type="email" placeholder="Enter your email"   value={email} onChange={(e) => setEmail(e.target.value)}/>
       <button > subscribe </button>
       </span>
   </div>
</form>
  );
}

export default Header;