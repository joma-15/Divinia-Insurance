document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("submit");

  button.addEventListener("click", async function (event) {
    event.preventDefault();
    console.log("the button was triggered");

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
        console.log("Password or referral already exists in DB");
        alert("❌ Password or referral code already exists. Please try again.");
        return; // stop submission
      }

      // 4️⃣ Submit to Google Form if no duplicates
      const formUrl =
        "https://docs.google.com/forms/u/0/d/e/1FAIpQLSf4ILyBKJDLi1yHBwwQ8ZLbXYNgSmx9prgi-tqdRrvxSyn_mQ/formResponse";

      const params = new URLSearchParams();
      params.append("entry.1669826201", fullname);
      params.append("entry.305930707", username);
      params.append("entry.1025155675", password);
      params.append("entry.2067985687", referral);

      fetch(formUrl, {
        method: "POST",
        mode: "no-cors", // Google Forms needs this
        body: params,
      })
        .then(() => {
          alert("✅ Registration successful!");
          // Clear form
          document.getElementById("regName").value = "";
          document.getElementById("regUsername").value = "";
          document.getElementById("regPassword").value = "";
          document.getElementById("regReferral").value = "";

          window.location.href = "agentlogin.html";
        })
        .catch((error) => {
          console.error("Submission error:", error);
          alert("⚠️ An error occurred while sending the data.");
        });
    };

    // 5️⃣ Inject JSONP script to check duplicates
    const script = document.createElement("script");
    script.src = `https://script.google.com/macros/s/AKfycbzB9F4g68ZKkWnEN1wXA4BBTFXztXssO-VwK3YH87vPlUK7piQkcQwJd58-TtpwRhCn/exec?action=checkDuplicates&password=${encodeURIComponent(
      password
    )}&referral=${encodeURIComponent(referral)}&callback=${callbackName}`;
    document.body.appendChild(script);
  });
});

async function loginUser(username, password) {
  try {
    const url = `https://script.google.com/macros/s/AKfycbzB9F4g68ZKkWnEN1wXA4BBTFXztXssO-VwK3YH87vPlUK7piQkcQwJd58-TtpwRhCn/exec?action=isAccountValid&username=${encodeURIComponent(
      username
    )}&password=${encodeURIComponent(password)}`;

    console.log("🔗 Fetching URL:", url);

    const response = await fetch(url);

    console.log("📩 Raw Response Status:", response.status);

    if (!response.ok) {
      console.error("❌ Server returned an error:", response.status);
      alert("Invalid username or password, please try again.");
      return null;
    }

    const data = await response.json(); // ✅ only once
    console.log("✅ Parsed Response:", data);

    if (!data || !data.extraData) {
      alert("Incorrect username and password.");
      return null;
    }

    // ✅ Store data in localStorage
    localStorage.setItem("referral", data.extraData);

    console.log("📦 Stored referral:", data.extraData);

    // ✅ Redirect to dashboard
    window.location.href = "agentDashboard.html";

    return data.extraData;
  } catch (error) {
    console.error(
      "🔥 An error occurred while checking validity of data",
      error
    );
    // alert("Something went wrong. Please try again later.");
    return null;
  }
}

const loginbutton = document.getElementById("submit-log");

if (loginbutton) {
  // ✅ Attach event listener once
  loginbutton.addEventListener("click", async (e) => {
    e.preventDefault();
    const username = document.getElementById("logUsername").value.trim();
    const password = document.getElementById("logPassword").value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    await loginUser(username, password);
  });
}

async function DisplayUserData() {
  const referral = localStorage.getItem("referral");
  const url = `https://script.google.com/macros/s/AKfycbwXtZDcI2_V0aXn9o2dKhPvpk6S2jvRgZkL9m55gDYr-RZzIedgbT_3dbnFySCzFljgSQ/exec?logReferral=${encodeURIComponent(referral)}`;
  const agentName = "Agent"; // You can fetch this dynamically
  try {
    const response = await fetch(url);
    const clients = await response.json();

    document.getElementById(
      "welcomeMessage"
    ).textContent = `Welcome, ${agentName}`;

    const tbody = document.querySelector("#clientsTable tbody");
    const totalClients = document.getElementById("totalClients");

    clients.forEach((client) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${client.username}</td><td>${client.selected_plan}</td><td>${client.type}</td>`;
      tbody.appendChild(row);
    });

    totalClients.textContent = clients.length;
  } catch (error) {
    console.error("an error occured ", error);
  }
}
console.log("before calling user data");
document.addEventListener("DOMContentLoaded", DisplayUserData);
