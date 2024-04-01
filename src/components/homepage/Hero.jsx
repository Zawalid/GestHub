import { IoIosArrowDown } from "react-icons/io";
import { DropDown } from "../ui/DropDown"
import { SearchInput } from "../ui/SearchInput"
import { useSearchParams } from "react-router-dom"
import { useTranslation } from 'react-i18next'
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { setToUrl } from "../../hooks/useToUrl";

function Hero() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const [parent] = useAutoAnimate({ duration: 300 });
    const {t}=useTranslation()
  
    return (
        <div ref={parent} className="relative grid grid-cols-1 min-h-[75vh] max-lg:text-center lg:grid-cols-2 pt-10 lg:px-12 2xl:px-24">
            <div className="flex my-auto flex-col pb-10 mb-10">
                <div className="p-4 mb-10">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-6 leading-[65px]">{t('hero.title1')} <span className=" font-extrabold text-secondary hover:text-secondary-hover"> {t('hero.title2')} </span>  {t('hero.title3')}</h1>
                    <p className="text-text-secondary">{t('hero.paragraph')}</p>
                </div>
                <div className="flex flex-col md:flex-row justify-center lg:justify-start items-center gap-4 p-4">
                    <SearchInput onChange={(query) =>setToUrl('search', query,searchParams,setSearchParams)} query={query} placeholder={t('hero.placeholder')} />
                    <DropDown toggler={<span className={'flex items-center gap-2  border px-4 py-1 rounded-lg border-border bg-primary hover:bg-primary-hover '}>{t('hero.categories')} <IoIosArrowDown/> </span>} >
                        {
                            ['it', 'Cyber securiy', 'Secretariat'].map(e =>
                                <DropDown.Option key={e} onClick={() => setToUrl('category', e,searchParams,setSearchParams)}>{e}</DropDown.Option>)
                        }
                    </DropDown>
                </div>
           </div>
            <div className="hidden lg:flex self-end justify-center items-center">
                <img src="SVG/hero.svg" className=" w-3/4" alt="" />
            </div>
            <div className=" absolute top-0 left-0 w-full overflow-hidden leading-[0] ">
                <svg className="h-16 md:h-24 w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className=" fill-primary"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-primary"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className=" fill-background-secondary "></path>
                </svg>
            </div>
            <div className=" absolute rotate-180 md:top-[89.3%] top-[92%] left-0 w-full overflow-hidden leading-[0] ">
                <svg className="h-14 md:h-16 w-full" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity="1" className=" fill-primary animate-pulse"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-primary"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className=" fill-background-secondary"></path>
                </svg>
            </div>
        </div>
    )
}

export default Hero 