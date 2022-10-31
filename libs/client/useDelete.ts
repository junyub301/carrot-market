import { useState } from "react";

interface UseDeleteState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type UseDeleteResult<T> = [(data: any) => void, UseDeleteState<T>];

export default function useDelete<T = any>(url: string): UseDeleteResult<T> {
    const [state, setState] = useState<UseDeleteState<T>>({
        loading: false,
        data: undefined,
        error: undefined,
    });

    function mutation(data: any) {
        setState((prev) => ({ ...prev, loading: true }));
        fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json().catch(() => {}))
            .then((data) =>
                setState((prev) => ({ ...prev, data, loading: false }))
            )
            .catch((error: any) =>
                setState((prev) => ({ ...prev, error, loading: false }))
            );
    }

    return [mutation, { ...state }];
}
