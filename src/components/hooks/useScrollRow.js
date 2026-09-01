import { useRef } from "react";

export function useScrollRow() {
    const rowRef = useRef(null);

    const handleScroll = (direction) => {
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollAmount = clientWidth * 0.75;

            rowRef.current.scrollTo({
                left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
                behavior: "smooth"
            });

        }
    }
    return { rowRef, handleScroll };
}