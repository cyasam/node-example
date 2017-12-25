const mainPageRoute = (req,res) => {
    res.send({ message: 'Super secret information is Secret Key.' });
};

module.exports = mainPageRoute;