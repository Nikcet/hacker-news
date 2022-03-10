import React from "react";
import { Container, List, Header, Comment } from "semantic-ui-react";
import api from "../API/HackerNewsApi";
import CommentItem from "./Comment";

const Comments = (props) => {
  const [childComments, setChildComments] = React.useState([]);

  React.useEffect(() => {
    // console.log(props.comments);
    // props.comments.map(comment => {
    //   if (comment.kids) {
    //     console.log(comment.kids);
    //   }
    // })
    getChildComments();
  }, [props.comments]);

  const getChildComments = (commentId) => {
    props.comments.map(comment => {
      console.log(comment);
    })
  }

  return (
    <Container className="comments">
      <Header as="h3" className="comments__header">
        Comments:{" "}
      </Header>
      <Comment.Group className="comments__list">
        {props.comments.map((comment) => {
          return (
            !comment.deleted && (
              <CommentItem key={comment.id} comment={comment} childComments={childComments} {...props} />
            )
          );
        })}
      </Comment.Group>
    </Container>
  );
};

export default Comments;
