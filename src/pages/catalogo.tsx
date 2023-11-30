import { Layout } from "~/components/layout/Layout";

import { useState } from "react";

import { SearchBar } from "~/components/general/SearchBar";
import { ModelTable } from "~/components/table/ModelTable";
import { ColorTable } from "~/components/table/ColorTable";

import { FitTable } from "~/components/table/FitTable";
import { ProductTable } from "~/components/table/ProductTable";

export default function CatalogoPage() {
  const [search, setSearch] = useState("");

  return (
    <Layout>
      <div className="flex w-full flex-col flex-wrap items-center align-middle">
        <div className="my-4 flex w-[80%] flex-row flex-wrap items-center justify-center gap-x-2 gap-y-3">
          <p>Busca en nuestro catálogo:</p>
          <SearchBar setSearch={setSearch} className="w-80" />
        </div>
      </div>
      <PageContent search={search} />
    </Layout>
  );
}

const PageContent = ({ search }: { search: string }) => {
  return (
    <div className="justify-center text-center text-2xl">
      <ProductTable search={search} edit={false} />
    </div>
  );
};
