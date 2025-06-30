//direct the link depending on the selected value 
function PlanChoose(event){
    const selectedPlan = document.querySelector('input[name="planType"]:checked').value;
     event.preventDefault(); // prevent immediate navigation


    if (selectedPlan == "Individual" || selectedPlan == "Family" || selectedPlan == "Senior") {
            window.location.href = "Plans.html"
    }

    if (selectedPlan == "Group") {
        const modal = new bootstrap.Modal(document.getElementById('group-modal')); 
        modal.show();
             
    }
}


  function openClientModal() {
    const groupModal = bootstrap.Modal.getInstance(document.getElementById('group-modal'));
    groupModal.hide();

    const clientDetailsModal = new bootstrap.Modal(document.getElementById('clientDetailsModal'));
    clientDetailsModal.show();
  
  }

//sending data from the form to the excel sheet 
async function sendData(){
  console.log('send data called')
  function filteredData(){//filter data first before sending 
    const lastName = document.getElementById('LastName'); 
    const firstName = document.getElementById('FirstName');
    const middleName = document.getElementById('MiddleName');

    if (lastName && firstName && middleName) {//if the element exist in the dom
      const fullName = `${lastName.value} ${firstName.value} ${middleName.value}`;
      const birthDate = document.getElementById('bday')?.value.trim(); 
      const address = document.getElementById('address')?.value.trim(); 
      const email = document.getElementById('email')?.value.trim();
      const gender = document.querySelector('input[name="gender"]:checked')?.value;
      const civilStatus = document.getElementById('civil-status')?.value;

      if(fullName && birthDate && address && email && gender && civilStatus){
        const data = {
          fullName, 
          birthDate, 
          address, 
          email, 
          gender, 
          civilStatus
        };
        return data;

      }else{
        alert('please complete this all field');
        return null;
      }
     }
    }

    const data = filteredData(); 
    if(!data) return;

    const scriptUrl = "https://script.google.com/macros/s/AKfycbwWPN0ohuw17pO-zC2DTMwsGeZRf4G-nOA4YlA61EBxKxM291Ug7N7MBeF3XhGDlxJTRg/exec";
    try {
      const response = await fetch(scriptUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        }, 
        body: JSON.stringify(filteredData()),
      });

      if(!response.ok){
        throw new error('Server responded with status ' + response.status);
      }
      console.log('data has been sent successfully ' + response);
    } catch (error) {
      console.error('Error sending data: ', error)
    }
  }

