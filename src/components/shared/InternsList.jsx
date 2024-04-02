import { useInterns } from "@/services/queries";
import { TableLayout } from "./TableLayout";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import {
  useAddIntern,
  useDeleteIntern,
  useUpdateIntern,
} from "@/services/mutations";

export default function InternsList() {
  const [parent] = useAutoAnimate({ duration: 300 });
  const { interns, isLoading, error } = useInterns();
  const { mutate: addIntern } = useAddIntern();
  const { mutate: updateIntern } = useUpdateIntern();
  const { mutate: deleteIntern } = useDeleteIntern();

  return (
    <div className="flex h-full gap-5 flex-col">
      <TableLayout
        data={interns}
        isLoading={isLoading}
        error={error}
        columns={[
          { label: "id", visible: true },
          { label: "First Name", visible: true },
          { label: "Last Name", visible: true },
          { label: "Email", visible: true },
          { label: "Phone", visible: true },
          { label: "Birthday", visible: true },
        ]}
        formOptions={{
          defaultValues: {},
          fields: [
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
              name: "birthday",
              label: "Birthday",
              type: "date",
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
          ],
          onSubmit: () => {},
          resetToDefault: true,
          submitButtonText: "",
          heading: "",
          isOpen: false,
        }}
        confirmOptions={{
          isOpen: false,
          message: "",
          title: "",
          confirmText: "Delete",
          onConfirm: () => {},
        }}
        csvConfig={{
          filename: "Interns",
          columnHeaders: [
            { key: "id", displayLabel: "ID" },
            { key: "firstName", displayLabel: "First Name" },
            { key: "lastName", displayLabel: "Last Name" },
            { key: "email", displayLabel: "Email" },
            { key: "phone", displayLabel: "Phone" },
            { key: "birthday", displayLabel: "Birthday" },
          ],
        }}
        pdfConfig={{
          filename: "Interns.pdf",
          tableHeaders: [
            "ID",
            "First Name",
            "Last Name",
            "Email",
            "Phone",
            "Birthday",
          ],
        }}
      >
        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-5 justify-between">
          <div className="flex justify-between sm:justify-normal items-center gap-3">
            <TableLayout.Search />
            <div className="flex gap-3">
              <TableLayout.Filter />
              <TableLayout.View />
            </div>
          </div>
          <div className="flex justify-between items-center gap-3">
            <TableLayout.Download />
            <TableLayout.NewRecord onAdd={addIntern} />
          </div>
        </div>
        <div
          className="relative overflow-hidden flex-1 flex flex-col shadow-md rounded-lg border border-border"
          ref={parent}
        >
          <TableLayout.Table
            actions={
              <TableLayout.Actions
                onUpdate={updateIntern}
                onDelete={deleteIntern}
              />
            }
          />
          <TableLayout.TableRecord />
          <TableLayout.Pagination />
          <TableLayout.DeleteConfirmation />
        </div>
      </TableLayout>
    </div>
  );
}
