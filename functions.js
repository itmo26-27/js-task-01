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
    let ticketsSold = 0;

    return function (name) {
        if (ticketsSold >= capacity) {
            return null;
        }

        ticketsSold += 1;

        return {
            event: eventName,
            number: ticketsSold,
            name: name,
        };
    };
}

function print(ticket) {
    if (ticket === null) {
        console.log("Билеты закончились.");
        return;
    }

    console.log(`Билет №${ticket.number}\nМероприятие: ${ticket.event}\nПокупатель: ${ticket.name}`);
}

const studentDiscount = createDiscount(20);
const fullDiscount = createDiscount(100);

console.log(calculateTotal(1000, 2)); // 2000
console.log(calculateTotal(1000, 2, studentDiscount)); // 1600
console.log(calculateTotal(1000, 2, fullDiscount)); // 0
console.log(calculateTotal(1000, 0, studentDiscount)); // 0

const sellTicket = createTicketOffice("Frontend Meetup", 2);
const ticket = sellTicket("Анна");

console.log(ticket); // Билет №1, Frontend Meetup, Анна

const ticketBeforePrinting = JSON.stringify(ticket);

console.log(print(ticket)); // Билет №1 для Анны на Frontend Meetup и undefined
console.log(print(ticket)); // Тот же билет и undefined
console.log(JSON.stringify(ticket) === ticketBeforePrinting); // true - билет не изменился

const lastTicket = sellTicket("Иван");
console.log(lastTicket); // Билет №2, Frontend Meetup, Иван
console.log(sellTicket("Мария")); // null - мест нет

console.log(print(sellTicket("Пётр"))); // "Билеты закончились." и undefined

const emptyOffice = createTicketOffice("Концерт", 0);
console.log(emptyOffice("Анна")); // null - в кассе 0 мест

const secondOffice = createTicketOffice("Выставка", 1);
console.log(secondOffice("Мария").number); // 1 - своя нумерация
