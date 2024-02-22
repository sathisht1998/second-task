function displayDatas() {
    const inputname = document.getElementById("name").value;
    const usersXhr = new XMLHttpRequest();

    usersXhr.open("GET", "./users.json", true);
    usersXhr.onreadystatechange = function () {
        if (usersXhr.readyState === 4 && usersXhr.status === 200) {
            const usersData = JSON.parse(usersXhr.responseText);
            const userData = usersData.find(user => user.name === inputname );
            if (!userData) {
                console.error("User not found.");
                alert("User not found. Please try again.");
                return;
            }

            const productsXhr = new XMLHttpRequest();
            productsXhr.open("GET", "./user_Address.json", true);
            productsXhr.onreadystatechange = function () {
                if (productsXhr.readyState === 4 && productsXhr.status === 200) {
                    const combinedXhr = new XMLHttpRequest();
                    combinedXhr.open("GET", "./user_Address_details.json", true);
                    combinedXhr.onreadystatechange = function () {

                        if (combinedXhr.readyState === 4 && combinedXhr.status === 200) {
                            const combinedData = JSON.parse(combinedXhr.responseText);
                            const selectAddressData = combinedData.find(data => data.id == inputId);
                            const productsData = JSON.parse(productsXhr.responseText);
                            const productData = productsData.find(address => address.Aid === selectAddressData.AID);
                            if (!productData) {
                                console.error("Product not found.");
                                alert("Product not found. Please try again.");
                                return;
                            }else {
                                renderData(userData,productData);
                            }
                        }
                    };
                    combinedXhr.send();

                }
            };
            productsXhr.send();
        }
    };
    usersXhr.send();
}

function renderData(userData, addressData) {
    const dataTable = document.getElementById("dataTable");
    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";

    const row = document.createElement("tr");
    row.innerHTML = `
<td>${userData.id}</td>
<td>${userData.name}</td>
<td>${userData.number}</td>
<td>${addressData.address}</td>
`;
    dataBody.appendChild(row);
    dataTable.style.display = "block";
}


module.exports = displayDatas();