import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { TV_IDS } from "./IDS/TV_IDS"
import { MOVIE_IDS } from "./IDS/MOVIE_IDS";

export default function MediaMore() {
    const [mediaMore, setMediaMore] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const { type } = useParams()
    const navigate = useNavigate();

    const movie_id = MOVIE_IDS.map((item) => item.id);
    const tv_id = TV_IDS.map((item) => item.id);
    const istv = type === "tv";
    const ids = istv ? TV_IDS : MOVIE_IDS;

    useEffect(() => {
        window.scrollTo(0, 0);
        setMediaMore([]);

        if (!ids?.length) return

        const request = ids.map((item) => (
            fetch(`https://api.themoviedb.org/3/${type}/${item.id}?api_key=717ecabf3d83680c8967286c22eec4b9`)
                .then((res) => res.json())
                .then((data) => ({
                    ...data,
                    rating: item.rating
                }))
        ))

        Promise.all(request).then((data) => { setMediaMore(data) })

    }, [type]);

    if (mediaMore.length === 0) {
        return (
            <div className="h-[100vh] flex items-center justify-center bg-black">
                <div><h1 className="text-white">Yuklenir....</h1></div>
            </div>
        )
    }

    const filteredmedia = mediaMore.filter((media) => {
        const titleName = media.name || media.title || "";
        return titleName.toLowerCase().includes(searchQuery.toLowerCase())
    })

    return (
        <div className="bg-black w-full min-h-[100vh] text-white py-3">
            <div className="flex flex-col gap-2 p-4">
                <button className="absolute top-2 left-3 text-white bg-zinc-600 px-2 rounded-xl flex items-center z-50 cursor-pointer hover:bg-red-600" onClick={() => navigate(-1)}>← Geri</button>
                <div className="flex flex-col gap-2 mt-3">
                    <h1 className="font-bold px-2 border-l-4 border-red-600 text-3xl"> {istv ? "Bütün seriallar" : "Bütün filmler"} </h1>
                    <p className="px-2 text-zinc-300">Kolleksiyamdakı bütün {`${istv?"serialları":"filmləri"}`} kəşf edin</p>
                </div>
                <div className="flex items-center px-3 py-1 gap-1 border-1 border-zinc-600 rounded-lg gap-2 bg-zinc-900">
                    <Search className='w-4 h-4 text-zinc-400 hover:text-white transition cursor-pointer'></Search>
                    <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} type="text" className='w-full outline-none text-zinc-200 bg-transparent p-1 text-sm' placeholder="Serial adı ilə axtar..." />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
                {filteredmedia.map((media) => (
                    <Link to={`/${type}/${media.id}`} key={media.id} className="relative border-2 border-zinc-900 hover:border-2 hover:border-zinc-700 rounded-2xl overflow-hidden">
                        <img className="w-full h-[230px] sm:h-[280px]" src={`https://image.tmdb.org/t/p/w500${media.poster_path}`} alt={media.name} />
                         <span className={`absolute top-2 right-2 text-white font-bold text-xs px-2 py-1 rounded ${media.rating > 8 ? "bg-emerald-600" :
                            media.rating > 6 ? "bg-amber-600" :
                                "bg-rose-600"
                            }`}>
                            ★ {media.rating}
                        </span>
                        <div>
                            <div className="p-2 flex flex-col justify-between flex-1 gap-2">
                                <h1 className="font-semibold line-clamp-1">{media.name || media.title}</h1>
                                <p className="text-xs font-medium">{media.genres?.[0]?.name}</p>
                            </div>
                            <div className="flex justify-between text-xs p-2 text-zinc-400 border-t border-zinc-800 pt-2">
                                <p>{media.first_air_date?.split("-")[0] || media.release_date?.split("-")[0]}</p>
                                <p>{istv ? `${media.number_of_seasons} Mövsüm` : `${Math.floor(media.runtime / 60)} s ${media.runtime % 60} dq`}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}