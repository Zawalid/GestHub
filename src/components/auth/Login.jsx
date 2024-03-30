import { Button, InputField, Modal } from "../ui"
import {  PiX } from "react-icons/pi";
import {useTranslation} from 'react-i18next'
function Login({ setIsSignInOpen, isSignInOpen }) {
    const {t}=useTranslation()
    return (
        <Modal isOpen={isSignInOpen} className={"w-full h-full md:w-1/2  md:h-fit"}>
            <div className="relative flex flex-col p-5 md:p-10 space-y-4 ">
                <button className="icon-button not-active text-text-tertiary absolute top-0 right-0 m-2 small" onClick={()=>setIsSignInOpen(false)} >
                     <PiX />
                </button>
                <h1 className=" text-text-primary text-4xl leading-[50px] md:leading-[80px]">{t('auth.login.title') }</h1>
                <InputField label={t('auth.login.email.label') } name='email' placeholder={t('auth.login.email.placeholder')} />
                <InputField label={t('auth.login.password.label') } name='password' placeholder={t('auth.login.password.placeholder')} />
                <Button >{t('auth.login.submit')} </Button>
            </div>
        </Modal>
    )
}

export default Login
