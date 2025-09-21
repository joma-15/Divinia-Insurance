function sendRegisterData() {
  const button = document.getElementById("submit");

  button.addEventListener("click", function (event) {
    event.preventDefault();
    console.log('the button was being triggered');

    // 1️⃣ Get form input values
    const fullname = document.getElementById("regName").value.trim();
    const username = document.getElementById("regUsername").value.trim();
    const password = document.getElementById("regPassword").value.trim();
    const referral = document.getElementById("regReferral").value.trim();

    if (!fullname || !username || !password || !referral) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    // 2️⃣ Generate a unique JSONP callback name
    const callbackName = "jsonpCallback_" + Date.now();

    // 3️⃣ Define the callback function
    window[callbackName] = function (data) {
      // Clean up script & callback
      delete window[callbackName];
      document.body.removeChild(script);

      if (data.exists) {
        console.log("password or referral code already exist in the database");
        alert("❌ Password or referral code already exists. Please try again.");
        return; // stop submission
      }

      // 4️⃣ Submit to Google Form if no duplicates
      const formUrl = "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf4ILyBKJDLi1yHBwwQ8ZLbXYNgSmx9prgi-tqdRrvxSyn_mQ/formResponse";

      const params = new URLSearchParams();
      params.append("entry.1669826201", fullname);
      params.append("entry.305930707", username);
      params.append("entry.1025155675", password);
      params.append("entry.2067985687", referral);

      fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // required for Google Forms
        body: params,
      })
        .then(() => {
          alert("✅ Registration successful!");
          // Optional: clear form
          document.getElementById("regName").value = "";
          document.getElementById("regUsername").value = "";
          document.getElementById("regPassword").value = "";
          document.getElementById("regReferral").value = "";
        })
        .catch((error) => {
          console.error("Submission error:", error);
          alert("⚠️ An error occurred sending the data.");
        });
    };

    // 5️⃣ Inject JSONP script to check duplicates
    const script = document.createElement("script");
    script.src = `https://script.google.com/macros/s/AKfycbxea7hCMikiZSZDV8Se17s5CDBHbJj0UsSmL_GP3RvYtrNlE8B-j13KYuQCNP_qEDwI/exec?password=${encodeURIComponent(
      password
    )}&referral=${encodeURIComponent(referral)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", sendRegisterData);


