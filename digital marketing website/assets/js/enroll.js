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
      window.location.href = "payment.html";
    }
  });
}

// wait until the DOM is ready
document.addEventListener("DOMContentLoaded", PlanChoose);


//send the data to the excel sheet 
async function sendData(){
  
}

