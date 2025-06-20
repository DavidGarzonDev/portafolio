
import { useEffect, useState } from "react";

const ScrollHint = () => {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShow(false), 5000);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 text-green-400 animate-bounce flex items-center gap-2 z-50">
            <span className="text-2xl md:text-3xl font-medium">Desliza</span>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-12 rotate-90"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </div>
    );
};

export default ScrollHint;
