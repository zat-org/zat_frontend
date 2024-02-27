import { Chart as ChartJS, Title, Colors, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
export default defineNuxtPlugin((nuxtApp) => {
    ChartJS.register(Title, Tooltip, Colors, Legend, BarElement, CategoryScale, LinearScale)
    ChartJS.defaults.font.weight = "bold";
})