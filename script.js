document.getElementById('userForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  const userId = document.getElementById('userId').value;

  // Fetch the user information based on the input ID
  const response = await fetch(`localhost:1222=${userId}`);
  const userData = await response.json();

  // Display the user information
  const userInfoDiv = document.getElementById('userInfo');
  if (userData.error) {
    userInfoDiv.textContent = `Error: ${userData.error}`;
  } else {
    userInfoDiv.innerHTML = `
      <p><strong>ID:</strong> ${userData.id}</p>
      <p><strong>Name:</strong> ${userData.name}</p>
      <p><strong>Mobile Number:</strong> ${userData.mobileNumber}</p>
      <p><strong>Age:</strong> ${userData.age}</p>
      <p><strong>Bio:</strong> ${userData.bio}</p>
      <p><strong>Address:</strong> ${userData.address}</p>
    `;
  }
});

console.log(userInfoDiv)