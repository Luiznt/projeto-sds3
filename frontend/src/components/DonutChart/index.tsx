import axios from 'axios';
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { SalesSum } from 'types/sales';
import { BASE_URL } from 'utils/requests';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    /*
    // Forma errada. exibida aqui apenas para efeitos didaticos.
    let chartData: ChartData = { labels: [], series: [] };
    // a string do get pode ser com crase: `${BASE_URL}/sales/amount-by-seller`
    // ou com aspas simples: BASE_URL + '/sales/amount-by-seller'
    axios.get(`${BASE_URL}/sales/amount-by-seller`)
        .then(response => {
            const data = response.data as SalesSum[];
            const myLabels = data.map(x => x.sellerName);
            const mySeries = data.map(x => x.sum);

            chartData = {labels: myLabels, series: mySeries};
            //console.log(response.data)
            console.log(chartData);
        }
        );
    // a forma errada faz com que ocorra esta chamada varias vezes pelo browser
    // e também não controla corretamente o estado, ja que dependendo da renderização
    // do grafico, o axios pode serexecutado diversas vezes.
    */

    //FORMA CORRETA
    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/amount-by-seller`)
            .then(response => {
                const data = response.data as SalesSum[];
                const myLabels = data.map(x => x.sellerName);
                const mySeries = data.map(x => x.sum);

                setChartData({ labels: myLabels, series: mySeries });
            });
    }, []);

    /* usado apenas como mockup
    const mockData = {
        series: [477138, 499928, 444867, 220426, 473088],
        labels: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    }
    */

    const options = {
        legend: {
            show: true
        }
    }

    /* usado no mockup
    return (
        <Chart
            options={{ ...options, labels: mockData.labels }}
            series={mockData.series}
            type="donut"
            height="240"


        />
    );
    */
    return (
        <Chart
            options={{ ...options, labels: chartData.labels }}
            series={chartData.series}
            type="donut"
            height="240"


        />
    );
}

export default DonutChart;