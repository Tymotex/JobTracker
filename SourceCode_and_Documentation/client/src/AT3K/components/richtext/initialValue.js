import { Value } from "slate";
// Create our initial value...
export const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [{ text: "Start typing here!" }]
          }
        ]
      }
    ]
  }
})
// export const initialValue = Value.fromJSON({
//   document: {
//     nodes: [
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [{ text: "Start editing to see some magic happen \u2728" }]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [{ object: "text", leaves: [{ text: "" }] }]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               {
//                 text:
//                   "If you type ‘&’ it will expand to ‘and’. (InsertWordHotKey.js)"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [{ object: "text", leaves: [{ text: "" }] }]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               { text: "Use Ctrl+b to toggle " },
//               { text: "marking text bold", marks: [{ type: "bold" }] },
//               { text: ". (MarkHotKey.js)" }
//             ]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [{ object: "text", leaves: [{ text: "" }] }]
//       },
//       {
//         object: "block",
//         type: "code",
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               {
//                 text:
//                   "Use Ctrl+` to toggle changing paragraphs into code blocks. (BlockHotKey.js)"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [{ object: "text", leaves: [{ text: "" }] }]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         data: {
//           color: "green"
//         },
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               {
//                 text:
//                   "Use Ctrl+g to toggle setting the block color to green. (BlockColorHotKey.js)"
//               }
//             ]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [{ object: "text", leaves: [{ text: "" }] }]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [{ text: "Use Ctrl+u to turn selected text into a " }]
//           },
//           {
//             object: "inline",
//             type: "link",
//             data: { href: "" },
//             nodes: [
//               {
//                 object: "text",
//                 leaves: [{ text: "Hyperlink" }]
//               }
//             ]
//           },
//           {
//             object: "text",
//             leaves: [{ text: ". (WrapInlineHotKey.js)" }]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               {
//                 text:
//                   "Click the 🔗button to set the Hyperlink’s destination URL."
//               }
//             ]
//           }
//         ]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [{ object: "text", leaves: [{ text: "" }] }]
//       },
//       {
//         object: "block",
//         type: "paragraph",
//         nodes: [
//           {
//             object: "text",
//             leaves: [
//               {
//                 text:
//                   "If no text is selected when you press Ctrl+u, then the entire word at the current cursor position will be turned into a link. (ExtendToWord.js)"
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
// });
