import { ArrowRight } from "lucide-react";

export default function Catalog() {
    const categories = [
        {
            id: 1,
            title: "Wholesome Breakfast",
            image: "/img/catalog/WholesomeBreakfast.png",
            size: "small",
        },
        {
            id: 2,
            title: "Organic Juices",
            image: "/img/catalog/OrganicJuices.png",
            size: "small",
        },
        {
            id: 3,
            title: "Dried & Fresh Fruits",
            image: "/img/catalog/DriedFreshFruits.png",
            size: "large",
        },
    ];

    return (
        <>
            <div className="catalog px-4 sm:px-6 lg:px-15 py-8 sm:py-12 lg:py-16 mt-8 sm:mt-12 lg:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6">

                    {/* Left Box */}
                    <div
                        className="
            lg:col-span-1
            p-8 sm:p-10 lg:p-12
            pt-8 sm:pt-10 lg:pt-18
            rounded-2xl sm:rounded-3xl
            flex flex-col
            justify-between
            min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]
            relative
            overflow-hidden
          "
                        style={{
                            backgroundImage: "url('/img/catalog/OrganicNuts.png')",
                            backgroundSize: "cover",
                            backgroundPosition: "right",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0" />

                        {/* Content */}
                        <div className="relative z-10 text-black">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                                It's your first time?
                            </h2>
                            <p className="text-base sm:text-lg text-black/90 lg:mb-10 mb-8">
                                Discover our categories!
                            </p>

                            <button className="
            group
            relative
            z-10
            inline-flex
            items-center
            gap-2
            px-6
            sm:px-8
            py-3
            sm:py-4
            bg-black
            text-white
            font-semibold
            rounded-full
            hover:bg-gray-900
            transition-all
            duration-300
            active:scale-95
            w-fit
            shadow-lg
            hover:shadow-xl
          ">
                                <span>Organic Nuts</span>
                                <ArrowRight
                                    size={20}
                                    className="group-hover:translate-x-1 transition-transform duration-300"
                                />
                            </button>
                        </div>

                    </div>

                    {/* Middle Column */}
                    <div className="lg:col-span-1 space-y-5 sm:space-y-6">
                        {categories.slice(0, 2).map((category) => (
                            <div
                                key={category.id}
                                className="
                relative
                rounded-2xl
                sm:rounded-3xl
                overflow-hidden
                h-[220px]
                sm:h-[260px]
                lg:h-[290px]
                group
                cursor-pointer
              "
                                style={{
                                    backgroundImage: `url('${category.image}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                {/* Overlay */}
                                <div className="absolute inset-0 transition-all duration-300" />

                                {/* Content - Centered */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <button className="
                  group/btn
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  sm:px-8
                  py-3
                  sm:py-4
                  bg-black
                  text-white
                  font-semibold
                  rounded-full
                  hover:bg-gray-900
                  transition-all
                  duration-300
                  active:scale-95
                  shadow-lg
                  hover:shadow-xl
                ">
                                        <span>{category.title}</span>
                                        <ArrowRight
                                            size={20}
                                            className="group-hover/btn:translate-x-1 transition-transform duration-300"
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Box */}
                    <div
                        className="
            lg:col-span-1
            relative
            rounded-2xl
            sm:rounded-3xl
            overflow-hidden
            min-h-[400px]
            sm:min-h-[500px]
            lg:min-h-[600px]
            group
            cursor-pointer
          "
                        style={{
                            backgroundImage: `url('${categories[2].image}')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        {/* Overlay */}
                        <div className="absolute inset-0 transition-all duration-300" />

                        {/* Content - Centered */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button className="
              group/btn
              inline-flex
              items-center
              gap-2
              px-6
              sm:px-8
              py-3
              sm:py-4
              bg-black
              text-white
              font-semibold
              rounded-full
              hover:bg-gray-900
              transition-all
              duration-300
              active:scale-95
              shadow-lg
              hover:shadow-xl
            ">
                                <span>{categories[2].title}</span>
                                <ArrowRight
                                    size={20}
                                    className="group/btn:hover:translate-x-1 transition-transform duration-300"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
{/*
            <button className="
              mt-6
              sm:mt-8
              group
              w-full
              border border-black
              rounded-full
              flex items-center
              justify-between
              pl-4
              sm:pl-6
              pr-2
              py-2
              sm:py-3
              transition-all
              duration-300
              ease-out
              hover:bg-black
              hover:text-white
              hover:shadow-lg
              hover:shadow-black/20
              active:scale-95
            ">
                <span className="text-sm sm:text-base font-bold tracking-tight">
                    Newsletter
                </span>

                <div className="
                w-10
                sm:w-12
                h-10
                sm:h-12
                rounded-full
                bg-black
                flex items-center
                justify-center
                group-hover:bg-white
                transition-all
                duration-300
                group-hover:scale-110
                flex-shrink-0
              ">
                    <ArrowRight
                        className="
                    text-white
                    group-hover:text-black
                    transition-all
                    duration-300
                    group-hover:translate-x-1
                  "
                        size={20}
                        strokeWidth={2.5}
                    />
                </div>
            </button>
*/}
        </>
    );
}