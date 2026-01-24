import Banner from "@/app/components/pages/home/Banner";
import LinkingWords from "@/app/components/pages/home/LinkingWords";
import ProductCatalog from "@/app/components/pages/home/ProductCatalog";

export default function Home() {
  return (
    <>
      <main>
        <Banner />
        <LinkingWords />
      </main>
      <ProductCatalog />
    </>
  );
}