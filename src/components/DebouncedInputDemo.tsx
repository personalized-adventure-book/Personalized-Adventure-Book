import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebouncedInput } from "@/hooks/useDebounced";

export const DebouncedInputDemo = () => {
  const [savedValue, setSavedValue] = useState("");
  const [eventCount, setEventCount] = useState(0);

  const debouncedInput = useDebouncedInput(
    "",
    (value) => {
      setSavedValue(value);
      setEventCount((prev) => prev + 1);
    },
    500, // 500ms delay
  );

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Debounced Input Demo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="debounced-input">Type something (500ms delay):</Label>
          <Input
            id="debounced-input"
            value={debouncedInput.displayValue}
            onChange={(e) => debouncedInput.updateValue(e.target.value)}
            placeholder="Start typing..."
            className="mt-1"
          />
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <strong>Current display value:</strong>{" "}
            {debouncedInput.displayValue || "(empty)"}
          </div>
          <div>
            <strong>Saved value (after debounce):</strong>{" "}
            {savedValue || "(empty)"}
          </div>
          <div>
            <strong>Events fired:</strong> {eventCount}
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
          💡 The "Current display value" updates immediately as you type, but
          the "Saved value" only updates 500ms after you stop typing. This
          prevents excessive API calls or state updates while the user is still
          typing.
        </div>
      </CardContent>
    </Card>
  );
};
