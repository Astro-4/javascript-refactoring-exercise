function processTransactions(transActions) {
  let txr = [];

  if (!validateTransactions(transActions)) {
    throw new Error("Undefined collection of transactions");
  }

  let txCount = {};

  //Changed the loop from imperative to declarative
  transActions.forEach((transaction) => {
    txCount[transaction]
      ? (txCount[transaction] += 1)
      : (txCount[transaction] = 1);
  });

  txCount = sortByAmountThenName(txCount);

  // Object.entries will add an array collection of key value pairs, which is loaded into a map string
  txr = Object.entries(txCount).map(([item, count]) => `${item} ${count}`);

  return txr;
}

function sortByAmountThenName(txCount) {
  let sortedKeys = Object.keys(txCount).sort((a, b) => {
    return txCount[b] - txCount[a] || a > b || -(a < b);
  });

  let sortedResults = {};
  //Added and simplified arrow function to make it look cleaner
  sortedKeys.forEach((key) => (sortedResults[key] = txCount[key]));
  return sortedResults;
}

function validateTransactions(transactions) {
  return transactions !== undefined ? true : false;
}

module.exports = processTransactions;
