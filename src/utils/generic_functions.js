const sumArr = async(arr) => {
  if(!arr){
    throw new Error("No se paso ninguna matriz para sumar")
  }
  let total = 0;
  for (const num of arr) {
    total = total + Number(num.amount);
  }
  return total;
}

const userActiveDesactive = async(users) => {
  if(!users){
    throw new Error("No se paso ninguna matriz de usuarios")
  }
  let active = 0;
  let desactive = 0;
  for (const user of users) {
    if(user.isActive){
      active = active + 1;
    } else {
      desactive = desactive + 1; 
    }
  }
  const stadistics = {
    active: active,
    desactive: desactive,
    totalUsers: users.length,
  }
  return stadistics;
}

const monthlyIncomeForTheYear = (payload, type, actualYear) => {
  if(!payload || !type || !actualYear){
    throw new Error("Faltan parametros")
  }
  switch (type) {
    case "amount":
      const amountForYear = new Array(12).fill(0);
      const amountForMonth = {};
      let totalAmount = 0;
      for (const buy of payload) {
        const mes = buy.createdAt.getMonth() + 1;
        const year = buy.createdAt.getFullYear();
        if(year === actualYear){
          amountForMonth[mes] = totalAmount + Number(buy.amount); 
        }
      }
      for (const buy of payload) {
        const mes = buy.createdAt.getMonth() + 1;
        const year = buy.createdAt.getFullYear();
        if(year === actualYear){
          amountForYear[mes - 1] = amountForMonth[mes];
        }
      }
      return amountForYear;
  
    default:
      break;
  }
}

module.exports = {
  sumArr,
  userActiveDesactive,
  monthlyIncomeForTheYear,
}