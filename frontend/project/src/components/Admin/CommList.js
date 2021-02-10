import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./admin.css";
import Comment from "./Comment";

import axios from "axios";
import Loading from "./loading";

class CommList extends Component {
  state = {
    comments: null,
  };

  componentDidMount() {
    const commentUrl = `https://europe-west1-foodorderproject-fe50a.cloudfunctions.net/api/orders/${this.props.id}`;

    axios
      .get(commentUrl)
      .then((res) => {
        this.setState({
          comments: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    if (this.state.comments !== null) {
      return (
        <>
          {this.state.comments.orderData.comments.map((c) => {
            console.log(c);
            return (
              <Comment
                key={c.id}
                userImage={c.userImage}
                username={c.username}
                value={c.comment}
                commentId={c.id}
                hour={new Date(c.createdAt._seconds * 1000).getHours()}
                minutes={new Date(c.createdAt._nanoseconds * 1000).getMinutes()}
              />
            );
          })}
        </>
      );
    } else return <Loading />;
  }
}

export default CommList;
