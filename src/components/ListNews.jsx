import React from "react";
import { List, Header } from "semantic-ui-react";
import OneNews from "./OneNews";
import NewsPage from "./NewsPage";

const ListNews = (props) => {
  // console.log(props.newsList);
  return (
    // <NewsPage item={props.newsList[0]} />
    <List>
      {props.newsList.map((item) => {
        return (
          <List.Item key={item.id} className="news">
            <OneNews item={item} {...props} />
          </List.Item>
        );
      })}
    </List>
  );
};

export default ListNews;
