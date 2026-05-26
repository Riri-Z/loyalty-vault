import { useCallback, useRef } from "react";

export function useDebounce(onChange: (value: string) => void, duration: number): (value: string) => void {
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const onEdit = useCallback(
		(value: string) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			timeoutRef.current = setTimeout(() => onChange(value), duration);
		},
		[onChange, duration],
	);

	return onEdit;
}
