import { PiX } from "react-icons/pi";
import { useForm } from "../../hooks/useForm";
import { Button, Modal } from "../ui";

function Login({ isOpen, onClose }) {
  const {
    formOption: { onSubmit },
    FormInputs,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    fields: [
      {
        name: "email",
        type: "email",
        label: "Email Address",
      },
      {
        name: "password",
        type: "password",
        label: "Password",
      },
    ],
    submit: (data) => console.log(data),
    gridLayout: false,
  });
  return (
    <Modal isOpen={isOpen} className={"w-full h-full md:w-1/2  md:h-fit"}>
      <div className="relative flex flex-col  p-10 space-y-4 ">
        <button
          className="icon-button absolute right-2 top-2 not-active small text-text-tertiary"
          onClick={onClose}
        >
          <PiX />
        </button>
        <h1 className="text-text-primary text-4xl">
          Welcome to <span className="text-secondary">MenStage</span>
        </h1>
        <FormInputs />
        <Button onClick={onSubmit}>Login</Button>
      </div>
    </Modal>
  );
}

export default Login;
