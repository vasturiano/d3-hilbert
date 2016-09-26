d3.hilbert = function() {

    var hilbert = {},
        canvasWidth = 1,
        order = 4,
        simplifyCurves = true;

    hilbert.canvasWidth = function(_) {
        if (!arguments.length) return canvasWidth;
        canvasWidth = +_;
        return hilbert;
    };

    hilbert.order = function(_) {
        if (!arguments.length) return order;
        order = +_;
        return hilbert;
    };

    hilbert.simplifyCurves = function(_) {
        if (!arguments.length) return simplifyCurves;
        simplifyCurves = _;
        return hilbert;
    };

    hilbert.layout = function(ranges) {
        ranges.forEach(function(range) {
            var d = getHilbertPath(range.start, range.length, order, canvasWidth, simplifyCurves);

            range.cellWidth = d.cellWidth;
            range.startCell = d.startCell;
            range.pathVertices = d.pathVertices
        });

        return hilbert;
    };

    hilbert.getValAtXY = function(x, y) {
        var n = Math.pow(2, order);
        x *= (n / canvasWidth);
        y *= (n / canvasWidth);
        return hilbertPoint2Distance(x, y, n);
    };

    return hilbert;

    //

    //rotate/flip a quadrant appropriately
    function rot(n, xy, rx, ry) {
        if (ry == 0) {
            if (rx == 1) {
                xy[0] = (n - 1 - xy[0]);
                xy[1] = (n - 1 - xy[1]);
            }

            //Swap x and y
            var t = xy[0];
            xy[0] = xy[1];
            xy[1] = t;
        }
    }

    function hilbertPoint2Distance(x, y, n) {
        var rx, ry, d = 0,
            xy = [x, y];

        for (var s = n / 2; s > 0; s /= 2) {
            rx = (xy[0] & s) > 0;
            ry = (xy[1] & s) > 0;
            d += s * s * ((3 * rx) ^ ry);
            rot(s, xy, rx, ry);
        }

        return d;
    }

    function getHilbertPath(start, length, order, sideSize, simplifyCurves) {

        if (simplifyCurves) {
            // Adjust resolution
            while (!Number.isInteger(start) || !Number.isInteger(length)) {
                start *= 4;
                length *= 4;
                order += 1;
            }

            // resolution simplification
            while (!(start % 4) && !(length % 4) && order > 0) {
                start /= 4;
                length /= 4;
                order -= 1;
            }
        }

        // prevent overflow
        var maxPos = Math.pow(4, order);
        start = Math.min(start, maxPos);
        length = Math.min(length, maxPos - start);

        // nSide is on a binary boundary 2^0, 2^1, 2^2, ...
        var nSide = Math.pow(2, order),
            cellWidth = sideSize / nSide;

        var startCell = hilbertDistance2Point(start, nSide),
            vertices = [],
            prevPnt = startCell,
            pnt;

        for (var i=1; i < length; i++) {
            pnt = hilbertDistance2Point(start + i, nSide);

            vertices.push(
                pnt[0]>prevPnt[0]
                    ? 'R'
                    : (pnt[0]<prevPnt[0]
                        ? 'L'
                        : (pnt[1]>prevPnt[1]
                            ? 'D'
                            : 'U'
                        )
                    )
            );

            prevPnt = pnt;
        }

        return {
            cellWidth: cellWidth,
            startCell: startCell,
            pathVertices: vertices
        };

        // d: distance, n: sqrt of numPos (square side size)
        function hilbertDistance2Point(d, n) {
            var rx, ry, t = d,
                xy = [0, 0];

            for (var s = 1; s < n; s *= 2) {
                rx = 1 & (t / 2);
                ry = 1 & (t ^ rx);
                rot(s, xy, rx, ry);

                xy[0] += (s * rx);
                xy[1] += (s * ry);
                t /= 4;
            }

            return xy;
        }
    }
};
