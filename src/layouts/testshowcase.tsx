import { Link } from 'react-router-dom'
import testconfig from '../test/config'

export default function () {
    return (
        <div className='w-full h-full p-10 grid grid-cols-3 auto-rows-min'>
            {testconfig.map(e =>
                <Link className="text-white font-bold font-mono" key={e.path} to={e.path}>{e.path}</Link>
            )}
        </div>
    )
}