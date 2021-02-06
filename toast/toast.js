const Toast = {
  toastElement: document.createElement('div'),
  hideTimeout: null,

  init() {
    this.toastElement.className = 'toast'
    document.body.appendChild(this.toastElement)
  },

  show(message, state) {
    clearTimeout(this.hideTimeout)

    this.toastElement.textContent = message

    // making the toast visible
    this.toastElement.classList.add('toast__visible')

    if (state) {
      this.toastElement.classList.add(`toast__${state}`)
    }

    this.hideTimeout = setTimeout(() => {
      this.toastElement.classList.remove('toast__visible')

      if (state) {
        this.toastElement.classList.remove(`toast__${state}`)
      }
    }, 3000)
  },

}

document.addEventListener('DOMContentLoaded', () => Toast.init())