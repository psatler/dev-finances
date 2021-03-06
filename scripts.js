const Modal = {
  toggle() {
    document
      .querySelector('.modal-overlay')
      .classList
      .toggle('active')
  }
}

const AppStorage = {
  get() {
    return JSON.parse(localStorage.getItem('dev.finances:transactions')) || []
  },

  set(transactions) {
    localStorage.setItem('dev.finances:transactions', JSON.stringify(transactions))
  },
}

const Transaction = {
  all: AppStorage.get(),

  add(transaction) {
    this.all.push(transaction)

    App.reload()
  },

  remove(index) {
    const item = this.all[index].description
    this.all.splice(index, 1)

    App.reload()

    Toast.show(`Item ${item} removido`, 'normal')
  },

  incomes() {
    let income = 0

    this.all.forEach(transaction => {
      if (transaction.amount > 0) {
        income += transaction.amount
      }
    })

    return income
  },

  expenses() {
    let expense = 0

    this.all.forEach(transaction => {
      if (transaction.amount < 0) {
        expense += transaction.amount
      }
    })

    return expense
  },

  total() {
    return this.incomes() + this.expenses()
  },
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = this.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index

    this.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? 'income' : 'expense'

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
      <td class="description">${transaction.description}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
      </td>
    `

    return html
  },

  updateBalance() {
    document
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactons() {
    // erase the DOM (tbody) before reloading the application
    this.transactionsContainer.innerHTML = ''
  },
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
  },

  formatAmount(value) {
    value = value * 100
    return Math.round(value)
  },

  formatDate(date) {
    const [year, month, day] = date.split('-')
    return `${day}/${month}/${year}`
  }
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getValues() {
    return {
      description: this.description.value,
      amount: this.amount.value,
      date: this.date.value,
    }
  },

  validateFields() {
    const { description, amount, date } = this.getValues()

    if(description.trim() === '' || amount.trim() === '' || date.trim() === '') {
      throw new Error('Por favor, preencha todos os campos')
    }
  },

  formatValues() {
    let { description, amount, date } = this.getValues()

    amount = Utils.formatAmount(amount)
    date = Utils.formatDate(date)

    return {
      description,
      amount,
      date,
    }
  },

  clearFields() {
    this.description.value = ''
    this.amount.value = ''
    this.date.value = ''
  },

  submit(event) {
    event.preventDefault()

    try {
      this.validateFields()
      const transaction = this.formatValues()
      Transaction.add(transaction) // when we add a transaction we already perform a reload
      this.clearFields()

      Toast.show(`Item ${transaction.description} adicionado`, 'success')

      Modal.toggle()
    } catch (error) {
      // alert(error.message)
      Toast.show(error.message, 'error')
    }

  }
}

const App = {
  init() {
    
    Transaction.all.forEach((transaction, index) => DOM.addTransaction(transaction, index))
    
    DOM.updateBalance()

    AppStorage.set(Transaction.all)
  },

  reload() {
    DOM.clearTransactons()
    this.init()
  },
}

App.init()
