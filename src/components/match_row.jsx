import { useEffect, useState } from "react";
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
                <p to={`/media_more/tv`} className="font-bold px-2 border-r-4 bg-black">daha cox</p>
            </div>

            <div className="flex overflow-x-auto gap-4 sm:overflow-x-auto sm:[scrollbar-width:none] sm:flex-row sm:gap-3">
                {matches.map((match) => (
                    <div className="border-2 border-amber-600 w-4xl">
                        <img src={match.backdrop_path} alt="" />
                        <div>
                            <p>{match.league}</p>
                            <p>{match.rating}</p>
                        </div>
                        <h1>{match.title}</h1>
                    </div>
                ))}
            </div>

        </div>
    )

}