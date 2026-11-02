// Расчёт стоимости
//
//
//C default, descountFn
//function calculateTotal(price, quantity, discountFn = createDiscount(0)) {
//    return discountFn(price * quantity);
//}


function calculateTotal(price, quantity, discountFn) {
    return discountFn ? discountFn(price * quantity) : price * quantity;
}


function createDiscount(percent) {
    return (amount) => { // замыкание
        return amount * (100 - percent) / 100; // внутренняя функция запомнила переменные внешней
    }
}


const studentDiscount = createDiscount(20);
const militaryDiscount = createDiscount(50);
const ownerDiscount = createDiscount(100);

console.log(calculateTotal(1000, 2));                  // 2000
console.log(calculateTotal(1000, 2, militaryDiscount));// 1000
console.log(calculateTotal(1000, 2, ownerDiscount));   // 0
console.log(calculateTotal(1000, 2, studentDiscount)); // 1600
console.log(calculateTotal(1000, 0, studentDiscount)); // 0
console.log("\n\n\n");


//Выдача билетов
//
//
const sellTicket = createTicketOffice("Frontend Meetup", 2);
const sellTicketNextWeek = createTicketOffice("Frontend Meetup in november", 3);
const doNotSellTicket = createTicketOffice("Happy Life", 0);

console.log(sellTicket("Анна"));        // { event: "Frontend Meetup", number: 1, name: "Анна" }
console.log(sellTicket("Иван"));        // { event: "Frontend Meetup", number: 2, name: "Иван" }
console.log(sellTicket("Мария"));       // null — свободных мест больше нет
console.log(sellTicket("Маша"));        // null — свободных мест все еще нет
console.log(sellTicketNextWeek("Маша"));// { event: "Frontend Meetup in november", number: 1, name: "Маша" }
console.log(doNotSellTicket("Bad guy"));// null — свободных мест больше нет и не было
console.log("\n\n\n");


function createTicketOffice(eventName, capacity) {
    let ticketNumber = 0;
    return (visitorName) => { // замыкание
        if (capacity <= 0) { // внутренняя функция запомнила переменные внешней
            return null;
        }
        ticketNumber++;
        capacity--;
        return { event: eventName, number: ticketNumber, name: visitorName };
    }
}


//Печать билета
//
//
const anotherSellTicket = createTicketOffice("Frontend Meetup", 2);
const annsTicket = anotherSellTicket("Анна");

print(annsTicket);               // Печатает билет №1.
console.log()
print(annsTicket);               // Повторно печатает тот же билет.
console.log()
const nastyTicket = anotherSellTicket("Настя");
print(nastyTicket);              // Печатает билет №2.
console.log()
print(nastyTicket);              // Повторно печатает тот же билет.
console.log()
print(anotherSellTicket("Иван"));// Билеты закончились.
print(anotherSellTicket("Ваня"));// Билеты закончились независимо от позывного.


function print(object) {
    let message;
    if (!object) {
        message = "Билеты закончились.";
    } else {
        message = "Билет №" + object.number + "\nМероприятие: " + object.event + "\nПокупатель: " + object.name ;
    }
    console.log(message);
}