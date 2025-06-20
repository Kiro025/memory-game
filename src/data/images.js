export const getImages = (theme) => {
  console.log("THEME RECEIVED:", theme); //debugging

  const emojis = [
    "https://twemoji.maxcdn.com/v/latest/svg/1f600.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f602.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f603.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f604.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f605.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f606.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f607.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f608.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f609.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f60a.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f60b.svg",
    "https://twemoji.maxcdn.com/v/latest/svg/1f60c.svg",
  ].map((url) => ({ type: 'emoji', value: url }));

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
