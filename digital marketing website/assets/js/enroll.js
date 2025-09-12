function PlanChoose() {
  const btn = document.getElementById("planChoose-btn"); // get the button

  btn.addEventListener("click", () => {
    console.log("the plan choose function is being triggered");

    // extract the plan
    const selectedPlan = document.querySelector(
      'input[name="planType"]:checked'
    ).value;

    // save it in localStorage
    localStorage.setItem("planType", selectedPlan);

    if (localStorage.getItem("planType")) {
      window.location.href = "Plans.html";
    }
  });
}
document.addEventListener("DOMContentLoaded", PlanChoose);

//check if the user have condition 
function checkedConditions() {
  const checkboxes = document.querySelectorAll(
    "#conditionChecklist input[type='checkbox']"
  );

  for (const checkbox of checkboxes) {
    if (checkbox.checked) {
      return "Have Condition";
    }
  }
  return "No Condition";
}

//extract user information from the modal
function extractData() {
  const btn = document.getElementById("user-info");
  console.log(btn);

  btn.addEventListener("click", () => {
    console.log("the data submission is currently loading");

    const lastName = document.getElementById("LastName")?.value.trim();
    const firstName = document.getElementById("FirstName")?.value.trim();
    const middleName = document.getElementById("MiddleName")?.value.trim();
    const birthDate = document.getElementById("bday")?.value;
    const address = document.getElementById("address")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const gender = document.querySelector(
      'input[name="gender"]:checked'
    )?.value;
    const civilStatus = document.getElementById("civil-status")?.value;
    let plan =
      document.querySelector(".card-title")?.innerText.trim() ?? "50K Plan";
    const condition = checkedConditions();

    if (
      !lastName ||
      !firstName ||
      !middleName ||
      !birthDate ||
      !address ||
      !email ||
      !gender ||
      !civilStatus
    ) {
      alert("Please complete all fields");
      return null;
    }

    // Parse the birth date
    const dateObj = new Date(birthDate);
    if (isNaN(dateObj.getTime())) {
      alert("Invalid date format");
      return null;
    }

    const data =  {
      fullName: `${lastName} ${firstName} ${middleName}`,
      birthDate: {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1, // Months are 0-indexed
        day: dateObj.getDate(),
      },
      address,
      email,
      gender,
      condition,
      plan,
      civilStatus,
    };
  });
  //localstorage for persistent data
  localStorage.setItem('data', data); 
}
document.addEventListener("DOMContentLoaded", sendDataToDB);


//send the data to the database and gmail
async function sendData(data){
  const btn = document.getElementById("gmail"); 
  btn.addEventListener('click', async (data) => {
    console.log('the fuckin function is being triggered')
    console.log(data);

  }); 
}; 
const data = extractData();
document.addEventListener('DOMContentLoaded', () => sendData(data));
