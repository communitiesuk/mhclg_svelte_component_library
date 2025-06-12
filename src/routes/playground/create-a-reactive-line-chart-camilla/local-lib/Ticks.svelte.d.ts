export default Ticks;
type Ticks = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Ticks: import("svelte").Component<{
    ticksArray?: any;
    chartWidth: any;
    chartHeight: any;
    axisFunction: any;
    values: any;
    numberOfTicks: any;
    orientation: any;
}, {}, "ticksArray">;
type $$ComponentProps = {
    ticksArray?: any;
    chartWidth: any;
    chartHeight: any;
    axisFunction: any;
    values: any;
    numberOfTicks: any;
    orientation: any;
};
