import Link from "next/link";
import Image from "next/image";
export default function ProductCatalog() {
    return (
        <div className="product-catalog px-15 py-8 mt-8">
            <div className="info mb-8 flex-between flex">
                <div className="first-info">
                                    <h2 className="text-4xl">Product Catalog</h2>
                <p className="text-lg mt-2">
                    Discover our range of organic products, carefully sourced and crafted to delight your senses.
                </p>
                </div>
                <div className="secound-info flex justify-end items-center xl:w-1/1">
                    <Link href="/shop" className="text-lg font-semibold">
                        View All Products <span className="text-black-500">→</span>
                    </Link>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {/* Product items will be rendered here */}
                <div className="product-item">
                    <div className="img">
                        <Image src="/img/home/products/1.png" width={500} height={500} alt="Organic Chocolate Cake Slice" />
                    </div>
                    <div className="star mt-4 flex items-center">
                        <Image src="/icons/star.svg" alt="Star" width={20} height={20} />
                        <span className="ml-2 text-sm font-medium">4.9 (120 Reviews)</span>
                    </div>
                    <h3 className="text-lg font-semibold mt-1">Organic Chocolate Cake Slice</h3>
                    <p className="text-sm">
                        A rich and decadent chocolate cake made with organic ingredients.
                    </p>
                    <span className="text-sm font-bold">$4.99</span>
                </div>
                <div className="product-item">
                    <div className="img">
                        <Image src="/img/home/products/2.png" width={500} height={500} alt="Almond Milk with Chia & Blueberries" />
                    </div>
                    <div className="star mt-4 flex items-center">
                        <Image src="/icons/star.svg" alt="Star" width={20} height={20} />
                        <span className="ml-2 text-sm font-medium">4.8 (100 Reviews)</span>
                    </div>
                    <h3 className="text-lg font-semibold mt-1">Almond Milk with Chia & Blueberries</h3>
                    <p className="text-sm">
                        A creamy almond milk infused with chia seeds and blueberries.
                    </p>
                    <span className="text-sm font-bold">$5.99</span>
                </div>
                <div className="product-item">
                    <div className="img">
                        <Image src="/img/home/products/3.png" width={500} height={500} alt="Fresh Organic Strawberries" />
                    </div>
                    <div className="star mt-4 flex items-center">
                        <Image src="/icons/star.svg" alt="Star" width={20} height={20} />
                        <span className="ml-2 text-sm font-medium">4.7 (80 Reviews)</span>
                    </div>
                    <h3 className="text-lg font-semibold mt-1">Fresh Organic Strawberries</h3>
                    <p className="text-sm">
                        Juicy and sweet organic strawberries, perfect for snacking or desserts.
                    </p>
                    <span className="text-sm font-bold">$6.99</span>
                </div>
                <div className="product-item">
                    <div className="img">
                        <Image src="/img/home/products/4.png" width={500} height={500} alt="Buttery Croissants with Almonds" />
                    </div>
                    <div className="star mt-4 flex items-center">
                        <Image src="/icons/star.svg" alt="Star" width={20} height={20} />
                        <span className="ml-2 text-sm font-medium">4.6 (60 Reviews)</span>
                    </div>
                    <h3 className="text-lg font-semibold mt-1">Buttery Croissants with Almonds</h3>
                    <p className="text-sm">
                        Flaky and buttery croissants filled with almond paste and topped with sliced almonds.
                    </p>
                    <span className="text-sm font-bold">$5.49</span>
                </div>
            </div>
        </div>
    );
}
