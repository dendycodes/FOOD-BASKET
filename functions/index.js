const functions = require("firebase-functions");
const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("../swagger.json");
const {
  getComments,
  postOneComment,
  deleteComment,
  editComment,
} = require("./handlers/comments");
const {
  getAllOrders,
  postOrder,
  getOrder,
  commentOnOrder,
  deleteOrder,
  editOrder,
} = require("./handlers/orders");
const {
  signup,
  login,
  uploadImage,
  deleteUser,
  getUsers,
} = require("./handlers/users");
const FBAuth = require("./util/fbAuth");
const { db } = require("./util/admin");
app.use(express.json());

app.get("/getOrders", getAllOrders);
app.get("/orders/:orderId", getOrder);
app.get("/getComments", getComments);
app.get("/users", FBAuth, getUsers);

app.post("/signup", signup);
app.post("/login", login);
app.post("/orders/:orderId/comment", FBAuth, commentOnOrder);
app.post("/comments", FBAuth, postOneComment);
app.post("/orders", FBAuth, postOrder);
app.post("/user/image", FBAuth, uploadImage);

app.put("/order/:orderId", FBAuth, editOrder);
app.put("/comment/:commentId", FBAuth, editComment);

app.delete("/order/:orderId", FBAuth, deleteOrder);
app.delete("/comment/:commentId", FBAuth, deleteComment);
app.delete("/user/:userId", FBAuth, deleteUser);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
exports.api = functions.region("europe-west1").https.onRequest(app);

exports.onUserImageChange = functions
  .region("europe-west1")
  .firestore.document("/Users/{userId}")
  .onUpdate((change) => {
    console.log(change.before.data());
    console.log(change.after.data());

    if (change.before.data().imageUrl !== change.after.data().imageUrl) {
      const batch = db.batch();
      return db
        .collection("orders")
        .where("username", "==", change.before.data().username)
        .get()
        .then((data) => {
          data.forEach((doc) => {
            const order = db.doc(`/orders/${doc.id}`);
            batch.update(order, { userImage: change.after.data().imageUrl });
          });
          return batch.commit();
        });
    } else return true;
  });

exports.onOrderDelete = functions
  .region("europe-west1")
  .firestore.document("/orders/{orderId}")
  .onDelete((snapshot, context) => {
    const orderId = context.params.orderId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("orderId", "==", orderId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => {
        console.error(err);
      });
  });

exports.onUserDelete = functions
  .region("europe-west1")
  .firestore.document("/Users/{userId}")
  .onDelete((snapshot, context) => {
    const userId = context.params.userId;
    const batch = db.batch();
    return db
      .collection("comments")
      .where("username", "==", userId)
      .get()
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/comments/${doc.id}`));
        });
        return db.collection("orders").where("username", "==", userId).get();
      })
      .then((data) => {
        data.forEach((doc) => {
          batch.delete(db.doc(`/orders/${doc.id}`));
        });
        return batch.commit();
      })
      .catch((err) => console.error(err));
  });
