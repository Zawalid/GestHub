import { IoIosArrowDown } from "react-icons/io";
import { Button } from "../ui/Button"
import { DropDown } from "../ui/DropDown"
import { SearchInput } from "../ui/SearchInput"
import { useSearchParams } from "react-router-dom"
import {useTranslation}from 'react-i18next'
function Hero() {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("search") || "";
    const {t}=useTranslation()
    function setToUrl(prop, val) {
        searchParams.set(prop, val)
        setSearchParams(searchParams) 
    }
    return (
        <div className="grid grid-cols-2 pt-10 bg-background-secondary lg:px-24">
            <div className="flex flex-col pb-10">
                <div className="p-4 mb-10">
                    <h1 className="text-5xl text-text-primary mb-6 leading-[65px]">{t('hero.title1')} <span className=" font-extrabold text-secondary hover:text-secondary-hover"> {t('hero.title2')} </span>  {t('hero.title3')}</h1>
                    <p className="text-text-secondary">{t('hero.paragraph')}</p>
                </div>
                <div className="flex items-center gap-4 p-4">
                    <SearchInput onChange={(query) => {
                        searchParams.set('search', query)
                        setSearchParams(searchParams)
                    }} query={query} className='h' placeholder={t('hero.placeholder')} />
                    <DropDown toggler={<Button className={'flex items-center gap-2'}>{t('hero.categories')} <IoIosArrowDown/> </Button>} >
                        <DropDown.Option onClick={()=>setToUrl('category','it')}>It </DropDown.Option>
                        <DropDown.Option onClick={()=>setToUrl('category','Cyber securiy')} >Cyber security</DropDown.Option>
                        <DropDown.Option onClick={()=>setToUrl('category','Secretariat')}>Secretariat</DropDown.Option>
                    </DropDown>
                </div>
           </div>
            <div className="flex self-end justify-center items-center">
                <img src="SVG/hero.svg" className=" w-3/4" alt="" />
            </div>
        </div>
    )
}

export default Hero 