import { useCallback, useRef } from "react";

// Debounce utility
export function useDebounce(onChange: any, duration: number) {
	const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);

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
