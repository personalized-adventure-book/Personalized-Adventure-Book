import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounced, useDebouncedInput } from "./useDebounced";

describe("useDebounced", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounced("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounced(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    expect(result.current).toBe("initial");

    // Change the value
    rerender({ value: "changed", delay: 500 });
    expect(result.current).toBe("initial"); // Should still be initial

    // Fast forward time by 250ms (less than delay)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("initial"); // Should still be initial

    // Fast forward time by another 250ms (total 500ms = delay)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("changed"); // Should now be changed
  });

  it("should reset timer on subsequent value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounced(value, delay),
      { initialProps: { value: "initial", delay: 500 } },
    );

    // Change the value
    rerender({ value: "changed1", delay: 500 });

    // Fast forward by 250ms
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Change value again (this should reset the timer)
    rerender({ value: "changed2", delay: 500 });

    // Fast forward by 250ms (total 500ms from first change, but only 250ms from second)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("initial"); // Should still be initial

    // Fast forward by another 250ms (500ms from second change)
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(result.current).toBe("changed2"); // Should now be the latest value
  });
});

describe("useDebouncedInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should provide display value and update function", () => {
    const onDebouncedChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput("initial", onDebouncedChange, 500),
    );

    expect(result.current.displayValue).toBe("initial");
    expect(typeof result.current.updateValue).toBe("function");
    expect(result.current.debouncedValue).toBe("initial");
  });

  it("should update display value immediately but debounce callback", () => {
    const onDebouncedChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput("initial", onDebouncedChange, 500),
    );

    // Update the value
    act(() => {
      result.current.updateValue("new value");
    });

    // Display value should update immediately
    expect(result.current.displayValue).toBe("new value");

    // Callback should not be called yet
    expect(onDebouncedChange).not.toHaveBeenCalled();

    // Fast forward time by 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Now callback should be called
    expect(onDebouncedChange).toHaveBeenCalledWith("new value");
  });

  it("should not call callback if value hasn't changed from initial", () => {
    const onDebouncedChange = vi.fn();
    const { result } = renderHook(() =>
      useDebouncedInput("initial", onDebouncedChange, 500),
    );

    // Fast forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Callback should not be called because value is still the same as initial
    expect(onDebouncedChange).not.toHaveBeenCalled();
  });
});
