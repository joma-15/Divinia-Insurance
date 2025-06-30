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

// //sending data to the google form
// async function sendData(){
//   console.log('send data called')
//   function filteredData(){//filter data first before sending 
//     const lastName = document.getElementById('LastName'); 
//     const firstName = document.getElementById('FirstName');
//     const middleName = document.getElementById('MiddleName');

//     if (lastName && firstName && middleName) {//if the element exist in the dom
//       const fullName = `${lastName.value} ${firstName.value} ${middleName.value}`;
//       const birthDate = document.getElementById('bday')?.value.trim(); 
//       const address = document.getElementById('address')?.value.trim(); 
//       const email = document.getElementById('email')?.value.trim();
//       const gender = document.querySelector('input[name="gender"]:checked')?.value;
//       const civilStatus = document.getElementById('civil-status')?.value;

//       if(fullName && birthDate && address && email && gender && civilStatus){
//         const data = {
//           fullName, 
//           birthDate, 
//           address, 
//           email, 
//           gender, 
//           civilStatus
//         };
//         return data;

//       }else{
//         alert('please complete this all field');
//         return null;
//       }
//      }
//     }

//     async function submitData(data){
//       const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScVcBDaGA9Rj93kd6K0GzDkm9ymkbz-rLjOKpFqE6DAzdKE1w/viewform?usp=sharing&ouid=106648255566652599713';
//       const params = new URLSearchParams();//query parameters

//       //appending some value 
//       const datas = [' ', data.fullName, data.birthDate.year, data.birthDate.month, data.birthDate.day, data.address, data.email, data.gender, data.civilStatus, ' ']; 
//       const entries = ['entry.118683267', 'entry.328719651','entry.113235889','entry.1003466199','entry.1830843199','entry.1564645568','entry.1226942228_year',
//                         'entry.1226942228_month','entry.1226942228_day','entry.579757869'
//       ];

//       for (let i = 0; i < datas.length; i++) {
//         params.append(entries[i], datas[i]);    
//       }

//       try {
//         const response = await fetch(`${formUrl}?${params.toString()}`, {
//           method: 'POST', 
//           mode: 'no-cors',
//           headers: {
//             'content-Type': 'application/x-www-form-urlencoded'
//           }
//         });
//         console.log('The data has been sent successfully');
//         return true;
//       } catch (error) {
//         alert('an errored has occured'); 
//         console.error('An error has occured ' + error); 
//         return false;
//       }
//     }
//     submitData(filteredData());
//   }

async function sendData() {
  console.log('send data called');
  
  // Filter and prepare data
  function prepareFormData() {
    const lastName = document.getElementById('LastName')?.value.trim();
    const firstName = document.getElementById('FirstName')?.value.trim();
    const middleName = document.getElementById('MiddleName')?.value.trim();
    const birthDate = document.getElementById('bday')?.value;
    const address = document.getElementById('address')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const civilStatus = document.getElementById('civil-status')?.value;

    if (!lastName || !firstName || !middleName || !birthDate || !address || !email || !gender || !civilStatus) {
      alert('Please complete all fields');
      return null;
    }

    // Parse the birth date
    const dateObj = new Date(birthDate);
    if (isNaN(dateObj.getTime())) {
      alert('Invalid date format');
      return null;
    }

    return {
      fullName: `${lastName} ${firstName} ${middleName}`,
      birthDate: {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1, // Months are 0-indexed
        day: dateObj.getDate()
      },
      address,
      email,
      gender,
      civilStatus
    };
  }

  // Submit data to Google Form
  async function submitData(data) {
    if (!data) return false;

    // Use the form submission URL (replace with your actual form ID)
    const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScVcBDaGA9Rj93kd6K0GzDkm9ymkbz-rLjOKpFqE6DAzdKE1w/formResponse';
    
    const params = new URLSearchParams();
    
    // Map your data to Google Form fields (verify these entry IDs)
    params.append('entry.118683267', "hello world");
    params.append('entry.328719651', data.fullName);         // Full name
    params.append('entry.1226942228_year', data.birthDate.year);  // Year
    params.append('entry.1226942228_month', data.birthDate.month); // Month
    params.append('entry.1226942228_day', data.birthDate.day);    // Day
    params.append('entry.1564645568', data.address);         // Address
    params.append('entry.1830843199', data.email);             // Email
    params.append('entry.113235889', data.gender);           // Gender
    params.append('entry.1003466199', data.civilStatus);     // Civil Status
    params.append('entry.579757869', "Paid");

    try {
      await fetch(formUrl, {
        method: 'POST',
        mode: 'no-cors',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      console.log('nagpasa ang data gumana ito');
      return true;
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred while submitting');
      return false;
    }
  }

  // Execute the process
  const formData = prepareFormData();
  return await submitData(formData);
}

// To use this:
// sendData().then(success => {
//   if (success) { /* do something on success */ }
// });
