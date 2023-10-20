import { getExpConfigs } from "./config"

export const handleRoute = () => {
    const modules = getExpConfigs()
    const path = location.pathname.split('/')
    if (path.length > 1) {
        const match = modules.find(module => path[1] === module.link)
        if (match) import(`../exp/${match.link}/main.ts`)
    }
}
