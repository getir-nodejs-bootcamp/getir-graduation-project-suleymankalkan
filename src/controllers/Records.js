const { list } = require('../services/Records');

const listAll = (req, res) => {
  list()
    .then((recordList) => {
      if (!recordList) res.status(404).send({ error: 'Sorun var..' });
      res.status(200).send(recordList);
    })
    .catch((e) => res.status(501).send(e));
};

module.exports = { listAll };
