
function userDetails(event){
  
  event.preventDefault();

  const userName = event.target.userName.value;
  const email = event.target.email.value;
  const mobileNumber = event.target.mobileNumber.value;

  const obj ={
    userName : `${userName}`,
    email : `${email}`,
    mobileNumber : `${mobileNumber}`
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
  document.getElementById('email').value = '';
  document.getElementById('mobileNumber').value = '';

  if(localStorage.getItem(user.email) != null){
    removeUserFromScreen(user.email);
  }
  const parentNode=document.getElementById('listOfUser');
  const childHTML=`<li id=${user.id}> ${user.userName} - ${user.email} - ${user.mobileNumber}
                    <button style="margin: 5px; padding-left: 7px; padding-right: 7px; color:green; font-weight: bold;" onclick=editUserDetails('${user.email}','${user.userName}',${user.mobileNumber},'${user.id}')>Edit</button> 
                    <button style="margin: 7px; padding-left: 7px; padding-right: 5px;  color:red; font-weight: bold;" onclick="deleteUser('${user.id}');">Delete</button> 
                  </li>`;

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

  function deleteUser(userId){
    console.log(userId+`pranav`)
    axios.delete(`http://localhost:4000/user/delete-user/${userId}`)
    .then((response) => {
      console.log(response);
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
    //parentNode.removeChild(childNodeToBeDeleted);
    if(childNodeToBeDeleted) {
      parentNode.removeChild(childNodeToBeDeleted);
    }
    window.location.reload();
  }