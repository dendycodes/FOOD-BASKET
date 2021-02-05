import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import "./comments.css";
import axios from "axios";
class Comment extends Component {
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
            return (
              <div className="comments-container" key={c.id}>
                {console.log(c.userImage)}
                <img className="cmtPic" src={c.userImage} alt="userprofile" />
                <div className="data-container">
                  <div className="username-date-container">
                    <p className="username">{c.username}</p>
                    <div className="date-container">
                      {new Date(
                        c.createdAt._seconds * 1000
                      ).toLocaleTimeString()}
                    </div>
                  </div>

                  <p className="comment-container">{c.comment}</p>
                </div>
                {/* {console.log(new Date(c.createdAt._seconds * 1000).getHours)} */}
              </div>
            );
          })}
        </>
      );
    } else return <>Loading...</>;
  }
}

export default Comment;
