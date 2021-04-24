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
        <Button>Post</Button>
      </div>
    );
  }
}

export default RichTextEditor;
