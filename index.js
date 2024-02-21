const fs= require('fs')
//const data2 = require('./sampleData1.json');
//const data1 = require('./sampleData2.json');
const combinedData = require('./usersproducts.json');
console.log(combinedData);





const finalData = combinedData.map(combinedUser => {
  // Find the user information from data1 based on the id
  const userData = data1.find(user => user.id === combinedUser.id);
  
  // Find the address information from data2 based on the Aid
  const addressData = data2.find(address => address.Aid === combinedUser.AID);
  
  // Combine the user information with the address information
  return {
    id: combinedUser.id,
    mobileNumber: userData.mobileNumber,
    age: userData.age,
    bio: userData.bio,
    Aid: addressData.Aid,
    address: addressData.address
  };
});

module.exports = finalData
console.log(finalData);