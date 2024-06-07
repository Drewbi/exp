const modules = import.meta.glob('/src/test/*/index.tsx', {
    import: 'default',
    eager: true,
})

const iterations = import.meta.glob('/src/test/*/iter/*/index.tsx', {
    import: 'default',
    eager: true,
})

interface Config {
    path: string | undefined,
    Element: React.ComponentType<any>,
}

interface Route extends Config {
    children: Config[]
}

const routes: Route[] = Object.keys(modules).map(key => {
    const path = parseId(key)
    if (!path) throw "unable to parse path for module " + key
    return {
        path,
        Element: modules[key] as React.ComponentType<any>,
        children: Object.keys(iterations).filter(iterKey => iterKey.includes(path)).map(iterKey => {
            return {
                path: parseId(iterKey),
                Element: iterations[iterKey] as React.ComponentType<any>
            }
        })
    }
})

function parseId(path: string): string | undefined {
    const match = path.match(/\/([0-9A-F]+)\/index\.tsx/)
    if (!match || match.length < 2) return undefined;
    return match[1]
}

export default routes
