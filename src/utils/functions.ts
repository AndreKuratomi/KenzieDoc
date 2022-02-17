export const title = (str: string) => {
  const arr = str.split(" ");
  let result = "";
  arr.forEach((str, i) => {
    result += str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
    if (i < arr.length - 1) {
      result += " ";
    }
  });
  return result;
};
