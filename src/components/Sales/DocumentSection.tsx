import React from "react";

import { SectionsForm, Input, InputSelect } from "@/components";
import { getBranchOffice, getCurrency, filteredClients } from "@/services/data";

// TODO: refactor style input component
const DocumentSection = async ({
  branchOfficeSelected = "",
  branchOfficeQuery = "",
  clientQuery = "",
}: {
  branchOfficeQuery: string;
  branchOfficeSelected: string;
  clientQuery: string;
}) => {
  const data = await filteredClients(clientQuery);
  const { data: branchOffices } = await getBranchOffice(branchOfficeQuery);
  const { currency } = await getCurrency(Number(branchOfficeSelected));

  return (
    <SectionsForm
      title="Document"
      className="flex-col md:flex-row border rounded-lg lg:border-none p-6 lg:p-0"
    >
      <div className="flex gap-2 w-full flex-grow items-end">
        <InputSelect
          required
          label="Client"
          contentClassName="!w-full"
          name="client"
          listOptions={data}
        />
      </div>
      <InputSelect
        required
        label="Branch office"
        name="branchOffice"
        contentClassName="!w-full lg:w-auto"
        listOptions={branchOffices}
      />
      <Input
        readOnly
        label="Currency"
        name="currency"
        className="flex-1"
        contentClassName="!w-full lg:w-auto"
        value={currency}
      />
    </SectionsForm>
  );
};

export default DocumentSection;
