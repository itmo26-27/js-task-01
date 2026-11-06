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
  let sold = 0;
  return function (name) {
    if (sold >= capacity) {
      return null;
    }
    sold += 1;
    return {
      event: eventName,
      number: sold,
      name: name,
    };
  };
}

function print(ticket) {
  if (ticket === null) {
    console.log("Билеты закончились");
  } else {
    console.log(`Билет №${ticket.number}\nМероприятие: ${ticket.event}\nПокупатель: ${ticket.name}`);
  }
}

// Расчёт стоимости
const studentDiscount = createDiscount(20);
const fullDiscount = createDiscount(100);
console.log(calculateTotal(1000, 2));
console.log(calculateTotal(1000, 2, studentDiscount));
console.log(calculateTotal(1000, 2, fullDiscount));
console.log(calculateTotal(1000, 0, studentDiscount));

// Выдача и повторная печать
const sellTicket = createTicketOffice("Frontend Meetup", 2);
const firstTicket = sellTicket("Анна");
console.log(firstTicket);
print(firstTicket);
print(firstTicket);
console.log(firstTicket);
const lastTicket = sellTicket("Иван");
console.log(lastTicket);
console.log(sellTicket("Мария"));
console.log(sellTicket("Олег"));
print(sellTicket("Ева"));

// Касса без мест
const emptyOffice = createTicketOffice("Концерт", 0);
console.log(emptyOffice("Анна"));

// Независимые кассы
const firstOffice = createTicketOffice("Лекция", 2);
const secondOffice = createTicketOffice("Концерт", 2);
console.log(firstOffice("Анна"));
console.log(firstOffice("Иван"));
console.log(secondOffice("Мария"));
