const assert = require("node:assert/strict");
const {
  calculateTotal,
  createDiscount,
  createTicketOffice,
  print,
} = require("./solution.js");

const studentDiscount = createDiscount(20);
const fullDiscount = createDiscount(100);

assert.equal(calculateTotal(1000, 2), 2000);
assert.equal(calculateTotal(1000, 2, studentDiscount), 1600);
assert.equal(calculateTotal(1000, 2, fullDiscount), 0);
assert.equal(calculateTotal(1000, 0, studentDiscount), 0);

const sellTicket = createTicketOffice("Frontend Meetup", 2);
assert.deepEqual(sellTicket("Анна"), {
  event: "Frontend Meetup",
  number: 1,
  name: "Анна",
});
assert.deepEqual(sellTicket("Иван"), {
  event: "Frontend Meetup",
  number: 2,
  name: "Иван",
});
assert.equal(sellTicket("Мария"), null);

const sellFromEmptyOffice = createTicketOffice("Показ фильма", 0);
assert.equal(sellFromEmptyOffice("Анна"), null);

const sellFromFirstOffice = createTicketOffice("Первое событие", 1);
const sellFromSecondOffice = createTicketOffice("Второе событие", 1);
assert.equal(sellFromFirstOffice("Анна").number, 1);
assert.equal(sellFromSecondOffice("Иван").number, 1);
assert.equal(sellFromFirstOffice("Мария"), null);

const sellForPrint = createTicketOffice("Frontend Meetup", 2);
const ticket = sellForPrint("Анна");
const ticketBeforePrint = { ...ticket };
const originalLog = console.log;
const printedMessages = [];
let ticketPrintResult;
let soldOutPrintResult;

console.log = function (message) {
  printedMessages.push(message);
};

try {
  ticketPrintResult = print(ticket);
  print(ticket);
  const nextTicket = sellForPrint("Иван");
  soldOutPrintResult = print(sellForPrint("Мария"));

  assert.deepEqual(nextTicket, {
    event: "Frontend Meetup",
    number: 2,
    name: "Иван",
  });
} finally {
  console.log = originalLog;
}

assert.equal(ticketPrintResult, undefined);
assert.equal(soldOutPrintResult, undefined);
assert.deepEqual(ticket, ticketBeforePrint);
assert.deepEqual(printedMessages, [
  "Билет №1\nМероприятие: Frontend Meetup\nПокупатель: Анна",
  "Билет №1\nМероприятие: Frontend Meetup\nПокупатель: Анна",
  "Билеты закончились.",
]);
