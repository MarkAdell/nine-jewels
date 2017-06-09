function getUser(req, res) {
  var param = req.params.userName;
  res.send(param);
}

module.exports = {
  getUser : getUser
}