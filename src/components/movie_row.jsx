import { useEffect, useState } from "react";
import { MOVIE_IDS } from "./IDS/MOVIE_IDS";
import { Link } from "react-router-dom";
import { useScrollRow } from "./hooks/useScrollRow";

export default function MovieRow({ title }) {

    const [movies, setMovie] = useState([]);
    const { rowRef, handleScroll } = useScrollRow()

    useEffect(() => {
        const limitedIds = MOVIE_IDS.slice(0, 9);
        const request = limitedIds.map((item) => (
            fetch(`https://api.themoviedb.org/3/movie/${item.id}?api_key=717ecabf3d83680c8967286c22eec4b9`)
                .then((res) => res.json())
                .then(data => ({
                    ...data,
                    rating: item.rating
                }))
        ))
        Promise.all(request).then((data) => { setMovie(data) })
    }, [])

    return (
        <div className="relative flex flex-col w-full bg-[#000000] p-6 gap-4 text-white">
            <div className="flex w-full items-center justify-between">
                <h1 className="font-bold px-2 border-l-4 border-red-600 text-xl">{title}</h1>
                <Link to={`/media_more/movie`} className="font-bold px-2 border-r-4 bg-black">daha cox</Link>
            </div>

            <button onClick={() => handleScroll("left")} className="absolute hidden z-20 top-1/2 left-2 bg-black hover:bg-red-600 p-3 rounded-full sm:block">❮</button>
            <button onClick={() => handleScroll("right")} className="absolute hidden z-20 top-1/2 right-2 bg-black hover:bg-red-600 p-3 rounded-full sm:block">❯</button>
            <div ref={rowRef} className="flex gap-4 overflow-x-auto scrollbar-none">
                {movies.map((movie) => (
                    <Link key={movie.id} to={`/movie/${movie.id}`}>
                        <div className="relative flex flex-col min-w-[200px] min-h-[300px] border-1 border-zinc-800/80 rounded-lg">
                            <img className="w-full rounded-lg" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
                            <span className={`absolute top-2 right-2 text-white font-bold text-xs px-2 py-1 rounded ${movie.rating > 8.9 ? "bg-emerald-600" :
                           movie.rating>7.9 ?"bg-green-600" : movie.rating > 6 ? "bg-amber-600" : "bg-rose-600"
                            }`}>
                            ★ {movie.rating}
                        </span>
                            <div className="absolute w-full bottom-0 px-2 font-medium bg-gradient-to-t from-black to-transparent">
                                <p className="">{movie.title}</p>
                                <p>{movie.release_date?.split("-")[0]}</p>
                            </div>
                        </div>

                    </Link>

                ))}
            </div>
        </div>
    )
}