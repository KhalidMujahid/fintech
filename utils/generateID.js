const generateID = () => {
  return `fntx_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
};

module.exports = generateID;
