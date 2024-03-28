import { PiDotsThreeOutlineVerticalFill, PiX } from "react-icons/pi";
import {
  DropDown,
  SearchInput,
  InputField,
  Button,
  Switch,
  CheckBox,
  ViewControl,
  Modal,
} from "./components/ui";
import "./styles/App.css";
import { useState } from "react";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="p-5 space-y-3">
      <DropDown
        toggler={<PiDotsThreeOutlineVerticalFill />}
        togglerClassName="icon-button not-active"
      >
        <DropDown.Option isCurrent={true}>Option 1</DropDown.Option>
        <DropDown.Option>Option 2</DropDown.Option>
        <DropDown.Option>Option 3</DropDown.Option>
      </DropDown>
      <SearchInput placeholder="Search..." />
      <InputField placeholder="Email" />
      <Button>Do something</Button>
      <Button disabled={true}>Do something</Button>
      <Button isLoading={true}>Do something</Button>
      <Button size="small">Do something</Button>
      <Button size="large">Do something</Button>
      <Switch />
      <Switch checked={true} />
      <CheckBox />
      <CheckBox checked={true} />
      <ViewControl />
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        className="relative h-full w-full overflow-hidden sm:flex-row md:h-[90%] md:w-5/6 md:border lg:w-3/4"
      >
        <div className="absolute left-0 top-0 flex w-full justify-between border-b border-border bg-background-primary px-5 py-2 sm:left-[200px] sm:w-[calc(100%-200px)]">
          Modal
          <button
            className="icon-button  not-active small text-text-tertiary"
            onClick={() => setIsOpen(false)}
          >
            <PiX />
          </button>
        </div>
      </Modal>
    </div>
  );
}
