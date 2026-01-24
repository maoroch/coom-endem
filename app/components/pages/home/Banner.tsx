import Link from "next/link";

export default function Banner() {
    return (
        <div className="banner 2xl:h-200 lg:h-150 items-center flex px-15 bg-[url('/img/banner/banner.png')] bg-cover bg-center">
            <div className="content md:w-1/2 w-full">
                <h1 className="lg:text-6xl text-3xl">Organic products for your health</h1>
                <p className="mt-5 text-lg">Fresh, natural and certified products for your health<br /> and nature care</p>
                <button className="mt-5 btn btn-black px-8 py-4 bg-black text-white rounded-full"><Link href="/products">See products</Link></button>
            </div>
        </div>
    );
}
