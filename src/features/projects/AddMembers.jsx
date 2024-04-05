import { Modal } from "@/components/ui";

export default function AddMembers() {
  return (
    <Modal
      isOpen={true}
      className="p-5 sm:w-3/4 lg:w-1/2 md:border  sm:h-fit"
      closeOnBlur={false}
    >
      <div className="flex items-center">
        <h1 className="text-text-primary font-bold text-2xl mb-6">
          Add New Member
        </h1>
      </div>
    </Modal>
  );
}
