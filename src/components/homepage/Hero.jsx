import { Button } from "../ui/Button"
import { DropDown } from "../ui/DropDown"
import { SearchInput } from "../ui/SearchInput"

function Hero() {
    return (
        <div className="grid grid-cols-1 ">
           
            <div className="flex items-center gap-4">
                <SearchInput className='h' placeholder={'serach for a internship'} />
                <DropDown toggler={<Button >Categorie</Button>}>
                    <DropDown.Title>ggg</DropDown.Title>
                    <DropDown.Option>ggg</DropDown.Option>
                    <DropDown.Option>ggg</DropDown.Option>
                    <DropDown.Option>ggg</DropDown.Option>
                </DropDown>
                <Button >send</Button>
            </div>
          
        </div>
    )
}

export default Hero 