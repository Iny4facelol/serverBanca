const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');

const randomIban = faker.finance.iban({ formatted: true })

const mapAccount = (account) => ({
  id: uuidv4(), // Genera un ID único para la cuenta
  iban: randomIban, // IBAN aleatorio
  name: account.name,
  type: account.type,
  balance: 0, // Deja el saldo en 0 por defecto
  lastTransaction: new Date().toISOString(), // Deja la última transacción en la fecha actual
});

module.exports = { mapAccount };

