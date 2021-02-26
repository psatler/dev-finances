const ThemeSwitcher = {
  switchInput: document.querySelector('.switch input[type="checkbox"]'),

  switchTheme(event) {
    if(event.target.checked) {
      document.documentElement.setAttribute('data-theme','dark-mode')
      localStorage.setItem('dev.finances:theme', true)
    } else {
      document.documentElement.removeAttribute('data-theme','dark-mode')
      localStorage.setItem('dev.finances:theme', false)
    }
    // document.documentElement.toggleAttribute('data-theme','dark-mode')
  },

  
  getThemeOnInit() {
    const isDarkTheme = JSON.parse(localStorage.getItem('dev.finances:theme')) || false

    console.log('isDarkTheme', isDarkTheme)

    if(isDarkTheme) {
      this.switchInput.checked = true
      document.documentElement.setAttribute('data-theme','dark-mode')
    } else {
      this.switchInput.checked = false
      document.documentElement.removeAttribute('data-theme','dark-mode')
    }
  },

}

ThemeSwitcher.switchInput.addEventListener('change', ThemeSwitcher.switchTheme, false)

ThemeSwitcher.getThemeOnInit()