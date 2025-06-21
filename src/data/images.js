export const getImages = (theme) => {
  console.log("THEME RECEIVED:", theme); //debugging

  const emojis = [
    "😀",
    "🤣",
    "🥰",
    "🤪",
    "🥳",
    "🥶",
    "😭",
    "👿",
    "💩",
    "🙈",
    "💀",
    "🫨",
  ].map((emoji) => ({ type: 'emoji', value: emoji }));

  const numbers = Array.from({ length: 20 }, (_, i) => ({
    type: 'number',
    value: (i + 1).toString(),
  }));

  //debugging
  if (theme === 'numbers') {
    console.log("Returning numbers set");
    return numbers;
  }

  if (theme === 'emojis') {
    console.log("Returning emoji set");
    return emojis;
  }

  console.warn("Unknown theme, Falling back to emojis.");
  return emojis;
};
