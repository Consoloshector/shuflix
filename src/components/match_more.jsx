import { useNavigate } from "react-router-dom"
import { MATCH_DATA } from "./IDS/MATCH_IDS";

export default function MatchMore() {
    const navigate = useNavigate();
    return (
        <div className="bg-black w-full min-h-[100vh] text-white py-3">
            <div className="flex flex-col gap-2 p-4">
                <button className="absolute top-2 left-3 text-white bg-zinc-600 px-2 rounded-xl flex items-center z-50 cursor-pointer hover:bg-red-600" onClick={() => navigate(-1)}>← Geri</button>
                <div className="flex flex-col gap-2 mt-3">
                    <h1 className="font-bold px-2 border-l-4 border-red-600 text-3xl"> Bütün matçlar </h1>
                    <p className="px-2 text-zinc-300">Kolleksiyamdakı bütün matçları kəşf edin</p>
                </div>
            </div>
            <div className="grid grid-cols-1 min-[360px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">

                {MATCH_DATA.map((match) => (
                    <div key={match.id} to={`/match/${match.id}`} className="border-1 border-zinc-800 rounded-xl overflow-hidden">
                        <div className="relative flex flex-col w-full gap-2 p-3 justify-between
                        sm:flex-row">
                            <p className="text-[0.9rem] truncate">{match.league}</p>
                            <p className={`p-2 self-start text-white font-bold text-xs px-2 py-1 rounded ${match.rating > 8.9 ? "bg-emerald-600" :
                                match.rating > 7.9 ? "bg-green-600" : match.rating > 6 ? "bg-amber-600" : "bg-rose-600"
                                }`}>
                                ★ {match.rating}
                            </p>
                        </div>
                        <div className="flex flex-col p-2 m-2 gap-3 justify-between rounded-xl items-center bg-zinc-900
                        sm:flex-row sm:gap-0">
                            <div className="flex flex-col items-center">
                                <img className="w-14 h-14" src={match.homeLogo} alt="" />
                                <p>{match.team1}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <p className="hidden md:block text-center text-red-500/70 font-bold">{match.raund}</p>
                                <div className="bg-red-500/35 border-2 border-red-500/30 font-bold px-3 py-1 rounded-md">
                                    {match.score}
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <img className="w-14 h-14" src={match.awayLogo} alt="" />
                                <p>{match.team2}</p>
                            </div>
                        </div>
                        <div className="w-full p-3 flex justify-between items-center text-sm">
                            <p>Matç günü</p>
                            <p className="font-bold text-xs">{match.match_date}</p>
                        </div>
                        <p className="min-[768px]:hidden text-center text-red-500/70 font-bold">{match.raund}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}