const { db, admin } = require("../util/admin");
const config = require("../util/config");
const firebase = require("firebase");
firebase.initializeApp(config);

const { validateSignupData, validateLoginData } = require("../util/validators");
exports.signup = (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    role: "user",
    username: req.body.username.trim(),
  };
  const { valid, errors } = validateSignupData(newUser);
  if (!valid) return res.status(400).json(errors);
  const noImg = "no-img.png";
  let token, userId;
  db.doc(`/Users/${newUser.username}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ username: "This username is already taken." });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredential = {
        username: newUser.username,
        email: newUser.email,
        createdAt: new Date(),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
        userId,
        role: newUser.role,
      };
      return db.doc(`/Users/${newUser.username}`).set(userCredential);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email is already in use." });
      } else {
        return res.status(500).json({ error: err.code });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const { valid, errors } = validateLoginData(user);
  if (!valid) return res.status(400).json(errors);

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
      return data.user.getIdToken();
    })
    .then((token) => {
      return res.json({ token });
    })
    .catch((err) => {
      console.error(err);
      if (
        err.code === "auth/wrong-password" ||
        err.code === "auth/user-not-found"
      ) {
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again." });
      } else return res.status(500).json({ error: err.code });
    });
};

exports.getUsers = (req, res) => {
  db.collection("Users")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      // console.log(req.user.username);
      // if (req.user.username === "admin") {
      let user = [];
      data.forEach((doc) => {
        user.push(doc.data());
      });
      return res.json(user);
      // } else return res.status(403).json({ error: "Unauthorized" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.code,
      });
    });
};

exports.getOneUser = (req, res) => {
  let userData = {};
  console.log(req.params.username);
  db.doc(`/Users/${req.params.username}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      userData = doc.data();
      userData.userId = doc.id;
      return res.json({ id: doc.id, ...userData });
    })

    .catch((err) => {
      console.error(err);
      res.status(500).json({ errоr: err.code });
    });
};
exports.uploadImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");
  const busboy = new BusBoy({ headers: req.headers });
  let imageFileName;
  let imageToBeUploaded;
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res.status(400).json({ error: "Wrong file type submitted" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];
    imageFileName = `${Math.round(
      Math.random() * 10000000000
    )}.${imageExtension}`;
    const filePath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filePath, mimetype };
    file.pipe(fs.createWriteStream(filePath));
  });

  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filePath, {
        resumable: false,
        metadata: {
          contentType: imageToBeUploaded.mimetype,
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
        return db.doc(`/Users/${req.user.username}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
  busboy.end(req.rawBody);
};

exports.deleteUser = (req, res) => {
  const user = req.params.userId;
  const document = db.doc(`/Users/${user}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "User not found" });
      }
      if (doc.data().username !== req.user.username) {
        if (req.user.username === "admin") {
          return document.delete();
        } else return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "User deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });

  document.get().then((doc) => {
    admin
      .auth()
      .getUserByEmail(doc.data().email)
      .then((userRecord) => {
        const uid = userRecord.uid;
        if (doc.data().username !== req.user.username) {
          if (req.user.username === "admin") {
            return admin.auth().deleteUser(uid);
          } else return res.status(403).json({ error: "Unauthorized" });
        } else {
          return admin.auth().deleteUser(uid);
        }
      })
      .then(() => {
        return res.status(200).json({ message: "Successfully deleted user" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
};
