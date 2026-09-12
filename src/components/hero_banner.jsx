import { useEffect, useState } from "react";
import { Play } from "lucide-react";

function Hero_banner() {
    const [movie, set_movie] = useState(null);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/search/movie?query=ready or not&api_key=717ecabf3d83680c8967286c22eec4b9")
            .then(res => res.json())
            .then(data => {
                set_movie(data.results[0]);
            })
    }, []);

    if (!movie) {
        return (
            <div className="h-[90vh] flex items-center justify-center bg-black">
                <div><h1 className="">Yuklenir....</h1></div>
            </div>
        )
    }

    return (
        <div className="relative h-[90vh] text-white bg-black ">
            <img className="relative w-full h-full object-cover object-center object-top opacity-75 bg-gradient-to-t from-black to-transparent" src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
            <div className="flex flex-col absolute bottom-16 p-3 md:w-120 gap-3 z-10">
                <h1 className="font-bold text-5xl">{movie.name || movie.title}</h1>
                <div className="flex gap-2 items-center">
                    <span className="bg-yellow-500/35 border-2 border-yellow-500/30 p-1 rounded font-bold">IMDb: {movie.vote_average.toFixed(1)}</span>
                    <span className="bg-red-500/35 border-2 border-red-500/30 p-1 rounded font-bold">Son izlənilən</span>
                    <p>{(movie.release_date || movie.first_air_date)?.split("-")[0]}</p>
                </div>
                <p className="line-clamp-3">{movie.overview}</p>
                <div className="flex gap-3 mt-2">
                    <button className="flex gap-1 bg-white text-black p-3 font-bold rounded-md items-center"><Play className="w-5 h-5"></Play> Play</button>
                    <button className="bg-zinc-600 p-3 font-bold rounded-md">ⓘ More Info</button>
                </div>
            </div>
        </div>
    );

}

export default Hero_banner;
