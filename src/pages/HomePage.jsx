import { Header} from '../components/homepage/Header'
import { Footer} from '../components/homepage/Footer'
import Hero from '../components/homepage/Hero'
import Offers from '../components/homepage/Offers'

export function HomePage() {
    return (
        <div className='flex flex-col w-full overflow-auto'>
            <Header />
            <Hero />
            <Offers/>
            <Footer />
        </div>
    )
}


