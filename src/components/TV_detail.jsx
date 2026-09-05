import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TV_IDS } from "./IDS/TV_IDS";

export default function TvDetail() {
    const { id } = useParams();
    const [clicked_movie, setClicked_movie] = useState(null);
    const navigate = useNavigate();

    const tv_id = TV_IDS.map((item) => item.id);
    const isAllowed = tv_id.includes(Number(id));
    useEffect(() => {
        window.scrollTo(0, 0)
        if (!isAllowed) {
            return
        }
        Promise.all([fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=717ecabf3d83680c8967286c22eec4b9&language=tr-TR`),
        fetch(`https://api.themoviedb.org/3/tv/${id}/aggregate_credits?api_key=717ecabf3d83680c8967286c22eec4b9&language=tr-TR`)])
            .then(([resTv, resCredits]) => Promise.all([resTv.json(), resCredits.json()]))
            .then(([tv_data, credits_data]) => {
                setClicked_movie({
                    ...tv_data,
                    cast: credits_data?.cast?.slice(0, 10)
                })
            });
    }, [id, isAllowed]);


    if (!isAllowed) {
        return (
            <div className="h-[90vh] flex items-center justify-center bg-black">
                <div className="flex flex-col text-center text-white gap-3">
                    <h1 className="text-xl">Mən bu serialı izləməmişəm</h1>
                    <button className="bg-red-600 px-3 py-1 rounded-xl" onClick={() => navigate("/")}>Geri qayıt!</button>
                </div>
            </div>
        )
    }


    if (!clicked_movie) {
        return (
            <div className="h-[90vh] flex items-center justify-center bg-black">
                <div><h1 className="">Yuklenir....</h1></div>
            </div>
        )
    }

    const full_episodes = clicked_movie.seasons?.filter((season) => season.season_number > 0).reduce((total, season) => total + season.episode_count, 0);

    return (
        <div className="relative flex flex-col w-full min-h-[90vh] bg-black">
            <button className="absolute top-5 left-5 text-white bg-zinc-600 px-2 rounded-xl flex items-center z-12 cursor-pointer hover:bg-red-600" onClick={() => navigate(-1)}>← Geri</button>
            <img className="absolute inset-0 w-full h-full opacity-[0.5] object-cover" src={`https://image.tmdb.org/t/p/w1280${clicked_movie.backdrop_path}`} alt={clicked_movie.name} />
            <div className="absolute bg-gradient-to-t from-black to-transparent inset-0"></div>
            <div className="relative z-10 max-w-5xl flex flex-col pt-5 text-zinc-300 text-sm items-center gap-4
            sm:flex-row sm:mx-auto">
                <img className=" max-w-[200px] max-h-[300px] mt-10 object-cover rounded-2xl
                md:max-w-[250px] md:max-h-[350px] sm:mt-0 lg:max-w-[350px] lg:max-h-[450px]" src={`https://image.tmdb.org/t/p/w500${clicked_movie.poster_path}`} alt="" />
                <div className="flex flex-col items-center text-center gap-3 px-5
                sm:text-left sm:items-start">
                    <h1 className="font-bold text-2xl text-white
                    lg:text-5xl">{clicked_movie.name}</h1>
                    <div className="flex gap-1 
                    sm:text-lg"><p>{clicked_movie.first_air_date?.split("-")[0]}</p><p> ● {clicked_movie.number_of_seasons} Mövsüm</p><p> ● {full_episodes} bölüm</p></div>
                    <div className="flex gap-2">
                        {clicked_movie.genres?.slice(0, 3).map((genre, index, arr) => (
                            <p key={genre.id} className="flex items-center bg-red-600 px-3 py-1 first:rounded-l-lg last:rounded-r-lg">
                                {genre.name}
                            </p>
                        ))}
                    </div>
                    <p className="lg:text-xl">{clicked_movie.overview}</p>
                </div>
            </div>
            {clicked_movie.cast?.length > 0 && (
                <div className="relative z-10 max-w-5xl w-full mx-auto px-5 py-6">
                    <h2 className="text-xl font-bold text-white mb-4">Oyuncular</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thumb-olive-100">
                        {clicked_movie.cast.map((actor) => (
                            <div key={actor.id} className="min-w-[100px] text-center flex flex-col items-center">
                                <img
                                    className="w-20 h-20 rounded-full object-cover border-2 border-zinc-700 mb-2 bg-zinc-800"
                                    src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"}
                                    alt={actor.name}
                                />
                                <p className="text-white font-semibold text-xs line-clamp-1">{actor.name}</p>
                                <p className="text-zinc-400 text-[10px] line-clamp-1">{actor.roles?.[0]?.character || actor.character || "—"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}