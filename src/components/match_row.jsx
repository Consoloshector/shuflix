import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MATCH_DATA } from "./IDS/MATCH_IDS";

export default function MatchRow() {
    const [matches, setMatch] = useState([]);

    useEffect(() => {
        setMatch(MATCH_DATA);
    }, []);

    return (
        <div className="flex flex-col w-full gap-4 bg-[#000000] p-6 text-white">

            <div className="flex w-full justify-between items-center ">
                <h1 className="font-bold px-2 border-l-4 border-red-600 text-xl">Matclar</h1>
                <Link to={`/match_more`} className="font-bold px-2 border-r-4 bg-black">daha cox</Link>
            </div>

            <div className="flex flex-col overflow-x-auto gap-4
             sm:overflow-x-auto sm:[scrollbar-width:none] sm:gap-3 lg:flex-row">
                {matches.map((match) => (
                    <Link key={match.id} to={`/match/${match.id}`} className="border-1 border-zinc-800 min-w-[30%] rounded-xl overflow-hidden">
                        <div className="relative flex w-full p-3 justify-between">
                            <p className="truncate">{match.league}</p>
                            <p className={`p-2 right-2 text-white font-bold text-xs px-2 py-1 rounded ${match.rating > 8.9 ? "bg-emerald-600" :
                                match.rating > 7.9 ? "bg-green-600" : match.rating > 6 ? "bg-amber-600" : "bg-rose-600"
                                }`}>
                                ★ {match.rating}
                            </p>
                        </div>
                        <div className="flex p-2 m-2 justify-between rounded-xl items-center bg-zinc-900">
                            <div className="flex flex-col items-center">
                                <img className="w-14 h-14" src={match.homeLogo} alt="" />
                                <p>{match.team1}</p>
                            </div>
                           <div className="flex flex-col items-center gap-2">
                            <p className="text-center text-red-500/70 font-bold">{match.raund}</p>
                             <div className="bg-red-500/35 border-2 border-red-500/30 font-bold px-3 py-1 rounded-md">
                                {match.score}
                            </div>
                           </div>
                            <div className="flex flex-col items-center">
                                <img className="w-14 h-14" src={match.awayLogo} alt="" />
                                <p>{match.team2}</p>
                            </div>
                        </div>
                        <div className="w-full p-3 flex justify-between text-sm">
                            <p>Match date</p>
                            <p className="font-bold text-xs">{match.match_date}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )

}