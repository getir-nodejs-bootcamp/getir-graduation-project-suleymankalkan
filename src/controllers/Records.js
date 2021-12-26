const { listFiltered } = require('../services/Records');

const list = (req, res) => {
  try {
    const {
      startDate, endDate, minCount, maxCount,
    } = req.body;

    listFiltered(startDate, endDate, minCount, maxCount)
      .then((reqPayload) => {
        res.send(reqPayload);
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { list };
