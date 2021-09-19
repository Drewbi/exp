import './style.css'
import exp from './exp'

const app = document.querySelector<HTMLDivElement>('#app')!
const path = window.location.pathname

app.innerHTML = path === '/' ? 'Home' : exp.find(obj => obj.path === path)?.src.html ?? '404'
