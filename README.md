# d3-hilbert

D3 layout to visualize distance variables using a continuous Hilbert space-filling space. Here's an [example](http://bl.ocks.org/vasturiano/aee11f57aaa6b1ec96f1df386166a396).

[![NPM](https://nodei.co/npm/d3-hilbert.png?compact=true)](https://nodei.co/npm/d3-hilbert/)

## API reference

```
d3.hilbert()
    .canvasWidth(<px>)
    .order(<order>)
    .simplifyCurves(<boolean:true>)
    .layout({
        start: <num>
        length: <num>
    })
    .getValAtXY(<x>, <y>)
```
