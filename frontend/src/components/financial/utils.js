export function GetIncome(incomes) {
  let total = 0;
  for (let income of incomes) {
    total += income.paid + income.toreceive;
  }

  return total;
}

export function GetProfit(incomes) {
  let total = 0;
  for (let income of incomes) {
    total += income.paid + income.toreceive - income.profitless;
  }

  return total;
}

export function GetReceived(incomes) {
  let total = 0;
  for (let income of incomes) {
    total += income.paid;
  }

  return total;
}

export function GetToReceive(incomes) {
  let total = 0;
  for (let income of incomes) {
    total += income.toreceive;
  }

  return total;
}

export function GetSortedIncome(incomes) {
  let sorted = [];

  let data = {};
  for (var income of incomes) {
    for (let sector of income.sectorsList) {
      if (data[sector.name]) {
        data[sector.name] += sector.amount;
      } else {
        data[sector.name] = sector.amount;
      }
    }
  }

  for (let key of Object.keys(data)) {
    sorted.push({ name: key, amount: data[key] });
  }

  return sorted;
}

export const getTotalExpense = expenses => {
  let total = 0;

  for (let ex of expenses) {
    total += ex.amount;
  }

  return total;
};
