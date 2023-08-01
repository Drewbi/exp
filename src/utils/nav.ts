import { getExpConfigs } from "./config"

export const setNav = (parentElem: HTMLElement) => {
    const modules = getExpConfigs()
    const content = modules.map((page): string => `<li><a href="./${page.link}">${page.title}</a></li>`).join("\n")
    parentElem.innerHTML = content
}
