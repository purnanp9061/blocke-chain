//     console.log('Connected to student database');
//   })
//   .catch(error => {
//     console.error('Error connecting to studentDB:', error);
//   });

// Schema for users of app
const UserSchema1 = new mongoose.Schema({

    serialNo:{
  
      type:String,
      required:true,
    },
    pcNo:{
  
      type:String,
      required:true,
    },
    hallTicketNo:{
  
      type:String,
      required:true
    },
    adharNo:{
  
      type:String,
      required:true,
    },
    name: {
      type: String,
      required: true,
    },
    fatherName:{
  
      type:String,
      required:true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    course:{
  
      type:String,
      required:true,
    },
    institutionName:{
  
      type:String,
      required:true,
    },
    passedOutYear: {
      type: Date,
      required: true,
    }
  });
  const User1 = mongoose.model('student', UserSchema1);
  User1.createIndexes();
    
  app.post('/student',async (req,res)=>{
    const {  serialNo,  pcNo,hallTicketNo, adharNo,  name,  fatherName,  email,  course,  institutionName,  passedOutYear   }= req.body
    const user1 = new User1(req.body);
    // const user1=new User(hash)
    let result = await user1.save();
  console.log(name);
  });