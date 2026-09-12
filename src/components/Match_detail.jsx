import { useNavigate, useParams } from "react-router-dom";
import { MATCH_DATA } from "./IDS/MATCH_IDS"

export default function MatchDetail() {

    const { id } = useParams();
    const navigate = useNavigate();
    const match = MATCH_DATA[id]

    return (
        <div className="relative flex flex-col w-full min-h-[90vh] bg-black p-5">

            <div className="flex flex-col bg-[#0d0d0f] rounded-2xl border-2 border-zinc-800 max-w-4xl mx-auto w-full">
                <div className="flex flex-col gap-1 w-full justify-between text-white p-6 items-center
                sm:flex-row">
                    <p className="text-center text-red-500/70 font-bold">{match.league}</p>
                    <p className="text-xs font-bold text-zinc-400">{match.match_date} * {match.raund}</p>
                </div>
                <div className="flex justify-evenly items-center p-2 mb-4">
                    <div className="flex flex-col items-center text-md text-white font-bold gap-1 sm:text-xl">
                        <img className="w-14 h-14" src={match.homeLogo} alt="" />
                        <p>{match.team1}</p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="bg-[#1e1e21] border-2 border-zinc-800 text-white text-center text-md font-bold px-2 py-1 rounded-xl sm:text-3xl sm:px-5 sm:py-2">
                            {match.score}<br />
                            <p className="text-sm text-zinc-500">{match.penalties}</p>
                        </div>
                        <p className={`p-2 right-2  font-bold text-xs border-1 px-2 py-1 rounded-4xl ${match.rating > 8.9 ? "text-emerald-600 border-emerald-600" :
                            match.rating > 7.9 ? "text-green-600 border-green-600" : match.rating > 6 ? "text-amber-600 border-amber-600" : "text-rose-600 border-rose-600"
                            }`}>
                            ★ {match.rating}
                        </p>
                    </div>
                    <div className="flex text-center flex-col items-center text-md text-white font-bold gap-1 sm:text-xl">
                        <img className="w-14 h-14" src={match.awayLogo} alt="" />
                        <p>{match.team2}</p>
                    </div>
                </div>
            </div>


        </div>
    )

}