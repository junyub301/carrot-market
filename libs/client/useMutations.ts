import { useState } from "react";

interface UseMutationsState<T> {
    loading: boolean;
    data?: T;
    error?: object;
}

type UseMutationResult<T> = [(data: any) => void, UseMutationsState<T>];

export default function useMutations<T = any>(
    url: string
): UseMutationResult<T> {
    const [state, setState] = useState<UseMutationsState<T>>({
        loading: false,
        data: undefined,
        error: undefined,
    });

    function mutation(data: any) {
        setState((prev) => ({ ...prev, loading: true }));
        fetch(url, {
            method: "POST",
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
