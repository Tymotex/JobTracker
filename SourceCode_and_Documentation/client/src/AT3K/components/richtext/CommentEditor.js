import React from "react";
import RichTextDisplay from './RichTextDisplay';
import { initialValue } from "./initialValue";

import {
  InsertWordHotKey,
  MarkHotKey,
  BlockHotKey,
  BlockColorHotKey,
  WrapInlineHotKey
} from "./editor-plugins";
import { Button } from "../buttons";
import api from "../../constants/api";
import axios from 'axios';
import Cookie from 'js-cookie';
import { Notification } from "../notification";

const plugins = [
  InsertWordHotKey({ char: "&", word: "and" }),
  MarkHotKey({ type: "bold", key: "b" }),
  BlockHotKey({ type: "code", normalType: "paragraph", key: "`" }),
  BlockColorHotKey({ key: "g", color: "green" }),
  WrapInlineHotKey({ type: "link", key: "u" })
];

class RichTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.postComment = this.postComment.bind(this);
  }

  // Set the initial value when the app is first constructed.
  state = {
    value: initialValue
  };

  // On change, update the app's React state with the new editor value.
  onChange = ({ value }) => {
    this.setState({ value });
  };

  onKeyDown = (event, change) => {
    // This used to have stuff in it, but I moved it all to plugins.
  };

  postComment(comment) {
    const receiverUserID = this.props.receiverUserID;
    
    // ==== POST /api/comment/ =====
    const userID = Cookie.get("user_id");
    alert("POSTING to " + receiverUserID);
    if (userID) {
      const postData =  {
        method: 'post',
        url: `${api.BASE_URL}/api/comment/`,
        data: {
          sender_user_id: userID,
          receiver_user_id: receiverUserID,
          comment: comment
        },
        headers: {
          'Content-Type': 'application/json'
        }
      };
      axios(postData)
        .then(() => {
          Notification.spawnSuccess("Your comment has been posted!")
        })
        .catch(err => Notification.spawnError(err))
    }
  }

  // Render the editor.
  render() {
    return (
      <div>
        <div style={{ 
            border: "2px solid black", 
            borderRadius: "5px",
            padding: "1em",
            margin: "1em" 
        }}>
          <RichTextDisplay 
            value={this.state.value}
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            spellCheck={false}
            plugins={plugins}
          />
        </div>
        <Button onClick={() => this.postComment(this.state.value)}>Post</Button>
      </div>
    );
  }
}

export default RichTextEditor;
