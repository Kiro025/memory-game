export const getImages = (theme) => {
    const emoji = [
      "https://twemoji.maxcdn.com/v/latest/svg/1f600.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f601.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f602.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f603.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f604.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f605.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f606.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f607.svg",
      "https://twemoji.maxcdn.com/v/latest/svg/1f608.svg",
    ];
  
    const animals = [
      "/images/dog.png",
      "/images/cat.png",
      "/images/lion.png",
      "/images/bear.png",
      "/images/elephant.png",
      "/images/monkey.png",
      "/images/panda.png",
      "/images/giraffe.png",
      "/images/koala.png",
    ];
  
    const nature = [
      "/images/leaf.png",
      "/images/tree.png",
      "/images/mountain.png",
      "/images/lake.png",
      "/images/flower.png",
      "/images/river.png",
      "/images/cloud.png",
      "/images/rain.png",
      "/images/sun.png",
    ];
  
    return theme === 'animals' ? animals : theme === 'nature' ? nature : emoji;
  };
  