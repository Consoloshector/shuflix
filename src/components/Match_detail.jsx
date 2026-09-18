import { useNavigate, useParams } from "react-router-dom";
import { MATCH_DATA } from "./IDS/MATCH_IDS"
import { useEffect, useState } from "react";

function StatRow({ home, away, home_percent, away_percent, homeBg, awayBg, label }) {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between text-white text-xs">
                <p>{home}</p>
                <p>{label}</p>
                <p>{away}</p>
            </div>
            <div className="w-full flex bg-zinc-800 rounded-full overflow-hidden">
                <div style={{ width: `${home_percent}%`, background: `${homeBg}` }} className={`h-3`} />
                <div style={{ width: `${away_percent}%`, background: `${awayBg}` }} className={`h-3`} />
            </div>
        </div>
    )
}

export default function MatchDetail() {

    const [activeTab, setActiveTab] = useState("stats");
    const [activeLineups, setActiveLineups] = useState("home");
    const { id } = useParams();
    const navigate = useNavigate();
    const match = MATCH_DATA[id]

    useEffect(() => {
        { window.scrollTo(0, 0) }
    }, []);

    return (
        <div className="relative flex flex-col w-full min-h-[90vh] bg-black p-3 gap-4">

            <button className="self-start text-white bg-zinc-600 px-2 rounded-xl flex items-center z-12 cursor-pointer hover:bg-red-600" onClick={() => navigate(-1)}>← Geri</button>

            <div className="flex flex-col bg-[#0d0d0f] rounded-2xl border-2 border-zinc-800 max-w-4xl mx-auto w-full">
                <div className="flex flex-col gap-1 w-full justify-between text-white p-6 items-center
                sm:flex-row">
                    <p className="text-center text-red-500/70 font-bold">{match.league}</p>
                    <p className="text-xs font-bold text-zinc-400">{match.match_date} ● {match.raund}</p>
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

            <div className="flex flex-col">
                <div className="flex gap-5 text-zinc-400 font-bold text-sm px-1 max-w-4xl mx-auto w-full py-4 border-b-2 border-zinc-800">
                    <button onClick={() => setActiveTab("stats")} className={`${activeTab === "stats" ? "text-red-600" : "text-zinc-400"}`}>
                        Statistika
                    </button>
                    <button onClick={() => setActiveTab("goals")} className={`${activeTab === "goals" ? "text-red-600" : "text-zinc-400"}`}>
                        Xronologiya
                    </button>
                    <button onClick={() => setActiveTab("lineups")} className={`${activeTab === "lineups" ? "text-red-600" : "text-zinc-400"}`}>
                        Heyətlər
                    </button>
                </div>

                <div className="w-full flex flex-col">
                    {activeTab === "stats" && (
                        <div className="flex flex-col mx-auto max-w-4xl w-full mt-5 gap-1">
                            <StatRow
                                label="Topa nezaret"
                                home={`${match.possesions.home}%`}
                                away={`${match.possesions.away}%`}
                                home_percent={`${match.possesions.home_percent}`}
                                away_percent={`${match.possesions.away_percent}`}
                                homeBg={`${match.homeBg}`}
                                awayBg={`${match.awayBg}`}
                            />
                            <StatRow
                                label="Umumi zerbeler"
                                home={`${match.shoots.home}`}
                                away={`${match.shoots.away}`}
                                home_percent={`${match.shoots.home_percent}`}
                                away_percent={`${match.shoots.away_percent}`}
                                homeBg={`${match.homeBg}`}
                                awayBg={`${match.awayBg}`}
                            />
                            <StatRow
                                label="Deqiq zerbeler"
                                home={`${match.shoots_on_target.home}`}
                                away={`${match.shoots_on_target.away}`}
                                home_percent={`${match.shoots_on_target.home_percent}`}
                                away_percent={`${match.shoots_on_target.away_percent}`}
                                homeBg={`${match.homeBg}`}
                                awayBg={`${match.awayBg}`}
                            />
                            <StatRow
                                label="Oturmeler"
                                home={`${match.pass.home}`}
                                away={`${match.pass.away}`}
                                home_percent={`${match.pass.home_percent}`}
                                away_percent={`${match.pass.away_percent}`}
                                homeBg={`${match.homeBg}`}
                                awayBg={`${match.awayBg}`}
                            />
                            <StatRow
                                label="Offside"
                                home={`${match.offside.home}`}
                                away={`${match.offside.away}`}
                                home_percent={`${match.offside.home_percent}`}
                                away_percent={`${match.offside.away_percent}`}
                                homeBg={`${match.homeBg}`}
                                awayBg={`${match.awayBg}`}
                            />
                        </div>
                    )}

                    {activeTab === "goals" && (

                        <div className="flex flex-col mx-auto max-w-4xl w-full mt-5 gap-2 text-white">
                            {MATCH_DATA[id].goals.map((goal) => (
                                <div className={`flex ${goal.team === "home" ? "flex-row-reverse" : "flex"} w-full justify-between py-5 px-2 bg-zinc-900 rounded-md font-bold items-center`}>
                                    <div className="text-red-500 text-xs bg-zinc-800 p-1 text-center rounded-sm">{goal.minute}'</div>
                                    <div className="text-sm">⚽  {goal.player}</div>
                                </div>
                            ))}
                        </div>

                    )}

                    {activeTab === "lineups" && (
                        <div className="flex flex-col mx-auto max-w-4xl w-full mt-5 gap-2 text-white justify-between p-2">
                            <div className="relative w-full h-[500px] flex">
                                <div className=" bg-[#3c8063] w-[50%] h-full border-2 border-[#77a692]">
                                    <div>
                                        {match.lineups.home[0]}
                                    </div>
                                </div>
                                <div className=" bg-[#3c8063] w-[50%] h-full border-2 border-[#77a692]"></div>
                                <div className="absolute w-[200px] h-[200px] rounded-full left-1/2 top-1/2 border-2 border-[#77a692] -translate-x-1/2 -translate-y-1/2"></div>
                            </div>
                            <div className="flex w-full justify-between">
                                <button className="flex items-center gap-2 font-bold" onClick={() => setActiveLineups("home")}>
                                    <img className="w-7 h-7" src={MATCH_DATA[id].homeLogo} alt="" />{MATCH_DATA[id].team1}
                                </button>
                                <button className="flex items-center gap-2 font-bold flex-row-reverse" onClick={() => setActiveLineups("away")}>
                                    <img className="w-7 h-7" src={MATCH_DATA[id].awayLogo} alt="" />{MATCH_DATA[id].team2}
                                </button>
                            </div>
                            <div>
                                {activeLineups === "home" && (
                                    <div className="flex flex-col gap-1">

                                        {MATCH_DATA[id].lineups.home.map((h_player) => (
                                            <p className="border-b-2 border-zinc-900 p-3 text-sm">{h_player}</p>
                                        ))}

                                    </div>
                                )}
                                {activeLineups === "away" && (
                                    <div className="flex flex-col gap-1">
                                        {MATCH_DATA[id].lineups.away.map((a_player) => (
                                            <p className="border-b-2 border-zinc-900 p-3 text-sm">{a_player}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    )

}