import { getExpConfigs } from "./config"

export const handleRoute = () => {
    const modules = getExpConfigs()
    console.log(modules)
    console.log(location.pathname.split('/'))
    const path = location.pathname.split('/')
    if (path.length > 1 && modules.some(module => path[1] === module.link)) import(`../exp/${path[1]}/main.ts`)
}
