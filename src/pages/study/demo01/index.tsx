import React, {useEffect, useState} from "react";
import * as d3 from "d3";

export interface DataItem {
    platform: string
    globalsale: number
}


async function getData(fileLocation: string) {
    const data = await d3.csv(fileLocation, (row) => {
        // return {
        //     date: new Date(row.Date),
        //     close: parseFloat(row.Close),
        // };
        console.log(row);
        return row
    });
    return data;
}


export const StudyDemo01 = () => {
    const [data, setData] = useState<DataItem[] | undefined>();

    const svg = d3.select('svg');
    // const width = Number(1600);
    // const height = Number(800);
    const width = Number(svg.attr('width'));
    const height = Number(svg.attr('height'));
    const margin = {top: 60, right: 30, bottom: 60, left: 150};
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const mainGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
    const xScale = d3.scaleLinear();
    const yScale = d3.scaleBand();

    useEffect(() => {
        // getData("../../../data/titanic_disaster.csv")
        // getData("../../data/platform_globalsale.csv")

        d3.csv("../../data/platform_globalsale.csv").then(data => {
            console.log(data);
        });
        d3.csv(
            "../../data/platform_globalsale.csv",
            d3.autoType
        ).then((dataz) => {
            // @ts-ignore
            setData(dataz as DataItem[])
            console.log(dataz);
            return dataz as DataItem[]
        }).then((data) => {
            yScale.domain(data.map(d => d.platform)).range([0, innerHeight]).padding(0.1);
            console.log("asd");
            let maxx: any = d3.max(data.map(d => d.globalsale));
            xScale.domain([0, maxx]).range([0, innerWidth]);
            // data-join for rectangles:
            //
            // @ts-ignore
            // @ts-ignore
            // mainGroup.selectAll('rect').data(data).join('rect')
            //     .attr('height', yScale.bandwidth())
            //     .attr('width', d => xScale(d.globalsale))
            //     .attr('x', 0)
            //     .attr('y', d => yScale(d.platform));
            // adding axes:
            const xAxisMethod = d3.axisBottom(xScale);
            const yAxisMethod = d3.axisLeft(yScale);
            const xAxisGroup = mainGroup.append('g').call(xAxisMethod);
            const yAxisGroup = mainGroup.append('g').call(yAxisMethod);
            xAxisGroup.attr('transform', `translate(${0}, ${innerHeight})`);
        })

    }, [])

    return (
        <>

            <svg width="1600" height="800" id="mainsvg" className="svgs"></svg>

            {/*<svg width="1600" height="800" id="mainsvg" className="svgs" style={{'display': 'block', 'margin': 0}}>*/}
            {/*    <g id='maingroup' transform='translate(100, 100)'>*/}
            {/*        <circle id='circle1'*/}
            {/*                stroke='black' r='66' fill='#4B8E6F' cx='0'></circle>*/}
            {/*        <rect id='rect1' className='class2'*/}
            {/*              stroke='black' height='200' width='66' fill='#ff8603' x='100' y='-100'></rect>*/}
            {/*        <rect id='rect2' className='class1'*/}
            {/*              stroke='black' height='200' width='66' fill='#ffde1d' x='200' y='-100'></rect>*/}
            {/*        <rect id='rect3' className='class1'*/}
            {/*              stroke='black' height='200' width='66' fill='#7289AB' x='300' y='-100'></rect>*/}
            {/*        <text id='myText' className='class2'*/}
            {/*              stroke='yellow' font-size='2em' x='400' fill='#1e9d95'>Hey D3!*/}
            {/*        </text>*/}
            {/*    </g>*/}
            {/*    <g id='secondgroup' transform='translate(550, 100)'>*/}
            {/*        <rect id='rect4' className='class2'*/}
            {/*              stroke='black' height='200' width='66' fill='#DD6B66' x='100' y='-100'></rect>*/}
            {/*        <rect id='rect5' className='class1'*/}
            {/*              stroke='black' height='200' width='66' fill='#759AA0' x='200' y='-100'></rect>*/}
            {/*        <rect id='rect6' className='class1'*/}
            {/*              stroke='black' height='200' width='66' fill='#E69D87' x='300' y='-100'></rect>*/}
            {/*    </g>*/}
            {/*</svg>*/}
        </>
    );
}