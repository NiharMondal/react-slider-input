import { useState, useRef, useEffect, useCallback, forwardRef } from "react";

export interface RangeSliderProps {
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: [number, number];
    value?: [number, number];
    onChange?: (value: [number, number]) => void;
    onChangeCommitted?: (value: [number, number]) => void;
    disabled?: boolean;
    className?: string;
    trackClassName?: string;
    rangeClassName?: string;
    thumbClassName?: string;
    showTooltip?: boolean;
    formatTooltip?: (value: number) => string;
}

const RangeSlider = forwardRef<HTMLDivElement, RangeSliderProps>(
    (
        {
            min = 0,
            max = 100,
            step = 1,
            defaultValue = [min, max],
            value,
            onChange,
            onChangeCommitted,
            disabled = false,
            className = "",
            trackClassName = "",
            rangeClassName = "",
            thumbClassName = "",
            showTooltip = true,
            formatTooltip = (val) => val.toString(),
        },
        ref
    ) => {
        const isControlled = value !== undefined;
        const [localValue, setLocalValue] = useState<[number, number]>(
            isControlled ? value! : defaultValue
        );

        const currentValue = isControlled ? value! : localValue;
        const [activeThumb, setActiveThumb] = useState<number | null>(null);
        const trackRef = useRef<HTMLDivElement | null>(null);

        useEffect(() => {
            if (isControlled) setLocalValue(value!);
        }, [isControlled, value]);

        const clamp = useCallback(
            (val: number) => Math.min(max, Math.max(min, val)),
            [min, max]
        );

        const getPercentage = (val: number) =>
            ((val - min) / (max - min)) * 100;

        const updateValue = useCallback(
            (next: [number, number]) => {
                const sorted: [number, number] = [
                    Math.min(next[0], next[1]),
                    Math.max(next[0], next[1]),
                ];
                if (!isControlled) setLocalValue(sorted);
                onChange?.(sorted);
            },
            [isControlled, onChange]
        );

        const commit = useCallback(() => {
            onChangeCommitted?.(currentValue);
        }, [onChangeCommitted, currentValue]);

        const startDrag = (index: number) => {
            if (!disabled) setActiveThumb(index);
        };

        const handlePointerMove = useCallback(
            (clientX: number) => {
                if (activeThumb === null) return;
                const getValueFromPosition = (clientX: number) => {
                    if (!trackRef.current) return min;
                    const rect = trackRef.current.getBoundingClientRect();
                    const percent = (clientX - rect.left) / rect.width;
                    const raw = percent * (max - min) + min;
                    return clamp(Math.round(raw / step) * step);
                };
                const updated: [number, number] = [...currentValue];
                updated[activeThumb] = getValueFromPosition(clientX);
                updateValue(updated);
            },
            [activeThumb, currentValue, updateValue, min, max, step, clamp]
        );

        useEffect(() => {
            if (activeThumb === null) return;

            const onMove = (e: MouseEvent) => handlePointerMove(e.clientX);

            const onTouchMove = (e: TouchEvent) =>
                handlePointerMove(e.touches[0].clientX);

            const onEnd = () => {
                commit();
                setActiveThumb(null);
            };

            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onEnd);
            document.addEventListener("touchmove", onTouchMove);
            document.addEventListener("touchend", onEnd);

            return () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onEnd);
                document.removeEventListener("touchmove", onTouchMove);
                document.removeEventListener("touchend", onEnd);
            };
        }, [activeThumb, handlePointerMove, commit]);

        const handleKeyDown = (index: number) => (e: React.KeyboardEvent) => {
            if (disabled) return;
            let delta = 0;

            if (e.key === "ArrowRight") delta = step;
            if (e.key === "ArrowLeft") delta = -step;

            if (delta !== 0) {
                e.preventDefault();
                const updated: [number, number] = [...currentValue];
                updated[index] = clamp(updated[index] + delta);
                updateValue(updated);
                commit();
            }
        };

        const left = getPercentage(currentValue[0]);
        const right = getPercentage(currentValue[1]);

        return (
            <div ref={ref} className={`range-slider ${className}`}>
                <div
                    ref={trackRef}
                    className={`range-slider-track ${trackClassName}`}
                >
                    <div
                        className={`range-slider-range ${rangeClassName}`}
                        style={{ left: `${left}%`, width: `${right - left}%` }}
                    />

                    {[0, 1].map((i) => (
                        <div
                            key={i}
                            className={`range-slider-thumb ${thumbClassName}`}
                            style={{
                                left: `${getPercentage(currentValue[i])}%`,
                                transform: "translateX(-50%)",
                            }}
                            role="slider"
                            tabIndex={disabled ? -1 : 0}
                            aria-valuemin={min}
                            aria-valuemax={max}
                            aria-valuenow={currentValue[i]}
                            aria-disabled={disabled}
                            onMouseDown={() => startDrag(i)}
                            onTouchStart={() => startDrag(i)}
                            onKeyDown={handleKeyDown(i)}
                        >
                            {showTooltip && activeThumb === i && (
                                <div className="range-slider-tooltip">
                                    {formatTooltip(currentValue[i])}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

RangeSlider.displayName = "RangeSlider";
export default RangeSlider;
