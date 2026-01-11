# react-range

> A small, configurable React range slider component.

## Installation

Install from npm:

```bash
npm install react-range
# or
yarn add react-range
```

> If you are using a package manager workspace or private registry, adjust the package name accordingly.

## Usage

Basic usage (ESM):

```tsx
import React from "react";
import { RangeSlider } from "react-range";

export default function Example() {
	return (
		<RangeSlider
			min={0}
			max={100}
			defaultValue={[20, 80]}
			onChange={(v) => console.log("change", v)}
			onChangeCommitted={(v) => console.log("committed", v)}
			showTooltip
		/>
	);
}
```

Common props:

-   `min`, `max`, `step` — number bounds and step size.
-   `value` / `defaultValue` — controlled/uncontrolled values as `[number, number]`.
-   `onChange`, `onChangeCommitted` — update callbacks.
-   `disabled` — disable interaction.
-   `showTooltip`, `formatTooltip` — show and format thumb tooltips.

## Build & Type Declarations

The package ships built JavaScript and TypeScript declarations in `dist/`.
To build locally:

```bash
npm run build
npm run types
```

## Testing locally

Create a temporary project and install the packed tarball for quick verification:

```bash
npm pack
npm init -y
npm install ../react-range/react-range-1.0.0.tgz
```

## License

MIT

---

If you'd like I can update the `author` and `repository` fields in `package.json` and publish the package for you (you'll need to be logged in with `npm login`).
