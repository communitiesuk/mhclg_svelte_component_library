export default Axis;
type Axis = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Axis: import("svelte").Component<{
    chartHeight: any;
    chartWidth: any;
    numberOfTicks: any;
    ticksArray?: any;
    axisFunction: any;
    values: any;
    orientation: any;
}, {}, "ticksArray">;
type $$ComponentProps = {
    chartHeight: any;
    chartWidth: any;
    numberOfTicks: any;
    ticksArray?: any;
    axisFunction: any;
    values: any;
    orientation: any;
};
