const Record = require('../models/Record');

const listFiltered = async (startDate, endDate, minCount, maxCount) => Record.aggregate([
  // Filter the data between dates first
  {
    $match: {
      createdAt: {
        $gte: new Date(startDate),
        $lt: new Date(endDate),
      },
    },
  },
  // Sum the counts array and put it on field "totalCount"
  {
    $addFields: {
      totalCount: {
        $sum: '$counts',
      },
    },
  },
  // Delete the count,value and _id field from the output since its unnecessary
  {
    $unset: ['counts', 'value', '_id'],
  },
  // Filter the data according to min and max count
  {
    $match: {
      totalCount: {
        $gte: minCount,
        $lt: maxCount,
      },
    },
  },
]);

module.exports = { listFiltered };
