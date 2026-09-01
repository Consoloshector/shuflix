import { useNavigate, useParams } from "react-router-dom";
import { MOVIE_IDS } from "./IDS/MOVIE_IDS";
import { useEffect, useState } from "react";

export default function MovieDetail() {
    const { id } = useParams()
    const [clicked_film, setClicked_film] = useState(null);
    const navigate = useNavigate();

    const movie_id = MOVIE_IDS.map((item) => item.id);
    const isAllowed = movie_id.includes(Number(id))
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=717ecabf3d83680c8967286c22eec4b9`)
            .then((res) => res.json())
            .then((data) => setClicked_film(data))

    }, [id, isAllowed])

    if (!isAllowed) {
        return (
            <div className="h-[90vh] flex items-center justify-center bg-black">
                <div className="flex flex-col text-center text-white gap-3">
                    <h1 className="text-xl">Mən bu filmi izləməmişəm</h1>
                    <button className="bg-red-600 px-3 py-1 rounded-xl" onClick={() => navigate("/")}>Geri qayıt!</button>
                </div>
            </div>
        )
    }

    if (!clicked_film) {
        return (
            <div className="h-[90vh] flex items-center justify-center bg-black">
                <div><h1 className="text-white">Yuklenir....</h1></div>
            </div>
        )
    }

    return (
        <div className="relative flex w-full min-h-[90vh] bg-black">
            <button className="absolute top-5 left-5 text-white bg-zinc-600 px-2 rounded-xl flex items-center z-12 cursor-pointer hover:bg-red-600" onClick={() => navigate(-1)}>← Geri</button>
            <img className="absolute inset-0 w-full h-full object-cover" src={`https://image.tmdb.org/t/p/w1280${clicked_film.backdrop_path}`} alt={clicked_film.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="relative z-10 max-w-5xl flex flex-col pt-5 text-zinc-300 text-sm items-center gap-4
            sm:flex-row sm:mx-auto">
                <img className=" max-w-[200px] max-h-[300px] mt-10 object-cover rounded-2xl
                md:max-w-[250px] md:max-h-[350px] sm:mt-0 lg:max-w-[350px] lg:max-h-[450px]" src={`https://image.tmdb.org/t/p/w500${clicked_film.poster_path}`} alt="" />
                <div className="flex flex-col items-center text-center gap-3 px-5
                sm:text-left sm:items-start">
                    <h1 className="font-bold text-2xl text-white
                    lg:text-5xl">{clicked_film.title}</h1>
                    <div className="flex gap-1 
                    sm:text-lg items-center"><p className="bg-red-500/35 border-2 border-red-500/30 p-1 rounded">{clicked_film.release_date?.split("-")[0]}</p>●
                        <p className="bg-green-500/35 border-2 border-green-500/30 p-1 rounded"> {Math.floor(clicked_film.runtime / 60)}s {clicked_film.runtime % 60}dq</p></div>
                    <div className="flex gap-2">
                        {clicked_film.genres?.slice(0, 3).map((genre) => (
                            <p key={genre.id} className="flex items-center bg-red-600 px-3 py-1 first:rounded-l-lg last:rounded-r-lg">
                                {genre.name}
                            </p>
                        ))}
                    </div>
                    <p className="lg:text-xl p-2">{clicked_film.overview}</p>
                </div>
            </div>
        </div>
    )
}