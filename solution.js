function calculateTotal(price, quantity, discountFn) {
  const total = price * quantity;

  if (discountFn === undefined) {
    return total;
  }

  return discountFn(total);
}

function createDiscount(percent) {
  return function (total) {
    return total * (1 - percent / 100);
  };
}

function createTicketOffice(eventName, capacity) {
  let soldTickets = 0;

  return function (name) {
    if (soldTickets >= capacity) {
      return null;
    }

    soldTickets += 1;

    return {
      event: eventName,
      number: soldTickets,
      name: name,
    };
  };
}

function print(ticket) {
  if (ticket === null) {
    console.log("Билеты закончились.");
    return;
  }

  console.log(
    `Билет №${ticket.number}\nМероприятие: ${ticket.event}\nПокупатель: ${ticket.name}`
  );
}

module.exports = {
  calculateTotal,
  createDiscount,
  createTicketOffice,
  print,
};
