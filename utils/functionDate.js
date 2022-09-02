export const timer = (time) => {
  let stringTime = time.toString();
  let displayedTime = "";
  if (stringTime.length === 3) {
    for (let i = 0; i < stringTime.length; i++) {
      if (i === 0) {
        displayedTime += "0" + stringTime[i];
      }
      if (i === 1) {
        displayedTime += "h" + stringTime[i];
      }
      if (i > 1) {
        displayedTime += stringTime[i];
      }
    }
  }
  if (stringTime.length === 4) {
    for (let i = 0; i < stringTime.length; i++) {
      if (i < 2) {
        displayedTime += stringTime[i];
      }
      if (i === 2) {
        displayedTime += "h" + stringTime[i];
      }
      if (i > 2) {
        displayedTime += stringTime[i];
      }
    }
  }
  return displayedTime;
};

export const ager = (birthday) => {
  const today = Date.now();
  const age = Math.floor((today - birthday) / 1000 / 60 / 60 / 24 / 365);
  return age;
};

export const numDater = () => { };

export const testDater = () => { };
