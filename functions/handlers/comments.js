const { db } = require("../util/admin");

exports.getComments = (req, res) => {
  db.collection("comments")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let comment = [];
      data.forEach((doc) => {
        comment.push({ ...doc.data(), id: doc.id });
      });
      return res.json(comment);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        error: err.code,
      });
    });
};

exports.postOneComment = (req, res) => {
  if (req.body.comment.trim() === "") {
    return res.status(400).json({ Comment: "Comment must not be empty." });
  }

  const newComment = {
    comment: req.body.comment,
    createdAt: new Date(),
    username: req.user.username,
  };

  db.collection("comments")
    .add(newComment)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "something went wrong" });
      console.log(err);
    });
};

exports.deleteComment = (req, res) => {
  const document = db.doc(`/comments/${req.params.commentId}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }

    db.doc(`/orders/${doc.data().orderId}`)
      .get()
      .then((docOrder) => {
        if (!docOrder.exists) {
          return res.status(404).json({ error: "Order not found" });
        }
        let currentDate = new Date();
        let rTime = new Date(docOrder.data().requestedTime * 1000);

        if (req.user.username === "admin") {
          res.json({ message: "Comment deleted successfully" });
          return document.delete();
        }
        if (
          rTime.getHours() > currentDate.getHours() ||
          (rTime.getHours() === currentDate.getHours() &&
            rTime.getMinutes() >= currentDate.getMinutes())
        ) {
          if (doc.data().username !== req.user.username) {
            return res.status(403).json({ error: "Unauthorized" });
          } else {
            res.json({ message: "Comment deleted successfully" });
            return document.delete();
          }
        } else if (
          rTime.getHours() < currentDate.getHours() ||
          (rTime.getHours() === currentDate.getHours() &&
            rTime.getMinutes() < currentDate.getMinutes())
        ) {
          return res.status(404).json({ error: "Order is finished" });
        }
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  });
};

const a = () => {};

exports.editComment = (req, res) => {
  const document = db.doc(`/comments/${req.params.commentId}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (req.body.comment.trim() === "") {
      return res.status(400).json({ Comment: "Comment must not be empty." });
    }
    const newComment = req.body;
    db.doc(`/orders/${doc.data().orderId}`)
      .get()
      .then((element) => {
        const requestedTime = new Date(element.data().requestedTime * 1000);
        const currentTime = new Date();

        if (
          requestedTime.getDate() !== currentTime.getDate() ||
          requestedTime.getMonth() !== currentTime.getMonth() ||
          requestedTime.getFullYear() !== currentTime.getFullYear()
        ) {
          return res.status(404).json({ error: "Order is finished" });
        }
        if (requestedTime.getHours() === currentTime.getHours()) {
          if (requestedTime.getMinutes() <= currentTime.getMinutes()) {
            return res.status(404).json({ error: "Order is finished" });
          }
        } else if (requestedTime.getHours() < currentTime.getHours()) {
          return res.status(404).json({ error: "Order is finished" });
        }

        if (doc.data().username !== req.user.username) {
          if (req.user.username === "admin") {
            document.update(newComment);
            return res.json({
              message: `document ${req.params.commentId} edited successfully`,
            });
          }
          return res.status(403).json({ error: "Unauthorized" });
        }

        document.update(newComment).then((el) => {
          res.json({
            message: `document ${req.params.commentId} edited successfully`,
          });
        });
      })
      .catch((err) => {
        res.status(500).json({ error: "something went wrong" });
        console.log(err);
      });
  });
};
