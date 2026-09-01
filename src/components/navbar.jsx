import { Search, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TV_IDS } from './IDS/TV_IDS';
import { useLocation, useNavigate } from 'react-router-dom';
import { MOVIE_IDS } from './IDS/MOVIE_IDS';

function Navbar() {

    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {

        if (!query.trim()) {
            setResults([])
            return
        }

        fetch(`https://api.themoviedb.org/3/search/multi?api_key=717ecabf3d83680c8967286c22eec4b9&query=${query}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.results) {
                    const movie_id = MOVIE_IDS.map((item) => item.id);
                    const tv_id = TV_IDS.map((item) => item.id);

                    const my_series = data.results.filter((result) => {
                        if (result.media_type === "movie") {
                            return movie_id.includes(result.id);
                        }

                        if (result.media_type === "tv") {
                            return tv_id.includes(result.id);
                        }
                        return false;
                    });
                    setResults(my_series);
                }
            })

    }, [query]);


    if (location.pathname.includes("media_more")) { return null }

    const select = (item) => {
        setQuery("")
        setResults([])
        navigate(`/${item.media_type}/${item.id}`);
    }

    return (
        <nav className='relative flex justify-between items-center p-6 bg-black gap-4 h-[10vh] z-50'>
            <h1 onClick={() => navigate("/")} className="text-red-600 font-bold text-2xl cursor-pointer">SHUFLIX</h1>
            <ul className='gap-6 text-gray-400 hidden sm:flex'>
                <li><a href="#">Films</a></li>
                <li><a href="#">Series</a></li>
                <li><a href="#">Favorites</a></li>
                <li><a href="#">About me</a></li>
            </ul>
            <div className='relative flex flex-col max-w-[180px] min-[500px]:max-w-[550px] bg-[#2B2B2B] rounded-md z-50'>
                <div className="flex items-center px-1 py-1 gap-1">
                    <Search className='w-5 h-5 text-zinc-400 hover:text-white transition cursor-pointer'></Search>
                    <input type="text" className='w-full outline-none text-zinc-200 bg-transparent text-sm' placeholder='Search...' value={query} onChange={(e) => setQuery(e.target.value)} />
                </div>
                {results.length > 0 &&
                    <div className='max-h-[240px] absolute flex flex-col w-full left-0 top-full mt-1 rounded-md overflow-y-auto scrollbar-none cursor-pointer'>
                        {results.map((result) => (
                            <div key={result.id} className='flex gap-2 text-white bg-[#2B2B2B] w-full p-3' onClick={() => select(result)}>
                                <img className='w-10 h-14 object-cover' src={`https://image.tmdb.org/t/p/w92${result.poster_path}`} alt="" />
                                <div className='min-w-0'>
                                    <h3 className='text-zinc-200 text-sm font-medium truncate'>{result.name || result.title}</h3>
                                    <p className='text-xs text-zinc-500'>{(result.first_air_date || result.release_date)?.split("-")[0]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className='text-zinc-400 hover:text-white transition cursor-pointer sm:hidden'>
                {isOpen ? <X className='w-6 h-6'></X> : <Menu className='w-6 h-6'></Menu>}
            </button>

            {
                isOpen && (
                    <div className='absolute top-full left-0 w-full bg-[#141414] p-5 sm:hidden'>
                        <ul className='flex flex-col gap-6 text-gray-400 font-medium text'>
                            <li><a className='hover:text-red-600 transition' href="#">Films</a></li>
                            <li><a href="#">Series</a></li>
                            <li><a href="#">Favorites</a></li>
                            <li><a href="#">About me</a></li>
                        </ul>
                    </div>
                )
            }
        </nav>
    );

}

export default Navbar;