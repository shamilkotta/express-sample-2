const bcrypt = require("bcrypt");

module.exports = (email, password) =>
  new Promise((resolve, reject) => {
    if (
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      if (email !== process.env.EMAIL)
        resolve({ status: false, err: "Invalid user" });
      else {
        bcrypt
          .compare(password, process.env.PASSWORD)
          .then((res) => {
            if (res) resolve({ status: true });
            else resolve({ status: false, err: "Invalid password" });
          })
          .catch((err) => {
            reject(err);
          });
      }
    } else resolve({ status: false, err: "Invalid email" });
  });
