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

const plugins = [
  InsertWordHotKey({ char: "&", word: "and" }),
  MarkHotKey({ type: "bold", key: "b" }),
  BlockHotKey({ type: "code", normalType: "paragraph", key: "`" }),
  BlockColorHotKey({ key: "g", color: "green" }),
  WrapInlineHotKey({ type: "link", key: "u" })
];

class RichTextEditor extends React.Component {
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

  // Render the editor.
  render() {
    const { profileName } = this.props;
    return (
      <div>
        <h1>Leave a Comment For {profileName}</h1>
        <div>
            <p>
                Give some constructive criticism about this person's resume, career goals, skill development, job profile, etc.
            </p>
            <p>
                If your comment is seen as helpful by the {profileName} and other members of the community, you will acquire
                reputation points and gain access to certain privileges. If your comment is unhelpful, abusive or negative, 
                you will lose reputation points and eventually your account will be suspended.
            </p>
            <p>
                Currently supported commands: 
                <ul>
                    <li>Ctrl+b for bold</li>
                    <li>Ctrl+` for code block syntax</li>
                    <li>Ctrl+g for green colouring</li>
                    <li>Ctrl+u for hyperlinking</li>
                </ul>
            </p>
        </div>
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
        <Button>Post</Button>
      </div>
    );
  }
}

export default RichTextEditor;
