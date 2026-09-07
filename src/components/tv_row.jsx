import { data, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { TV_IDS } from "./IDS/TV_IDS";
import { useScrollRow } from "./hooks/useScrollRow";

export default function TvRow({ title }) {
    const [Tvmovies, setTvMovie] = useState([]);
    const { rowRef, handleScroll } = useScrollRow();

    useEffect(() => {
        const limitedIds = TV_IDS.slice(0, 6);
        const request = limitedIds.map((item) =>
            fetch(`https://api.themoviedb.org/3/tv/${item.id}?api_key=717ecabf3d83680c8967286c22eec4b9`)
                .then(res => res.json())
                .then(data => ({
                    ...data,
                    rating: item.rating
                }))
        );

        Promise.all(request).then((data) => {
            setTvMovie(data);
        });
    }, []);

    return (
        <div className="relative flex flex-col w-full gap-4 bg-[#000000] p-6 text-white">

            <div className="flex w-full justify-between items-center ">
                <h1 className="font-bold px-2 border-l-4 border-red-600 text-xl">{title}</h1>
                <Link to={`/media_more/tv`} className="font-bold px-2 border-r-4 bg-black">daha cox</Link>
            </div>

            <button
                onClick={() => handleScroll("left")}
                className="absolute hidden left-2 top-1/2  z-20 bg-black hover:bg-red-600 p-3 rounded-full sm:block"
            >
                ❮
            </button>

            <button
                onClick={() => handleScroll("right")}
                className="absolute hidden right-2 top-1/2 z-20 bg-black hover:bg-red-600 p-3 rounded-full sm:block"
            >
                ❯
            </button>

            <div ref={rowRef} className="flex overflow-x-auto gap-4 sm:overflow-x-auto sm:[scrollbar-width:none] sm:flex-row sm:gap-3">
                {Tvmovies.map((Tvmovie) => (
                    <Link key={Tvmovie.id} to={`/tv/${Tvmovie.id}`} className="block min-w-[35%] shrink-0">
                        <div className="relative shadow-lg border-2 border-zinc-800/90 rounded-xl ">
                            <img className="w-full h-[160px] sm:h-[180px] md:h-[250px] lg:h-[300px] rounded-xl opacity-[0.8] transition-all duration-300 hover:opacity-[0.6] cursor-pointer" src={`https://image.tmdb.org/t/p/w780${Tvmovie.backdrop_path}`} alt={Tvmovie.name} />
                            <span className={`absolute top-2 right-2 text-white font-bold text-xs px-2 py-1 rounded ${Tvmovie.rating > 8.9 ? "bg-emerald-600" :
                                Tvmovie.rating > 7.9 ? "bg-green-600" : Tvmovie.rating > 6 ? "bg-amber-600" : "bg-rose-600"
                                }`}>
                                ★ {Tvmovie.rating}
                            </span>
                            <div className="flex absolute bottom-3 justify-between w-full px-3">
                                <div className="flex flex-col text-sm">
                                    <span className="font-bold text-2xl">{Tvmovie.name}</span>
                                    <div className="flex gap-1"><p>{Tvmovie.first_air_date?.split("-")[0]}</p><p> ● {Tvmovie.number_of_seasons} Mövsüm</p></div>
                                </div>
                                <p className="bg-red-700 self-end p-1 rounded font-bold text-xs">{Tvmovie.genres?.[0]?.name}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
}