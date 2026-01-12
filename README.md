# React Range Slider

> A lightweight, accessible React range slider component with dual-thumb support.
> Built with React + TypeScript, supports controlled and uncontrolled usage, keyboard navigation, touch/mouse interaction, and full styling control.

This package is designed as a modern alternative to react-slider with minimal API surface and zero external dependencies.

## ✨ Features

-   Dual-thumb range slider
-   Controlled & uncontrolled modes
-   Keyboard accessible (ARIA compliant)
-   Mouse & touch support
-   Customizable styles via class names
-   Optional tooltip support
-   Written in TypeScript
-   No external UI dependencies

### 📦 Installation

```bash
npm install react-slider-range
# or
yarn add react-slider-range
# or
pnpm add react-slider-range
```

### 🚀 Usage

**1. Basic Example**

```bash
import "react-slider-input/dist/slider.css";
import { Slider } from "react-slider-input";


export default function Example() {
  return (
    <Slider
      min={0}
      max={100}
      defaultValue={[20, 80]}
      onChange={(value) => console.log(value)}
    />
  );
}
```

**2.Controlled Example**

```bash
import { useState } from "react";
import "react-slider-input/dist/slider.css";
import { Slider } from "react-slider-input";

export default function ControlledExample() {
  const [value, setValue] = useState<[number, number]>([30, 70]);

  return (
    <Slider
      min={0}
      max={100}
      value={value}
      onChange={setValue}
      onChangeCommitted={(val) => console.log("Committed:", val)}
    />
  );
}
```

### 🧩 Props

| Prop                | Type                | Default            | Description                  |
| ------------------- | ------------------- | ------------------ | ---------------------------- |
| `min`               | `number`            | `0`                | Minimum slider value         |
| `max`               | `number`            | `100`              | Maximum slider value         |
| `step`              | `number`            | `1`                | Step increment               |
| `defaultValue`      | `[number, number]`  | `[min, max]`       | Initial range (uncontrolled) |
| `value`             | `[number, number]`  | —                  | Controlled value             |
| `onChange`          | `(value) => void`   | —                  | Fires on value change        |
| `onChangeCommitted` | `(value) => void`   | —                  | Fires on drag end            |
| `disabled`          | `boolean`           | `false`            | Disable slider               |
| `className`         | `string`            | `""`               | Wrapper class                |
| `trackClassName`    | `string`            | `""`               | Track class                  |
| `rangeClassName`    | `string`            | `""`               | Active range class           |
| `thumbClassName`    | `string`            | `""`               | Thumb class                  |
| `showTooltip`       | `boolean`           | `false`            | Show value tooltip           |
| `formatTooltip`     | `(value) => string` | `value.toString()` | Tooltip formatter            |

### ♿ Accessibility

-   Fully keyboard navigable (ArrowLeft / ArrowRight)
-   Proper role="slider" and ARIA attributes
-   Screen-reader friendly
-   Focusable thumbs

### 🧠 Why This Slider?

-   Smaller API than react-slider
-   No external dependencies
-   Better TypeScript support
-   Easier styling
-   Built for modern React (hooks, forwardRef)

### 🛠 Tech Stack

-   React
-   TypeScript
-   Hooks
-   Forward refs
-   ARIA accessibility

### 📄 License

MIT © Nihar Mondal
