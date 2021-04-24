import React from 'react';
import { Editor } from "slate-react";
import BoldMark from './components/BoldMark';
import CodeNode from './components/CodeNode';
import LinkNode from './components/LinkNode';

const RichTextDisplay = ({ value, onChange, onKeyDown, plugins, readOnly=false }) => {
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
      }
    };
    
    const renderMark = props => {
      switch (props.mark.type) {
        case "bold":
          return <BoldMark {...props} />;
      }
    };
    return (
        <div>
            <Editor
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                onKeyDown={onKeyDown}
                renderNode={renderNode}
                renderMark={renderMark}
                spellCheck={false}
                plugins={plugins}
            />
                
        </div>
    )
}

export default RichTextDisplay
