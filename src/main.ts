import './style.css'
import { setNav } from './utils/nav'
import { handleRoute } from './utils/router'

const navContainer = document.getElementById('nav')
if (navContainer) setNav(navContainer)

handleRoute()
