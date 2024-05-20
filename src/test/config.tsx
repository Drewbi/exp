const modules = import.meta.glob('/src/test/**/*.tsx', {
    import: 'default',
    eager: true,
})

console.log(modules)

interface Config {
    path: string | null,
    Element: React.ComponentType<any>,
}

const routes: Config[] = Object.keys(modules).map(key => {
    return {
        path: parseId(key),
        Element: modules[key] as React.ComponentType<any>
    }
})

function parseId(path: string): string | null {
    const match = path.match(/test\/(.+)\/.+\.tsx/)
    if (!match || match.length < 2) return null;
    return match[1]
}

export default routes
