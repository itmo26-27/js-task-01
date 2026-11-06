function calculateTotal(price, quantity, discountFn){
    if (discountFn){
        return discountFn(price * quantity) 
    }else{
        return price * quantity
    }
}
function createDiscount(percentage){
    return function(price){
        return price - (price * 0.01 * percentage)
    }
}
function createTicketOffice(eventName, capacity){
    let number = 0;
    return function(name){
        number++;
        if (number <= capacity){
            return {event : eventName, number: number, name: name}
        }
        else{
            return null
        }
    }
}
function print(ticket){
    if (ticket){
        console.log(`Билет №${ticket.number}\nМероприятие: ${ticket.event}\nПокупатель: ${ticket.name}`)
    }else{
        console.log("Билеты закончились")
    }
}

// Расчёт без скидки, со скидкой 20% и со скидкой 100%
const discount20 = createDiscount(20);
const discount100 = createDiscount(100);

console.log("Получено:", calculateTotal(1000, 2), "Ожидалось: 2000");
console.log("Получено:", calculateTotal(1000, 2, discount20), "Ожидалось: 1600");
console.log("Получено:", calculateTotal(1000, 2, discount100), "Ожидалось: 0");

// Покупка нуля билетов
console.log("Получено:", calculateTotal(1000, 0, discount20), "Ожидалось: 0");

// Выдача последнего доступного билета и попытка выдать следующий
const office1 = createTicketOffice("Мероприятие 1", 1);
const ticket1 = office1("Анна");
console.log("Получено:", ticket1, "Ожидалось: { event: 'Мероприятие 1', number: 1, name: 'Анна' }");

const ticket2 = office1("Иван");
console.log("Получено:", ticket2, "Ожидалось: null");

// Касса с нулевой вместимостью
const emptyOffice = createTicketOffice("Пустой зал", 0);
const ticket3 = emptyOffice("Мария");
console.log("Получено:", ticket3, "Ожидалось: null");

// Две кассы: выдача билета в одной не влияет на другую 
const officeA = createTicketOffice("Зал А", 2);
const officeB = createTicketOffice("Зал Б", 2);
const ticketA1 = officeA("Покупатель 1");
const ticketB1 = officeB("Покупатель 2");

console.log("Получено:", ticketA1.number, "Ожидалось: 1");
console.log("Получено:", ticketB1.number, "Ожидалось: 1");

// Печать билета и сообщения об отсутствии мест 
print(ticketA1); 
// Ожидается вывод:
// Билет №1
// Мероприятие: Зал А
// Покупатель: Покупатель 1

print(null); 
// Ожидается вывод:
// Билеты закончились.

// Повторная печать не меняет билет и количество свободных мест 
print(ticketA1);
// Ожидается вывод: 
// Мероприятие: Зал А
// Покупатель: Покупатель 1

const nextTicket = officeA("Покупатель 3");
console.log("Получено:", nextTicket, "Ожидалось: { event: 'Зал А', number: 2, name: 'Покупатель 3' }");

/* 
ответы на вопросы:

1)
Замыкание используется в функциях createDiscount и createTicketOffice. 
В createDiscount оно хранит переменную percentage. 
В createTicketOffice оно хранит eventName , capacity  и текущий счётчик number 

2)Какие функции в решении являются чистыми?
Чистыми являются функция calculateTotal и внутренняя функция, которую возвращает createDiscount

3)Почему отсутствие return с результатом не мешает функции print выполнять свою задачу?
Потому что задача функции print - это побочный эффект, а не возврат значения
*/