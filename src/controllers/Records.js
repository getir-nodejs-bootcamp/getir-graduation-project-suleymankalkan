const { listFiltered } = require('../services/Records');
const recordResponse = require('../utils/recordResponse');

const list = (req, res, next) => {
  try {
    const {
      startDate,
      endDate,
      minCount,
      maxCount,
    } = req.body;

    listFiltered(startDate, endDate, minCount, maxCount)
      .then((records) => {
        if (!records.length) {
          res.send(recordResponse(1, 'No records found.'));
        } else {
          res.send(recordResponse(0, 'Success', records));
        }
      });
  } catch (error) {
    next(error);
  }
};

module.exports = { list };
