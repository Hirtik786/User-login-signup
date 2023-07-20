let Name = document.getElementById("name");
let fName = document.getElementById("fName");
let Email = document.getElementById("email");
let Password = document.getElementById("password");
let CNICNumber = document.getElementById("cnicNumber");
let MobileNumber = document.getElementById("mobileNumber");
let selectCourse = document.getElementById("selectCourse");
let selectGender = document.getElementById("selectGender");
let message = document.getElementById("message");
let message1 = document.getElementById("message1");
let message2 = document.getElementById("message2");
let emailSignin = document.getElementById("emailSignin");
let passwordSignin = document.getElementById("passwordSignin");
let messageVerification = document.getElementById("message-verification")
let nameProfile = document.getElementById("name-profile");

let userCheck = () => {
  firebase.auth().onAuthStateChanged((user) => {
    console.log(user);
    if (user.emailVerified == true) {
      window.location.assign("homepage.html");
    } else if (user.emailVerified == false) {
      window.location.assign("verification.html");
    } else {
      window.location.assign("index.html");
    }
  });
};
// window.onload = userCheck;

let createAccount = () => {
  if (Name.value == "") {
    message.style.display = "block";
    message.innerHTML = "Type Your Name...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (fName.value == "") {
    message.style.display = "block";
    message.innerHTML = "Type Your Father Name...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (Email.value == "") {
    message.style.display = "block";
    message.innerHTML = "Type Your Email...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (Password.value == "") {
    message.style.display = "block";
    message.innerHTML = "Type Your Password...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (Password.value.length < 6) {
    message.style.display = "block";
    message.innerHTML = "Password Must Contain Atleast 6 Characters/Digits...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (CNICNumber.value == "") {
    message.style.display = "block";
    message.innerHTML = "Type Your CNIC Number...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (CNICNumber.value.length !== 13) {
    message.style.display = "block";
    message.innerHTML = "Incorrect CNIC Number...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (MobileNumber.value == "") {
    message.style.display = "block";
    message.innerHTML = "Type Your Mobile Number...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (MobileNumber.value.length !== 11) {
    message.style.display = "block";
    message.innerHTML = "Incorrect Mobile Number...!";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (selectCourse.value == "Select Course") {
    message.style.display = "block";
    message.innerHTML = "Select Your Course";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else if (selectGender.value == "Select Gender") {
    message.style.display = "block";
    message.innerHTML = "Select Your Gender";
    setTimeout(() => {
      message.style.display = "none";
    }, 2000);
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(Email.value, Password.value)
      .then((userCredential) => {
        console.log("Account Created");
        var user = userCredential.user;
        console.log(user);
        message.style.color = "green";
        message.innerHTML = "Account Created Successfully";
        setTimeout(() => {
          message.style.display = "none";
        }, 1000);
        setTimeout(() => {
          if (user.emailVerified == true) {
            window.location.assign("homepage.html");
            console.log("Email verified", "Signed in");
          } else {
            window.location.assign("verification.html");
          }
        }, 2000);
      })
      .catch((error) => {
        console.log("error", error.message);
        message.style.display = "block";
        message.innerHTML = error.message;
        setTimeout(() => {
          message.style.display = "none";
        }, 1000);
      });
    firebase.firestore().collection("Users").add({
      Username: Name.value,
      FatherName: fName.value,
      EmailAddress: Email.value,
      CnicNumber: CNICNumber.value,
      PhoneNumber: MobileNumber.value,
      SelectGender: selectGender.value,
      SelectCourse: selectCourse.value,
    });

    Name.value = "";
    fName.value = "";
    Email.value = "";
    Password.value = "";
    CNICNumber.value = "";
    MobileNumber.value = "";
    selectCourse.value = "Select Course";
    selectGender.value = "Select Gender";
  }
};

let login = () => {
  if (emailSignin.value == "") {
    message1.style.display = "block";
    message1.innerHTML = "Type Your Email...!";
    setTimeout(() => {
      message1.style.display = "none";
    }, 2000);
  } else if (passwordSignin.value == "") {
    message1.style.display = "block";
    message1.innerHTML = "Type Your Password...!";
    setTimeout(() => {
      message1.style.display = "none";
    }, 2000);
  } else {
    firebase
      .auth()
      .signInWithEmailAndPassword(emailSignin.value, passwordSignin.value)
      .then((userCredential) => {
        console.log("Signed In");
        var user = userCredential.user;
        console.log(user);
        message1.style.display = "block";
        message1.style.color = "green";
        message1.innerHTML = "Account login Successfully";
        setTimeout(() => {
          message1.style.display = "none";
        }, 1000);
        setTimeout(() => {
          if (user.emailVerified == true) {
            window.location.assign("homepage.html");
            console.log("Email verified", "Signed in");
          } else {
            window.location.assign("verification.html");
          }
        }, 2000);
      })
      .catch((error) => {
        console.log("error", error.message);
        message1.style.display = "block";
        message1.innerHTML = error.message;
        setTimeout(() => {
          message1.style.display = "none";
        }, 2000);
      });
  }
};

let forgotPassword = () => {
  let resetPasswordEmail = document.getElementById("forgot-email");
  firebase
    .auth()
    .sendPasswordResetEmail(resetPasswordEmail.value)
    .then(() => {
      console.log("Email Sent Successfully");
      message2.style.display = "block";
      message2.style.color = "green";
      message2.innerHTML = "Email Sent Successfully";
      setTimeout(() => {
        message2.style.display = "none";
      }, 2000);
      resetPasswordEmail.value = "";
    })
    .catch((error) => {
      console.log("error", error.message);
      message2.style.display = "block";
      message2.innerHTML = error.message;
      setTimeout(() => {
        message2.style.display = "none";
      }, 2000);
    });
};

let sendVerificationEmail = () => {
  firebase
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      console.log("Email verification sent!");
      messageVerification.style.display = "block";
      messageVerification.style.color = "green";
      messageVerification.innerHTML = "Verification email sent successfully";
      setTimeout(() => {
        message2.style.display = "none";
      }, 1000);
    });
};
let logOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("Sign-out successful");
      window.location.assign("index.html");
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};
