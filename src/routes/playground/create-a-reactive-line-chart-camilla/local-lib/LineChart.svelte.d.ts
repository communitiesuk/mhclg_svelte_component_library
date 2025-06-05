export default LineChart;
type LineChart = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const LineChart: import("svelte").Component<{
    data: any;
    numberOfTicks: any;
}, {}, "">;
type $$ComponentProps = {
    data: any;
    numberOfTicks: any;
};
