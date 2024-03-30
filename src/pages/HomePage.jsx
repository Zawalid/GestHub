import { Header} from '../components/homepage/Header'
import { Footer} from '../components/homepage/Footer'
import Hero from '../components/homepage/Hero'

export function HomePage() {
    return (
        <div className='flex flex-col w-full'>
            <Header />
            <Hero/>
            <Footer />
        </div>
    )
}


