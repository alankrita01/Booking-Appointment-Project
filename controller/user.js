
const User = require('../models/userModel');


const postAddUser =  async (req,res,next) => {
  console.log(req.body);

  try{
    console.log(req.body);
     

    const userName = req.body.userName;
    const email = req.body.email;
    const mobileNumber = req.body.mobileNumber;
    
    
  
    const data = await User.create({
      userName : userName,
      email : email,
      mobileNumber : mobileNumber
      
    })

    res.status(201).json({newUserDetails: data});
  }
  catch(err){
    res.status(500).json({
      error: "error occur in Add-user"
    })
   }  
}


//get Users
const getUsers = async (req,res,next) => {
  try{
    const users = await User.findAll();
    res.status(200).json({allUsers : users})
  }
  catch(err){
    console.log('Get User is failing', JSON.stringify(err));
    res.status(500).json({
      error:err
    })
  }
}

//delete User
const postDeleteUser = async(req,res,next) => {
  //console.log(req.body);
 
  try{
    if(req.params.id == 'undefined'){
      console.log('For Delete, user id is missing');
      return res.status(400).json({err : 'ID is missing'})
    }

    const uId = req.params.id;
    console.log(uId);
    await User.destroy({where: {id: uId}});
    res.sendStatus(200);
  }
  catch(err){
    console.log('Delete User is Failing', JSON.stringify(err));
    res.status(500).json({
      err:err
    })
  }
}


module.exports = {
  postAddUser,
  getUsers,
  postDeleteUser
}