import { useEffect, useState } from "react"
import Chart from "react-google-charts"


function LineChart({histData}) {

    const [data, setData] = useState([["Date", "Prices"]])

    useEffect(() => {
        const dataCopy = [["Date", "Prices"]]
        if (histData.prices){
            histData.prices.map((item) => {
                dataCopy.push([`${new Date(item[0]).toLocaleDateString().slice(0, -5)}`, item[1]])
            })
            setData(dataCopy)
        }
    }, [histData])
  return (
    <Chart 
        chartType="LineChart"
        data={data}
        height="100%"
        legendToggle

    />
  )
}

export default LineChart