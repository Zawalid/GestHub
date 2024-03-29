import { Button, InputField, Modal } from "../ui"
import { IoCloseSharp } from "react-icons/io5";

function Login({setIsSignInOpen,isSignInOpen}) {
    return (
        <Modal isOpen={isSignInOpen} className={"w-full h-full md:w-1/2  md:h-fit"}  >
            <div className="relative flex flex-col p-10 space-y-4 ">
                <span className="text-black self-end text-2xl cursor-pointer absolute top-0 right-0 p-3" onClick={()=>setIsSignInOpen(false)}><IoCloseSharp/></span>
                <h1 className=" text-text-primary text-4xl leading-[80px]">Welcome to MenStage</h1>
                <p className="text-text-secondary">Entre Your email</p>
                <InputField placeholder='Your email'/>
                <p className="text-text-secondary">Entre Your password</p>
                <InputField placeholder='Your Password'/>
                <Button >Login</Button>
            </div>
        </Modal>
    )
}

export default Login
