import "./nav.css"
import { getExpConfigs } from "./config"

export const setNav = (parentElem: HTMLElement) => {
    const modules = getExpConfigs()
    const content = modules.filter(module => !module.wip).map((page): string => `<a href="./${page.link}">${page.title}</a>`).join("\n")
    parentElem.innerHTML = content
}
