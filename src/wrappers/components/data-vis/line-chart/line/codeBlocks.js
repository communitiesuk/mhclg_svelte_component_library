export const codeBlockOne = `<script>

let xFunction = 
    scaleLinear()
        .domain[xDomainLowerBound, xDomainUpperBound]
        .range([0, graphWidth]);

</script>`;

export const codeBlockTwo = `<script>

let yFunction = 
    scaleLinear()
        .domain[0,100]
        .range([graphHeight,0])
        
</script>`;

export const codeBlockThree = `<script>

let lineFunction = 
    line()
        .x((d) => xFunction(d.x))
        .y((d) => yFunction(d.y))
        .curve(curveLinear)
        
</script>`;
