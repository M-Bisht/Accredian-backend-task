const idGenerator = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i <= 15; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

export default idGenerator;
