
function userDetails(event){
  
  event.preventDefault();

  const userName = event.target.userName.value;
  //const mobileNumber = event.target.mobileNumber.value;
  const email = event.target.email.value;
  const mobileNumber = event.target.mobileNumber.value;

  const obj ={
    userName : userName,
    //mobileNumber: mobileNumber,
    email : email,
    mobileNumber : mobileNumber
  };

  
  //network call
  axios.post("http://localhost:4000/user/add-user",obj)
   .then((response) => {
      //console.log(response);
      showNewUserOnScreen(response.data.newUserDetails)
  })
  .catch((err) => {
    document.body.innerHTML = document.body.innerHTML + `<h4> Something Went Wrong</h4>`;
    console.log(err)
  })

  //localStorage.setItem("userDetails"+email,JSON.stringify(obj));
  //showNewUserOnScreen(obj);
}



window.addEventListener("DOMContentLoaded", (event) => {
  event.preventDefault();
  axios.get("http://localhost:4000/user/get-users")
    .then((response) => {
      //console.log(response);

      for(var i=0; i<response.data.allUsers.length; i++){
        showNewUserOnScreen(response.data.allUsers[i]);
      }
    })
    .catch(error => console.log(error));
})


//Adding user details to dom
function showNewUserOnScreen(user){
  

  document.getElementById('userName').value = '';
  //document.getElementById('mobileNumber').value = '';
  document.getElementById('email').value = '';
  document.getElementById('mobileNumber').value = '';

  if(localStorage.getItem(user.email) != null){
    removeUserFromScreen(user.email);
  }
  const parentNode=document.getElementById('listOfUser');
  const childHTML=`<li id=${user._id}> ${user.userName} - ${user.email} - ${user.mobileNumber}
                    <button style="border-color: green;" onclick=editUserDetails('${user.email}','${user.userName}',${user.mobileNumber},'${user._id}')>Edit</button> 
                    <button style="border-color: red;" onclick="deleteUser('${user.email}');">Pranav</button> 
                  </li> <button type="button" onclick="window.open('https://www.google.com/')">google<button>`;

  parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

//edit user

function editUserDetails(emailId,userName,mobileNumber,userId){
  console.log(emailId,userName,userId)
    
    document.getElementById('userName').value = userName;
    //document.getElementById('mobileNumber').value = mobileNumber;
    document.getElementById('email').value = emailId;
    document.getElementById('mobileNumber').value = mobileNumber;
  
    deleteUser(userId);
  }
  
  //delete user function

  function deleteUser2(userId){
    console.log(userId);
  }
  
  function deleteUser(userId){
    
    //localStorage.removeItem(emailId);
    /*fetch('https://localhost:4000/user/delete-user/'+ userId, {
        method: 'DELETE'
    })*/
    axios.delete(`https://localhost:4000/user/delete-user`)
    .then((response) => {
      //console.log(response);
      removeUserFromScreen(userId)
    })
    .catch((err) => {
      console.log(err)
    });
  }
  
  
  //remove function
  function removeUserFromScreen(userId){
    const parentNode = document.getElementById('listOfUser');
    const childNodeToBeDeleted = document.getElementById(userId);
  
    if(childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
  }