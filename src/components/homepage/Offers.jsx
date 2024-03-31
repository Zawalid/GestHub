import { useState } from 'react'
import { CiLocationOn } from "react-icons/ci";

const ofers = [
    {title:'devlopper backend',description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga perferendis et quam nostrum assumenda, consequuntur cum suscipit ut aliquam, possimus, harum ullam repellat animi rem iste ex ipsam inventore porro.",date:'12/12/2023',ville:'rabat'},
    {title:'devlopper frontend',description:'react',date:'12/12/2023',ville:'sale'},
    {title:'engineer devops',description:'ci/cd',date:'12/12/2023',ville:'rabat'},
    {title:'a ',description:'laravel',date:'12/12/2023',ville:'rabat'},
]

function Offers() {
    const [offers,setOffers]=useState(ofers)
    return (
        <div className="p-4 py-10 bg-background-secondary">
            <h1 className="text-text-primary font-bold text-3xl border-b-2 w-fit pb-4 border-text-secondary">Offres de stage recentes</h1>
            <div>
                
            </div>
            <div className="text-text-primary grid grid-cols-2 gap-4 my-5">
                {offers.map(e=><OfferCard key={e} offer={e}/>)}
            </div>
        </div>
    )
}

export default Offers


function OfferCard({offer}) {
    const { title, description,date,ville} = offer
    return (
        <div className=" relative border  p-2 space-y-2">
            <p className=" font-bold ">{title}</p>
            <span className=" text-sm absolute z-10 top-0 right-0 px-1 text-text-secondary">{date }</span>
            <p>{description.slice(0, 100)}...</p>
            <p className="flex items-center gap-2"><CiLocationOn className="text-xlg" />{ville}</p>
            <div className="flex justify-end">
                <span className="bg-green-600 px-1 rounded-[3px] text-xs font-bold"> 6 mois</span>
            </div>
        </div>
    )
}