import './style.css'
import exp from './exp'
import 'ghspa'

const app = document.querySelector<HTMLDivElement>('#app')!
const base = '/exp/'
const path = window.location.pathname
app.innerHTML = path === base ? 'Home' : exp.find(obj => base + obj.path === path)?.src.html ?? '404'
