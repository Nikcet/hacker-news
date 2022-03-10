import React from "react";
import { Container, List, Header, Comment } from "semantic-ui-react";
import api from "../API/HackerNewsApi";

const CommentItem = (props) => {
  const { day, time } = props.newsDate(props.comment.time);

  React.useEffect(() => {
    if (props.comment.kids) {
      getChildComment(props.comment.kids);
    }
  }, []);

  const getChildComment = (kids) => {
    kids.map((id) => {
      api.getComment(id).then((data) => {
        // console.log(data);
      });
    });
  };

  return (
    <Comment className={`comment`}>
      <Comment.Content>
        <Comment.Author as="a">{`${props.comment?.by}`}</Comment.Author>
        <Comment.Metadata>
          <p className="comment__time">{`${time}, ${day}`}</p>
        </Comment.Metadata>
        <Comment.Text className="comment__text">
          {props.comment?.text}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  );
};

export default CommentItem;
