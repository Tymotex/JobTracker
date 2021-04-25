import React, { useState } from 'react';
import { Editor } from "slate-react";
import BoldMark from './components/BoldMark';
import CodeNode from './components/CodeNode';
import LinkNode from './components/LinkNode';
import styles from './RichTextDisplay.module.scss';
import {
  Button
} from '../buttons';
import {
  InsertWordHotKey,
  MarkHotKey,
  BlockHotKey,
  BlockColorHotKey,
  WrapInlineHotKey
} from "./editor-plugins";

const plugins = [
  InsertWordHotKey({ char: "&", word: "and" }),
  MarkHotKey({ type: "bold", key: "b" }),
  BlockHotKey({ type: "code", normalType: "paragraph", key: "`" }),
  BlockColorHotKey({ key: "g", color: "green" }),
  WrapInlineHotKey({ type: "link", key: "u" })
];


const RichTextDisplay = ({ value, onKeyDown, readOnly = false, buttonText, onSubmit }) => {
  const [currValue, setCurrValue] = useState(value);

  // Add a `renderNode` method to render a `CodeNode` for code blocks.
  const renderNode = props => {
    switch (props.node.type) {
      case "code":
        return <CodeNode {...props} />;
      case "link":
        return <LinkNode {...props} />;
      case "paragraph":
        return (
          <div {...props} style={{ color: props.node.data.get("color") }}>
            {props.children}
          </div>
        );
      default:
        return (
          <div {...props}>
            {props.children}
          </div>
        )
    }
  };

  const onChange = ({ value }) => {
    setCurrValue(value);
  };

  const renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className={(!readOnly) && styles.editingEnabled}>
        <Editor
          value={currValue}
          onChange={onChange}
          readOnly={readOnly}
          onKeyDown={onKeyDown}
          renderNode={renderNode}
          renderMark={renderMark}
          spellCheck={false}
          plugins={plugins}
        />
      </div>
      {!readOnly && (
        <Button onClick={() => onSubmit(currValue)}>{buttonText}</Button>
      )}
    </>
  )
}

export default RichTextDisplay
