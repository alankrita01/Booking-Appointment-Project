
function userDetails(event){
  
  event.preventDefault();

  const name = event.target.userName.value;
  const phone = event.target.phone.value;
  const email = event.target.email.value;

  const obj ={
    name : name,
    phone: phone,
    email : email
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
  //const users = await axios.get('http://localhost:3000/user');
  //console.log(user);

  document.getElementById('email').value = '';
  document.getElementById('userName').value = '';
  document.getElementById('phone').value = '';

  if(localStorage.getItem(user.email) != null){
    removeUserFromScreen(user.email);
  }
  const parentNode=document.getElementById('listOfUser');
  const childHTML=`<li id=${user._id}> ${user.name} - ${user.phone} - ${user.email} 
                    <button style="border-color: green;" onclick=editUserDetails('${user.email}','${user.name}','${user._id}')>Edit</button> 
                    <button style="border-color: red;" onclick=deleteUser('${user._id}')>Delete</button> 
                  </li> `;

  parentNode.innerHTML=parentNode.innerHTML+childHTML;
}

//edit user

function editUserDetails(emailId,name,phone,userId){
  console.log(emailId,name,userId)
    document.getElementById('email').value = emailId;
    document.getElementById('userName').value = name;
    document.getElementById('phone').value = phone;
  
    deleteUser(userId);
  }
  
  //delete user function
  
  function deleteUser(userId){
    
    //localStorage.removeItem(emailId);
    axios.delete(`https://localhost:4000/user/delete-user/${userId}`)
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