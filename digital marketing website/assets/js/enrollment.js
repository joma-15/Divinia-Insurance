//direct the link depending on the selected value
function PlanChoose() {
  console.log("the planchoose function is being triggered");
  const selectedPlan = document.querySelector(
    'input[name="planType"]:checked'
  ).value;
  console.log(selectedPlan);
  localStorage.setItem("selectedPlan", selectedPlan);

  // if (selectedPlan == "Individual" || selectedPlan == "Family" || selectedPlan == "Senior") {
  //         window.location.href = "Plans.html"
  // }

  // if (selectedPlan == "Group") {
  //     const modal = new bootstrap.Modal(document.getElementById('group-modal'));
  //     modal.show();

  // }
  window.location.href = "Plans.html";
}

function openClientModal() {
  const groupModal = bootstrap.Modal.getInstance(
    document.getElementById("group-modal")
  );
  groupModal.hide();

  const clientDetailsModal = new bootstrap.Modal(
    document.getElementById("clientDetailsModal")
  );
  clientDetailsModal.show();
}

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

function extractData() {
  const lastName = document.getElementById("LastName")?.value.trim();
  const firstName = document.getElementById("FirstName")?.value.trim();
  const middleName = document.getElementById("MiddleName")?.value.trim();
  const birthDate = document.getElementById("bday")?.value;
  const address = document.getElementById("address")?.value.trim();
  const email = document.getElementById("email")?.value.trim();
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
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

  return {
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
}

function saveToLocalStorage(formdata) {
  console.log("the data has been saved to local storage");
  console.log(formdata);
  if (formdata) {
    localStorage.setItem("data", JSON.stringify(formdata));
  } else {
    console.error(
      "An error has been occured while saving the data to the localstorage"
    );
  }
}

function getData() {
  console.log("get data function is being triggered");
  const formData = localStorage.getItem("data");
  // const selectedPlan = localStorage.getItem('selectedPlan');

  if (formData) {
    const parseData = JSON.parse(formData);
    // console.log(selectedPlan);
    localStorage.removeItem("data"); //clear the data after extracting
    // localStorage.removeItem(('selectedPlan'))

    return parseData;
  }
}

async function submitData(data) {
  console.log('the submit data to db has been triggered');
  const formUrl =
    // "https://docs.google.com/forms/d/e/1FAIpQLScVcBDaGA9Rj93kd6K0GzDkm9ymkbz-rLjOKpFqE6DAzdKE1w/formResponse";
    "https://docs.google.com/forms/d/e/1FAIpQLScQmnDQfzBud88VDwXSRxZb_Kj3Qeh0WVpCnv297P4I0QkJHg/formResponse";
  const params = new URLSearchParams();

  // Map your data to Google Form fields (verify these entry IDs)
  // const formFields = {
  //   "entry.118683267": localStorage.getItem("selectedPlan"),
  //   "entry.328719651": data.fullName,
  //   "entry.1226942228_year": data.birthDate.year,
  //   "entry.1226942228_month": data.birthDate.month,
  //   "entry.1226942228_day": data.birthDate.day,
  //   "entry.1564645568": data.address,
  //   "entry.1830843199": data.email,
  //   "entry.113235889": data.gender,
  //   "entry.1003466199": data.civilStatus,
  //   "entry.526372370": data.condition,
  //   "entry.2137808509": data.plan,
  //   "entry.579757869": "Pending",
  // };

  const formFields = {
    "entry.807207221": localStorage.getItem("selectedPlan"),
    "entry.1368872495": data.fullName,
    "entry.265391803": data.address,
    "entry.21286280": data.email,
    "entry.914829469": data.gender,
    "entry.1102795712": data.civilStatus,
    "entry.962982325": data.condition,
    "entry.354268935": data.plan,
    "entry.277015241_year": data.birthDate.year,
    "entry.277015241_month": data.birthDate.month,
    "entry.277015241_day": data.birthDate.day,
    "entry.597664781": "Pending",
    "entry.118563215": "tiyo dado",
  };

  for (const [key, value] of Object.entries(formFields)) {
    params.append(key, value);
  }

  if (!data) return false;

  try {
    const response = await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: params,
    });
    console.log("Data has been sent successfully", response.text);
    alert("the data has been submitted successfully");
  } catch (error) {
    alert("an error occured sending the data");
    console.error("An error occured " + error);
  }
}

//for form click
function saveOnClick() {
  document.getElementById("save-info").addEventListener("click", () => {
    const data = extractData();

    if (data) {
      saveToLocalStorage(data);
    }
  });
}
saveOnClick();

async function submitOnClick(event) {
  console.log("the function is triggered");

  // 1️⃣ Get localStorage data
  const localStorageData = getData();
  if (localStorageData) {
    await submitData(localStorageData);
    console.log("The form data has been sent to Google Form / DB");
  }
}
