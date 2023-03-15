import { useEffect } from "react";

let listenerCallbacks = new WeakMap();

let observer: IntersectionObserver;

function handleIntersections(entries: any[]) {
    entries.forEach((entry) => {
        if (listenerCallbacks.has(entry.target)) {
            let cb = listenerCallbacks.get(entry.target);

            if (entry.isIntersecting || entry.intersectionRatio > 1) {
                observer.unobserve(entry.target);
                listenerCallbacks.delete(entry.target);
                cb();
            }
        }
    });
}

function getIntersectionObserver() {
    if (observer === undefined) {
        observer = new IntersectionObserver(handleIntersections, {
            rootMargin: "100px",
            threshold: 0.35,
        });
    }
    return observer;
}

export function useIntersection(elem: any, callback: () => void) {
    useEffect(() => {
        const target = elem.current;

        const observer = getIntersectionObserver();

        listenerCallbacks.set(target, callback);
        observer.observe(target);

        return () => {
            listenerCallbacks.delete(target);
            observer.unobserve(target);
        };
    }, []);
}
