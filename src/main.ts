import './style.css'
import exp from './exp'

const app = document.querySelector<HTMLDivElement>('#app')!
const base = '/exp/'
const path = window.location.pathname
console.log(path)
app.innerHTML = path === base ? 'Home' : exp.find(obj => base + obj.path === path)?.src.html ?? '404'
