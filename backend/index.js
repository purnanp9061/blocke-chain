/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */


'use strict';

const { Gateway, Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const express = require('express');
const { v4: uuidv4 } = require('uuid');

const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const port = 5001;
// const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../test-application/javascript/CAUtil.js');
// const { buildCCPOrg1, buildWallet } = require('../../test-application/javascript/AppUtil.js');

const { buildCAClient, registerAndEnrollUser, enrollAdmin } = require('../../../bc/fabric-samples/test-application/javascript/CAUtil.js');
const { buildCCPOrg1, buildWallet } = require('../../../bc/fabric-samples/test-application/javascript/AppUtil.js');

const channelName = process.env.CHANNEL_NAME || 'mychannel';
const chaincodeName = process.env.CHAINCODE_NAME || 'basic';

const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'javascriptAppUser';


function prettyJSONString(inputString) {
  return JSON.stringify(JSON.parse(inputString), null, 2);
}

app.post('/verify', (req, res) => {
  const l = req.body
  console.log(l);
})
const mongoose = require('mongoose');
const argon2 = require("argon2");
mongoose.connect('mongodb://127.0.0.1:27017/mydb')
  .then(() => {
    console.log('Connected to yourDB-name database');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

// Schema for users of app
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,

  },
  type: {
    type: String,
    required: true,
  }
});
const User = mongoose.model('mempage', UserSchema);
User.createIndexes();
// For backend and express


const cors = require("cors");
const { unstable_useBlocker } = require('react-router-dom');
console.log("App listen at port 5001");
app.use(express.json());
app.use(cors());


const qrcode = require('qrcode');
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const { jsPDF } = require("jspdf");
// const fs = require('fs');

app.get("/", async (req, resp) => {
  // userresult = await User.find();
  // console.log(userresult);
  resp.send("App is Working");
});

app.post("/api/signup", async (req, resp) => {
  const password = req.body.password;
  const name = req.body.name;
  const email = req.body.email;
  const type = req.body.email;
  const confirmpassword = req.body.confirmpassword

  const users = await User.findOne({ 'email': req.body.email });
  if (email && password && name && type && confirmpassword) {
    try {
      if (!users) {
        if (confirmpassword == password) {
          let hash = await argon2.hash(req.body.password);
          req.body.password = hash
          const user = new User(req.body);
          // const user1=new User(hash)
          let result = await user.save();
          // let res=await user1.save();
          result = result.toObject();
          return resp.json({ message: "You have successfully signup" })
        } else {
          return resp.json({ message: "Password doesn't match" })

        }

      } else {
        return resp.json({ message: "This mailid already exist" })
      }

    } catch (e) {
      return resp.json({ message: "Something Went Wrong" });
    }
  } else {
    return resp.send({ message: 'Fill the rquired fields' })
  }
});
// app.post("/api/signin", async (req, resp) => {
//   try {
//     const { loginmail, loginpassword, logintype } = req.body;
//     // const { email } = req.body;
//     console.log(loginmail)
//     // let user;
//     if (loginmail && loginpassword && logintype) {
//       const user = await User.findOne({ 'email': req.body.loginmail });
//       console.log(user)
//       if (user) {
//         // This will find a user with the specified email
//         if (await argon2.verify(user.password, loginpassword)) {
//           // password match
//           if (user.type == req.body.logintype) {
//             // return resp.redirect(`/${logintype}`)
//             console.log("matched");
//             return resp.json({ message: "Log In successful" })
//             // alert('Successfully login'
//           }
//           else {
//             return resp.json({ message: req.body.loginmail + " doesn't exist " + req.body.logintype + ' type' })
//           }
//         }
//         else {
//           console.log('notmatched')
//           return resp.status(400).json({ error: "Bad Request", message: "Password incorrect" });
//           // resp.json({message:"Password incorrect"})
//         }
//       }
//       else {
//         return resp.status(400).json({ error: "Bad Request", message: "This Email doesn't exist" });
//         // resp.send({message:"This mailid doesn't exist"})
//       }
//     }
//     else if (loginpassword && logintype && !loginmail) {
//       return resp.status(400).json({ message: 'Enter the Email' })
//     } else if (!loginpassword && logintype && loginmail) {
//       return resp.status(400).json({ message: 'Enter the Password' })
//     } else if (loginpassword && !logintype && loginmail) {
//       return resp.status(400).json({ message: 'Enter the Type of user' })
//     } else if (!loginpassword && logintype && !loginmail) {
//       return resp.status(400).json({ message: 'Enter the email and Password' })
//     } else if (loginpassword && !logintype && !loginmail) {
//       return resp.status(400).json({ message: 'Enter the Email and Type of user' })
//     } else if (!loginpassword && !logintype && loginmail) {
//       return resp.status(400).json({ message: 'Enter the Password and Type of user' })
//     }
//     else {

//       return resp.status(400).json({ error: "Bad Request", message: "Email,Password,Type of user parameters are missing." });

//     }
//     console.log(await argon2.verify(userresult[0].password));
//   } catch (error) {
//     resp.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// });

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// const secretKey = 'your-secret-key';

// app.post('/api/forgotpassword', async (req, res) => {
//   try {
//     const { email } = req.body;
//     const secretKey = 'your-secret-key';


//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const expiresIn = '1h';
//     // Generate a JWT token for password reset
//     const resetToken = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });

//     // Save the reset token and its expiry in the user document
//     user.resetToken = resetToken;
//     user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
//     await user.save();

//     // Send a password reset email with the reset link
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'ongurisuvarna67@gmail.com',
//         pass: 'eavt pfzm ypcf rixd',
//       },
//     });

//     const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;
//     const mailOptions = {
//       from: 'ongurisuvarna67@gmail.com',
//       to: user.email,
//       subject: 'Password Reset',
//       text: `Click the following link to reset your password: ${resetLink}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         return res.status(500).json({ message: 'Failed to send reset email' });
//       }
//       res.json({ message: 'Reset email sent successfully' });
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });


app.post("/api/signin", async (req, resp) => {
  try {
    const { loginmail, loginpassword, logintype, forgotPassword } = req.body;

    if (forgotPassword) {

      const forgotPasswordResponse = await handleForgotPassword(req.body);
      return resp.json(forgotPasswordResponse);
    }


    // The rest of your existing signin logic
    if (loginmail && loginpassword && logintype) {
      const user = await User.findOne({ 'email': req.body.loginmail });
      console.log(user)
      if (user) {
        // This will find a user with the specified email
        if (await argon2.verify(user.password, loginpassword)) {
          // password match
          if (user.type == req.body.logintype) {
            // return resp.redirect(`/${logintype}`)
            console.log("matched");
            return resp.json({ message: "Log In successful" })
            // alert('Successfully login'
          }
          else {
            return resp.json({ message: req.body.loginmail + " doesn't exist " + req.body.logintype + ' type' })
          }
        }
        else {
          console.log('notmatched')
          return resp.status(400).json({ error: "Bad Request", message: "Password incorrect" });
          // resp.json({message:"Password incorrect"})
        }
      }
      else {
        return resp.status(400).json({ error: "Bad Request", message: "This Email doesn't exist" });
        // resp.send({message:"This mailid doesn't exist"})
      }
    }

    else if (loginpassword && logintype && !loginmail) {
      return resp.status(400).json({ message: 'Enter the Email' })
    } else if (!loginpassword && logintype && loginmail) {
      return resp.status(400).json({ message: 'Enter the Password' })
    } else if (loginpassword && !logintype && loginmail) {
      return resp.status(400).json({ message: 'Enter the Type of user' })
    } else if (!loginpassword && logintype && !loginmail) {
      return resp.status(400).json({ message: 'Enter the email and Password' })
    } else if (loginpassword && !logintype && !loginmail) {
      return resp.status(400).json({ message: 'Enter the Email and Type of user' })
    } else if (!loginpassword && !logintype && loginmail) {
      return resp.status(400).json({ message: 'Enter the Password and Type of user' })
    }

    else {

      return resp.status(400).json({ error: "Bad Request", message: "Email,Password,Type of user parameters are missing." });

    }
  } catch (error) {
    resp.status(500).json({ error: "Internal Server Error", message: error.message });
  }
});

// Extracted function for handling forgot password logic
async function handleForgotPassword({ email }) {
  try {
    // const { email } = req.body;
    //     const secretKey = 'your-secret-key';
    const secretKey = 'your-secret-key';
    const user = await User.findOne({ email });

    if (!user) {
      return { message: 'User not found' };
    }

    const expiresIn = '1h';
    const resetToken = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com',
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
        user: 'ongurisuvarna67@gmail.com', // username
        pass: 'eavt pfzm ypcf rixd', // password
      },
    });

    const resetLink = `http://localhost:3000/resetpassword/${resetToken}`;
    const mailOptions = {
      from: 'ongurisuvarna67@gmail.com',
      to: user.email,
      subject: 'Password Reset',
      text: `Click the following link to reset your password: ${resetLink}`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully');
  return { message: 'Reset email sent successfully' };
} catch (error) {
  console.error('Error sending email:', error);
  return { message: 'Failed to send email', error: error.message };
}
}
const UserModel = mongoose.model('User', UserSchema);
const { ObjectId } = mongoose.Types; 


// app.post('/api/resetpassword/:token', async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     // Find user by reset token and ensure token is not expired
//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() }
//     });

//     if (!user) {
//       console.log('Invalid or expired token:', token);
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     // Update the password and remove the reset token
//     user.password = password;
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;

//     await user.save();

//     res.json({ message: 'Password reset successful' });
//   } catch (error) {
//     console.log('Invalid or expired token:', token);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });




// Nodemailer configuration
// const transporter = nodemailer.createTransport({
//   host: 'smtp.googlemail.com',
//   port: 465, // Port
//   secure: true, // this is true as port is 465
//   auth: {
//     user: 'ongurisuvarna67@gmail.com', // username
//     pass: 'eavt pfzm ypcf rixd', // password
//   },
// });

// Endpoint for initiating the forgot password process from the sign-in page
// app.post('/signin', async (req, res) => {
//   try {
//     const { loginmail, loginpassword, logintype, forgotPassword } = req.body;

//     // Check if the 'forgotPassword' flag is set
//     if (forgotPassword) {
//       // Handle forgot password logic here
//       const user = await User.findOne({ 'email': req.body.loginmail });

//       if (!user) {
//         return res.status(404).json({ error: "Not Found", message: "User not found" });
//       }

//       // Generate a reset token
//       const resetToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '1h' });

//       // Send the reset link to the user's email
//      // const resetLink = `http://your-reset-frontend-url/reset-password/${resetToken}`;

//       // Example email content
//       const mailOptions = {
//         from: 'ongurisuvarna67@gmail.com',
//         to: email,
//         subject: 'Password Reset',
//         html: `Click <a href="${resetLink}">here</a> to reset your password.`,
//       };

//       await transporter.sendMail(mailOptions);

//       return res.json({ message: "Password reset link sent to your email" });
//     }

//     // Continue with the regular sign-in logic
//     // ... (your existing sign-in logic)

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// });

// Endpoint for resetting the password
// app.post("/api/reset-password", async (req, res) => {
//   try {
//     const { resetToken, newPassword } = req.body;

//     // Verify the reset token
//     jwt.verify(resetToken, jwtSecret, async (err, decoded) => {
//       if (err) {
//         return res.status(400).json({ error: "Bad Request", message: "Invalid or expired token" });
//       }

//       // Find the user by decoded userId
//       const user = await User.findById(decoded.userId);

//       if (!user) {
//         return res.status(404).json({ error: "Not Found", message: "User not found" });
//       }

//       // Hash the new password
//       const hashedPassword = await argon2.hash(newPassword);

//       // Update the user's password
//       user.password = hashedPassword;
//       await user.save();

//       return res.json({ message: "Password reset successful" });
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error", message: error.message });
//   }
// });

app.post('/reset-password/:id/:token', (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, "your-secret-key", (err, decoded) => {
    if (err) {
      // Handle token verification error
      console.error('Error with token verification:', err);

      if (err.name === 'JsonWebTokenError' && err.message === 'invalid token') {
        return res.status(400).json({ Status: "Invalid token" });
      } else if (err.name === 'TokenExpiredError') {
        return res.status(400).json({ Status: "Token expired" });
      } else {
        return res.status(500).json({ Status: "Internal Server Error" });
      }
    } else {
      // Hash the new password
      bcrypt.hash(password, 10)
        .then(hash => {
          // Update user's password in the database
          UserModel.findByIdAndUpdate({ _id: new ObjectId(id) }, { password: hash })
            .then(() => res.json({ Status: "Success" }))
            .catch(err => {
              console.error('Error updating password in the database:', err);
              res.json({ Status: "Error updating password" });
            });
        })
        .catch(err => {
          console.error('Error hashing new password:', err);
          res.json({ Status: "Error hashing new password" });
        });
    }
  });
});






const crypto = require('node:crypto');
const QRCode = require('qrcode');

// Certificate send to mail
app.post('/createCertificate', async (req, res) => {
  const { serialNo, pcNo, hallTicketNo, adharNo, name, fatherName, email, course, institutionName, passedOutYear } = req.body;
  // console.log(serialNo);
  const randonStr = crypto.randomBytes(24).toString('hex');
  const id = crypto.createHmac('sha256', randonStr).digest('hex');
  // console.log(id)


  let det = JSON.stringify({ id, serialNo, pcNo, hallTicketNo, adharNo, name, fatherName, email, course, institutionName, passedOutYear })
  console.log(det);
  try {
    // wallet create

    // Your existing code to interact with the Fabric network
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);
    await enrollAdmin(caClient, wallet, mspOrg1);

    const identity = await wallet.get(org1UserId);

    if (!identity) {
      await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);
    // console.log(network)

    const result = await contract.submitTransaction('CreateCert', id, serialNo, pcNo, hallTicketNo, adharNo, name, fatherName, email, course, institutionName, passedOutYear);
    console.log(result)

    if (result) {
      qrcode.toDataURL(det, (err, url) => {
        if (err) throw err;
        console.log(det);
        // Step 2: Create the PDF in memory
        const doc = new PDFDocument();
        const fs = require('fs');

        // const buffers = [];
        // doc.on('data', function (chunk) {
        //   buffers.push(chunk);
        // });

        // doc.on('end', function () {
        //   const pdfBuffer = Buffer.concat(buffers);

        doc.image('jntu.png', 10, 15, { fit: [750, 750] });
        doc.text(req.body.serialNo, 90, 108);
        doc.text(req.body.pcNo, 90, 125);
        doc.text(req.body.hallTicketNo, 126, 210);
        doc.font('Times-Bold');
        doc.text(req.body.institutionName, 126, 230);
        doc.text(req.body.adharNo, 126, 248);
        doc.text(req.body.name, 195, 280);
        doc.text(req.body.fatherName, 220, 310);
        doc.text(req.body.course, 220, 340);
        doc.text(req.body.passedOutYear, 290, 371,);
        doc.text('**** FIRST CLASS WITH DISTINCTION ****', 230, 404,);

        const xPositions = [140, 185]

        // Creating the data
        let data = {

          name: req.body.name,
          serialNo: req.body.serialNo,
          pcNo: req.body.pcNo,
          hallTicketNo: req.body.hallTicketNo,
          adharNo: req.body.adharNo,
          fatherName: req.body.fatherName,
          email: req.body.email,
          course: req.body.course,
          passedOutYear: req.body.passedOutYear,
          institutionName: req.body.institutionName,
          id: id,

        };
        let stringdata = JSON.stringify(data);

        const qrCodeOptions = {
          color: {
            dark: "#515050", // Green color for the dark elements
            light: "#ffffff" // White color for the light elements
          }
        };

        QRCode.toDataURL(stringdata, qrCodeOptions, function (err, code) {
          if (err) return console.log("Error occurred");

          // Printing the code
          doc.rect(150, 150, 180, 800);
          doc.image(code, 385, 620, { width: 50, height: 50 });

          doc.text(req.body.passedOutYear, 71, 679,);
          doc.pipe(fs.createWriteStream('jntu.pdf'));

          doc.end();


          // Step 3: Set up an email service
          const transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com',
            port: 465, // Port
            secure: true, // this is true as port is 465
            auth: {
              user: 'ongurisuvarna67@gmail.com', // username
              pass: 'eavt pfzm ypcf rixd', // password
            },
          });

          // Step 4: Send the email with the PDF attachment
          const mailOptions = {
            from: 'ongurisuvarna67@gmail.com',
            to: email,
            subject: 'QR Code PDF',
            text: 'Attached is the QR Code PDF',
            attachments: [
              {
                filename: req.body.name + '.pdf',
                path: 'jntu.pdf',
                encoding: 'base64',
                // content: pdfBuffer
              }
            ]
          };

          transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: error.message })
            } else {
              console.log('Email sent: ' + info.response);
              return res.status(200).json({ message: 'Certificate created' })
            }
          });


        });
      })
    }

    else {
      return res.send({ message: 'Fill the required details' })
    }
  }


  catch (error) {
    console.error('Error:', error.message);
    return res.status(500).send(error.message);
  }
});







const fileUpload = require('express-fileupload');

app.use(fileUpload());



app.post('/fileread', async (req, res) => {
  const r = req.body
  console.log(r);

  try {
    const certId = req.body.id; // Extract ID from request parameters
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);

    await enrollAdmin(caClient, wallet, mspOrg1);
    // await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true }
    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    const result = await contract.evaluateTransaction('ReadCert', certId);
    const resul = JSON.parse(result)
    const i = resul.ID
    const s = resul.SerialNo
    const p = resul.PcNo
    const h = resul.HallTicketNo
    const a = resul.AdharNo
    const n = resul.Name
    const f = resul.FatherName
    const e = resul.Email
    const c = resul.Course
    const cc = resul.InstitutionName
    const pp = resul.PassedOutYear
    console.log(req.body.id)
    console.log(e)
    console.log(resul)

    if (`${result}` == '') {
      console.log(result)
      return res.json({ message: "this certtificate doesn't exist" });
    } else if (
      req.body.id == i
      // && req.body.serialNo == s
      // && req.body.pcNo == p
      // && req.body.hallTicketNo == h
      // && req.body.adharNo == a
      // && req.body.name == n
      // && req.body.fatherName == f
      // && req.body.email == e
      // && req.body.course == c
      // && req.body.institutionName == cc
      // && req.body.passedOutYear == pp
    ) {
      console.log(JSON.parse(result))
      console.log(i)
      console.log(s)
      console.log(e)

      return res.status(200).json({ message: 'Verified' });
    }

  } catch (error) {
    console.error('Failed to get assets:', error.message);
    return res.status(500).send({ message: error.message });
  }
});


app.post('/qrscan', async (req, res) => {
  const o = req.body
  console.log(o);

  const data = JSON.parse(req.body.text);
  console.log(data)
  try {
    const certId = data.id; // Extract ID from request parameters
    console.log(certId)
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);
    await enrollAdmin(caClient, wallet, mspOrg1);

    const identity = await wallet.get(org1UserId);

    if (!identity) {
      await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
    }

    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });


    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);


    const result = await contract.evaluateTransaction('ReadCert', certId);
    const resul = JSON.parse(result)
    const i = resul.ID
    const s = resul.SerialNo
    const r = resul.PcNo
    const h = resul.HallTicketNo
    const a = resul.AdharNo
    const n = resul.Name
    const f = resul.FatherName
    const e = resul.Email
    const c = resul.Course
    const cc = resul.InstitutionName
    const p = resul.PassedOutYear
    console.log(resul)

    if (`${result}` == '') {
      return res.json({ message: 'No matching found' });
    } else if (
      data.id == i
      // req.body.id == i
      // && data.serialNo == s
      // && data.pcNo == r
      // && data.hallTicketNo == h
      // && data.adharNo== a
      // && data.name == n
      // && data.fatherName == f
      // && data.email == e
      // && data.course == c
      // && data.institutionName == cc
      // && data.passedOutYear == p
    ) {
      //  console.log(JSON.parse(result))
      console.log(data.serialNo)
      console.log(s)

      return res.status(200).json({ message: 'Verified' });
    }

  } catch (error) {
    console.error('Failed to get assets:', error.message);
    return res.status(500).send({ message: error.message });
  }
});


// Schema for users of app
const UserSchema1 = new mongoose.Schema({

  serialNo: {

    type: String,
    required: true,
  },
  pcNo: {

    type: String,
    required: true,
  },
  hallTicketNo: {

    type: String,
    required: true
  },
  adharNo: {

    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  fatherName: {

    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  course: {

    type: String,
    required: true,
  },
  institutionName: {

    type: String,
    required: true,
  },
  passedOutYear: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});
const User1 = mongoose.model('student', UserSchema1);
User1.createIndexes();

app.post('/student', async (req, res) => {
  const { serialNo, pcNo, hallTicketNo, adharNo, name, fatherName, email, course, institutionName, passedOutYear } = req.body
  let status
  const data = { serialNo, pcNo, hallTicketNo, adharNo, name, fatherName, email, course, institutionName, passedOutYear, status: 'Initiative' }

  const user1 = new User1(data);
  // const user1=new User(hash)
  let result = await user1.save();
  console.log(name);
  // console.log(cert);
  if (result) {
    return res.send({ message: 'you have succsessfully shared your details' })
  } else {
    return res.send({ error: error })
  }
});
// app.put('/student/:id/reject', async (req, res) => {
//   const userId = req.params.id;

//   try {
//     const updatedUser = await User1.findByIdAndUpdate(userId,
//       { $set: { status: 'Reject' } },
//       { new: true });

//     if (updatedUser) {
//       return res.status(200).send({ message: 'User status updated to Reject' });
//     } else {
//       return res.status(404).send({ error: 'User not found' });
//     }
//   } catch (error) {
//     return res.status(500).send({ error: error.message });
//   }
// });


app.put('/studentRejected', async (req, res) => {
  // const { userId } = req.params;
  const { _id, email, } = req.body;
  let status = "Reject"

  try {
    const updatedStudent = await User1.findByIdAndUpdate(_id, { status });

    if (!updatedStudent) {
      return res.status(404).send({ error: 'User not found' }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.googlemail.com',
      port: 465, // Port
      secure: true, // this is true as port is 465
      auth: {
        user: 'ongurisuvarna67@gmail.com', // username
        pass: 'eavt pfzm ypcf rixd', // password
      },
    });

    // Step 4: Send the email with the PDF attachment
    const mailOptions = {
      from: 'ongurisuvarna67@gmail.com',
      to: email,
      subject: 'Certificate rejected',
      text: 'We are unable to provide certificate',
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: error.message })
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: 'Message sent to the student' })
      }
    });
  } catch (error) {
    return res.status({ 'Error': error })
  }
});

app.put('/student/:id/approve', async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User1.findByIdAndUpdate(userId,
      { $set: { status: 'Approve' } },
      { new: true });
    if (updatedUser) {
      return res.status(200).send({ message: 'User status updated to Approve' });
    } else {
      return res.status(404).send({ error: 'User not found' });
    }
  } catch (error) {

  }
});



app.get('/getStudents', async (req, res) => {

  try {
    const students = await User1.find({});
    console.log(students)
    return res.json(students);
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




// app.post('/reject', async (req, res) => {
//   const { email } = req.body
//   try {
//     // const certhallTicket = req.body.hallTicketNo; // Extract ID from request parameters
//     // const ccp = buildCCPOrg1();
//     // const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
//     // const wallet = await buildWallet(Wallets, walletPath);

//     // await enrollAdmin(caClient, wallet, mspOrg1);
//     // // await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');

//     // const gateway = new Gateway();
//     // await gateway.connect(ccp, {
//     //   wallet,
//     //   identity: org1UserId,
//     //   discovery: { enabled: true, asLocalhost: true }
//     // });

//     // const network = await gateway.getNetwork(channelName);
//     // const contract = network.getContract(chaincodeName);

//     // const result = await contract.evaluateTransaction('ReadCert', certhallTicket);
//     // const resul = JSON.parse(result)
//     const transporter = nodemailer.createTransport({
//       host: 'smtp.googlemail.com',
//       port: 465, // Port
//       secure: true, // this is true as port is 465
//       auth: {
//         user: 'ongurisuvarna67@gmail.com', // username
//         pass: 'eavt pfzm ypcf rixd', // password
//       },
//     });

//     // Step 4: Send the email with the PDF attachment
//     const mailOptions = {
//       from: 'ongurisuvarna67@gmail.com',
//       to: email,
//       subject: 'Certificate rejected',
//       text: 'We are unable to provide certificate',
//     };
//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//         return res.status(500).json({ message: error.message })
//       } else {
//         console.log('Email sent: ' + info.response);
//         return res.status(200).json({ message: 'Message sent to the student' })
//       }
//     });
//   } catch (error) {
//     return res.status({ 'Error': error })
//   }
// });

// app.get('/approved', async (req, res) => {
//   try {
//     const approvedCertificates = await Certificate.find({ status: 'Approve' });
//     res.status(200).send(approvedCertificates);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });


app.get('/approve', async (req, res) => {
  try {
    // Your existing code to interact with the Fabric network
    const ccp = buildCCPOrg1();
    const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
    const wallet = await buildWallet(Wallets, walletPath);

    await enrollAdmin(caClient, wallet, mspOrg1);
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: org1UserId,
      discovery: { enabled: true, asLocalhost: true },
    });

    const network = await gateway.getNetwork(channelName);
    const contract = network.getContract(chaincodeName);

    // Call the chaincode function to retrieve approved certificates
    const result = await contract.evaluateTransaction('GetApprovedCertificates');

    // Assuming the result is a JSON string, parse it
    const approvedCertificates = JSON.parse(result);

    // Log the certificates to the console
    console.log(approvedCertificates);

    // Respond with the certificates
    return res.status(200).json(approvedCertificates);
  } catch (error) {
    console.error('Failed to get approved certificates:', error.message);
    return res.status(500).send({ error: error.message });
  }
});



app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});



