import { renderHook, act } from "@testing-library/react-native";
import { useDebounce } from "@/hooks/useDebounce";

describe("useDebounce", () => {
	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("should call onChange after the specified duration", () => {
		const onChange = jest.fn();
		const { result } = renderHook(() => useDebounce(onChange, 300));

		act(() => {
			result.current("test");
		});

		expect(onChange).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(onChange).toHaveBeenCalledWith("test");
	});

	it("should debounce multiple calls and only call with the last value", () => {
		const onChange = jest.fn();
		const { result } = renderHook(() => useDebounce(onChange, 300));

		act(() => {
			result.current("first");
		});

		act(() => {
			jest.advanceTimersByTime(100);
		});

		act(() => {
			result.current("second");
		});

		act(() => {
			jest.advanceTimersByTime(100);
		});

		act(() => {
			result.current("third");
		});

		expect(onChange).not.toHaveBeenCalled();

		act(() => {
			jest.advanceTimersByTime(300);
		});

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith("third");
	});

	it("should clear previous timeout on new call", () => {
		const onChange = jest.fn();
		const { result } = renderHook(() => useDebounce(onChange, 300));

		act(() => {
			result.current("first");
		});

		act(() => {
			jest.advanceTimersByTime(100);
			result.current("second");
			jest.advanceTimersByTime(300);
		});

		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith("second");
	});
});
