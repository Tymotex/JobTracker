export function InsertWordHotKey(options) {
  const { char, word } = options;

  // Return our "plugin" object, containing the `onKeyDown` handler.
  return {
    onKeyDown(event, change) {
      // Check that the key pressed matches our `key` option.
      if (event.key !== char) return;

      // Prevent the default characters from being inserted.
      event.preventDefault();

      // Change the value by inserting "and" at the cursor's position.
      change.insertText(word);
    }
  };
}
