import './style.css'

interface PageConfig {
  title: string
  link: string
}

const pages = import.meta.glob('./exp/**/index.ts', { eager: true, import: "default" })
const modules = Object.values(pages) as PageConfig[]
const links = modules.map((page): string => `<a href="${page.link}">${page.title}</a>`)
const app = document.querySelector<HTMLDivElement>('#app')
if (app) {
    app.innerHTML = `<h1>E X P</h1>\n`
    app.innerHTML += links.join("\n")
}


