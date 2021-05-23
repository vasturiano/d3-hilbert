d3-hilbert
==============

[![NPM package][npm-img]][npm-url]
[![Build Size][build-size-img]][build-size-url]
[![Dependencies][dependencies-img]][dependencies-url]

D3 layout to visualize distance variables using a continuous Hilbert space-filling curve. Here's an [example](https://observablehq.com/@vasturiano/hilbert-curve).

See also [d3-morton](https://github.com/vasturiano/d3-morton-order).

If you are looking for a module that also performs rendering, please see [hilbert-chart](https://github.com/vasturiano/hilbert-chart).

## Quick start

```
import d3Hilbert from 'd3-hilbert';
```
or
```
d3.hilbert = require('d3-hilbert');
```
or even
```
<script src="//unpkg.com/d3-hilbert"></script>
```
then
```
const myRange = { start: 4, length: 9 };
d3.hilbert()
    .order(2)
    .layout(myRange)
```

## API reference

| Method | Description | Default |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **canvasWidth**([*number*]) | Getter/setter for the length of each side of the hilbert square canvas. | 1 |
| **order**([*int*]) | Getter/setter for the extent of the hilbert curve domain, determined by `4^order`. **The maximum safe order is *26***, due to the JS numbers upper-boundary of 53 bits. | 4 |
| **simplifyCurves**([*boolean*]) | Getter/setter for whether to simplify the resolution of the curve to the most canonical 2-bit boundary that fits the range integral. For example, in a 2nd order curve (16 values), a range from *4* to *11* can be simplified from 8 vertices to 2 (each filling a square with 4 values), on the lower quadrants. This simplification greatly reduces the number of vertices in the curve and improves the calculation and rendering performance, specially for high-order ranges which tend to fall on bit boundaries, such as the case of IP address routes. | true |
| **layout**(*rangeObject*) | Extends the input rangeObject (syntax: `{start:<int>, length:<int>}`) with 3 additional properties defining the hilbert curve: **.cellWidth** (*number* defining the side length of each square cell and essentially the thickness of the line, according to the canvasWidth), **.startCell** ([*int*,*int*] the x,y coordinates of the starting cell) and **.pathVertices** (*Array* of vertices, specified in terms of characters indicating movement direction: **UDLR** (**U**p, **D**own, **L**eft, **R**ight)). | |
| **getValAtXY**(*num*, *num*) | Returns the reverse translated value on the curve domain found at coordinates *x*,*y*, relative to the canvasWidth. | |
| **getXyAtVal**(*num*) | Returns the `[x, y]` coordinates of the requested value. Throws an error if the value is outside the boundaries of the current hilbert domain. | |


[npm-img]: https://img.shields.io/npm/v/d3-hilbert.svg
[npm-url]: https://npmjs.org/package/d3-hilbert
[build-size-img]: https://img.shields.io/bundlephobia/minzip/d3-hilbert.svg
[build-size-url]: https://bundlephobia.com/result?p=d3-hilbert
[dependencies-img]: https://img.shields.io/david/vasturiano/d3-hilbert.svg
[dependencies-url]: https://david-dm.org/vasturiano/d3-hilbert
