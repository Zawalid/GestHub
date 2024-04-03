import { useSupervisors } from "@/services/queries";
import {
  useAddSupervisor,
  useDeleteSupervisor,
  useUpdateSupervisor,
} from "@/services/mutations";
import TableLayout from "@/layouts/TableLayout";

export default function SupervisorsList() {
  const { supervisors, isLoading, error } = useSupervisors();
  const { mutate: addSupervisor } = useAddSupervisor();
  const { mutate: updateSupervisor } = useUpdateSupervisor();
  const { mutate: deleteSupervisor } = useDeleteSupervisor();

  return (
    <div className="flex h-full gap-5 flex-col">
      <TableLayout
        data={supervisors}
        resourceName="Supervisor"
        isLoading={isLoading}
        error={error}
        columns={[
          { key: "id", displayLabel: "ID", visible: true, type: "number" },
          {
            key: "firstName",
            displayLabel: "First Name",
            visible: true,
            type: "string",
          },
          {
            key: "lastName",
            displayLabel: "Last Name",
            visible: true,
            type: "string",
          },
          {
            key: "email",
            displayLabel: "Email",
            visible: true,
            type: "string",
          },
          {
            key: "phone",
            displayLabel: "Phone",
            visible: true,
            type: "string",
          },
          {
            key: "department",
            displayLabel: "Department",
            visible: true,
            type: "string",
          },
        ]}
        formFields={[
          {
            name: "firstName",
            label: "First Name",
          },
          {
            name: "lastName",
            label: "Last Name",
          },
          {
            name: "email",
            type: "email",
            label: "Email Address",
          },
          {
            name: "phone",
            label: "Phone Number",
          },
          {
            name: "department",
            label: "Department",
          },
          {
            name: "password",
            type: "password",
            label: " Password",
          },
          {
            name: "confirmPassword",
            type: "password",
            label: "Confirm  Password",
            confirmPassword: true,
            passwordField: "password",
          },
        ]}
        fieldsToSearch={["firstName","lastName","email","department"]}
        downloadOptions={{
          csvFileName: "Supervisors",
          pdfFileName: "Supervisors",
        }}
        onAdd={addSupervisor}
        onUpdate={updateSupervisor}
        onDelete={deleteSupervisor}
      />
    </div>
  );
}
