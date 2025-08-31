function extractData(){
  const lastName = document.getElementById('LastName')?.value.trim();
    const firstName = document.getElementById('FirstName')?.value.trim();
    const middleName = document.getElementById('MiddleName')?.value.trim();
    const birthDate = document.getElementById('bday')?.value;
    const address = document.getElementById('address')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    const civilStatus = document.getElementById('civil-status')?.value;
    let plan = document.querySelector('.card-title')?.innerText.trim() ?? '50K Plan'; 
    const condition = checkedConditions();
    

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

    const userData =  {
      fullName: `${lastName} ${firstName} ${middleName}`,
      birthDate: {
        year: dateObj.getFullYear(),
        month: dateObj.getMonth() + 1, // Months are 0-indexed
        day: dateObj.getDate()
      },
      address,
      email,
      gender,
      condition, 
      plan,
      civilStatus
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    console.log(localStorage.getItem('userData'));
}


