const modules = import.meta.glob('/src/test/**/*.tsx', {
    import: 'default',
    eager: true,
})

interface Config {
    path: string,
    Element: React.ComponentType<any>,
}

const routes: Config[] = Object.keys(modules).map(key => {
    return {
        path: parseId(key),
        Element: modules[key] as React.ComponentType<any>
    }
})

function parseId(path: string): string {
    const match = path.match(/test\/([a-zA-Z0-9]+)\//)
    if (!match || match.length < 2) throw new Error("Could not parse path " + path)
    return match[1]
}

export default routes