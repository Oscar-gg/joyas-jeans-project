import Link from "next/link";
import { api } from "~/utils/api";
import ValidImage from "../general/ValidImage";

export const LandingPageBrand = ({ brandId }: { brandId: string }) => {
  const { data: brandInfo } = api.get.getBrandById.useQuery({
    id: brandId,
  });

  // Pick an image from a model of the brand
  const { data: getModelImage } = api.get.getModelImageById.useQuery({
    brandId: brandId,
  });

  console.log(brandInfo?.image)

  return (
    brandInfo && (
      <div className="w-full max-w-xs px-4 py-4 transition duration-300 ease-in-out hover:scale-110 sm:w-1/2 md:w-1/4">
        <Link href={`/brand/${brandInfo.id}`}>
          <div className="card rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 justify-center text-xl font-semibold">
              SHOP {brandInfo.name}
            </h2>
            <ValidImage
              src={getModelImage?.image ?? brandInfo.image ?? ""}
              alt={`Modelo de ${brandInfo.name}}`}
            />
          </div>
        </Link>
      </div>
    )
  );
};
