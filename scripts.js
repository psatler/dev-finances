const Modal = {
  toggle() {
    document
      .querySelector('.modal-overlay')
      .classList
      .toggle('active')
  }
}

const transactions = [
  {
    id: 1,
    description: 'Luz',
    amount: -50000, // not using commas to split the cents
    date: '30/01/2021',
  },
  {
    id: 2,
    description: 'Criação website',
    amount: 500000, // not using commas to split the cents
    date: '30/01/2021',
  },
  {
    id: 3,
    description: 'Internet',
    amount: 20000, // not using commas to split the cents
    date: '30/01/2021',
  },
]

const Transaction = {
  income() {

  },
  expenses() {

  },
  total() {

  },
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = this.innerHTMLTransaction(transaction)

    this.transactionsContainer.appendChild(tr)
  },
  innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img src="./assets/plus.svg" alt="Adicionar transação">
      </td>
    `

    return html
  }
}


const Utils = {
  formatCurrency(value) {
    const signal = Number(value) < 0 ? '-' : ''

    value = String(value).replace(/\D/g, "") // replacing all non number chars by empty string
    value = Number(value) / 100
    value = value.toLocaleString("pt-BR", {
      style: 'currency',
      currency: 'BRL'
    })

    return signal + value
  }
}

transactions.forEach(function(transaction) {
  DOM.addTransaction(transaction)
})