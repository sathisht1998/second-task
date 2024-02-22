function displayData() {
    const inputname = document.getElementById("name").value;

   
    const usersXhr = new XMLHttpRequest();

    usersXhr.open("GET", "./users.json", true);
    usersXhr.onreadystatechange = function () {
        if (usersXhr.readyState === 4 && usersXhr.status === 200) {
            const usersData = JSON.parse(usersXhr.responseText);
            const userData = usersData.find(user => user.name === inputname );
         
                if(inputname.length < 6){
                    alert("Username must contain more than 6 charcters") 
                  }
               else if (!userData){
                console.error("Username not found.");
                alert("Username not found. Please try again.");
                return;
            }
            const addressXhr = new XMLHttpRequest();
            addressXhr.open("GET", "./users_Address.json", true);
            addressXhr.onreadystatechange = function () {
                if (addressXhr.readyState === 4 && addressXhr.status === 200) {
                    const combinedXhr = new XMLHttpRequest();
                    combinedXhr.open("GET", "./user_Address_details.json", true);
                    combinedXhr.onreadystatechange = function () {

                        if (combinedXhr.readyState === 4 && combinedXhr.status === 200) {
                            const combinedData = JSON.parse(combinedXhr.responseText);
                            const selectAddressData = combinedData.find(data => data.id === userData.id);
                            if(!selectAddressData){
                                console.error("user_address_details not found.");
                                alert("no existing data. Please try again.");
                                return;
                            }
                            const addressData = JSON.parse(addressXhr.responseText);
                            const addData = addressData.find(address => address.Aid === selectAddressData.Aid);
                            if (!addData) {
                                console.error("User Address didn't not found.");
                                alert("user address not found. Please Given correct username");
                                return;
                            }
                            
                            const empfileXhr = new XMLHttpRequest();
                            empfileXhr.open("GET", "./emp_Details.json", true);
                            empfileXhr.onreadystatechange = function() {
                              if (empfileXhr.readyState === 4 && empfileXhr.status === 200) {
                            const empfileData = JSON.parse(empfileXhr.responseText);
                            const selectemployeeData = empfileData.find(empdata => empdata.id == selectAddressData.id);
                            if (!selectemployeeData) {
                                console.error("employee details not found.");
                                alert("employee details not found. Please try again.");
                                return;
                            }

                            const empAddfileXhr = new XMLHttpRequest();
                            empAddfileXhr.open("GET", "./emp_address.json", true);
                            empAddfileXhr.onreadystatechange = function() {
                                if (empAddfileXhr.readyState === 4 && empAddfileXhr.status === 200) {
                                    const empAddfileData = JSON.parse(empAddfileXhr.responseText);
                                    const selectAddData = empAddfileData.find(empAdddata => empAdddata.eid ==selectemployeeData.eid);
                                    if(!selectAddData){
                                        console.error("employee address not found")
                                        alert("employee address not found. Please Try again")
                                    }
                                    // Now that all data is fetched, render everything:
                                    renderData(userData, addData, selectemployeeData, selectAddData); // Adjust this call as needed
                                }
                            };
                            empAddfileXhr.send();
                        }
                    };
                    empfileXhr.send();
                            
                            
                        }
                    };
                    combinedXhr.send();

                }
            };
            addressXhr.send();
        }
    };
    usersXhr.send();
}

function renderData(userData, addressData,empfileData,empAddfileData) {
    const dataTable = document.getElementById("dataTable");
    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
<td>${userData.id}</td>
<td>${userData.name}</td>
<td>${userData.mobileNumber}</td>
<td>${addressData.Address}</td>
<td>${addressData.Aid}</td>
<td>${empfileData.eid}</td>
<td>${empfileData.emp_Name}</td>
<td>${empAddfileData.emp_Address}</td>
`;
    dataBody.appendChild(row);
    dataTable.style.display = "block";
}



