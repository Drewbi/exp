export interface ExpConfig {
    title: string
    link: string
}

export const getExpConfigs = (): ExpConfig[] => {
    const configs = import.meta.glob('../**/config.json', { eager: true })
    return Object.values(configs) as ExpConfig[]
}
