import React from "react";
const CodeNode = props => (
  <pre {...props.attributes} style={{ color: props.node.data.get("color"), backgroundColor: "beige", padding: "10px" }}>
    <code>{props.children}</code>
  </pre>
);
export default CodeNode;
