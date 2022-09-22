import {AggAge, census, PieDataProps} from "./index";
import {useEffect} from "react";
import * as d3 from "d3";
import styled from "@emotion/styled";


export const SexBarChart = (props) => {
    function convert(datas) {
        var mp = new Map();
        datas.forEach((item) => {
            var key = item.Age
            if (mp.has(key)) {
                // @ts-ignore
                mp.set(key, mp.get(key) + item.Number);
            } else {
                mp.set(key, item?.Number);
            }
        })
        let res = [];
        mp.forEach((value, key) => {
            let agg = [key, value]
            res.push(agg)
        })
        return res
    }

    function drawLegend() {
        //图例数组，格式可自定义
        const data_legend = [
            {
                "name": "1900",
                "color": "#c23531"
            },
            {
                "name": "2000",
                "color": "#2f4554"
            },
        ];
        const width = 100;
        const height = 200;
        //初始化图例，将data_legend与图例绑定
        var svg = d3.select("#legend").attr('width', '100%')
            .attr('height', '100%')
            .attr("transform", "translate(" + (width+50) + "," + height/3 + ")");

        var legend = svg.selectAll(".legend")
            .data(data_legend)
            .enter().append("g")
            .attr("class", "legend")
            .attr("transform", function (d, i) {
                return "translate(-30," + (i * 20 + 30) + ")";
            });  //transform属性便是整个图例的坐标

        //绘制文字后方的颜色框或线
        legend.append("rect")
            .attr("x", width - 25) //width是svg的宽度，x属性用来调整位置
            // .attr("x", (width / 160) * 157)
            //或者可以用width的分数来表示，更稳定一些，这是我试出来的，下面同
            .attr("y", 8)
            .attr("width", 40)
            .attr("height", 3) //设低一些就是线，高一些就是面，很好理解
            .style("fill", function (d) {
                return d.color
            });

        //绘制图例文字
        legend.append("text")
            .attr("x", width - 30)
            // .attr("x", (width / 40) * 39)
            .attr("y", 15)
            .attr("font-size","12px")
            .style("text-anchor", "end") //样式对齐
            .text(function (d) {
                return d.name;
            })
    }

    useEffect(() => {


        const [width, height] = [600, 600];
        const svg = d3.select("#bar")
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 ${width} ${height}`);
        /* category 类目数据 */
        //const category = ['html', 'css', 'js'];
        var oldData = []
        var newData = []
        oldData = convert(props.oldData)
        newData = convert(props.newData)

        const category = oldData.map((item) => {
            return item[0]
        });
        const len = category.length;
        /*用range()方法，基于类目数量，获取x轴的在图表坐标系中的数据 xChartData，如[0,1,2]*/
        const xChartData = d3.range(len);
        /*x轴在像素坐标内的起始点和结束点 xPixelRange，左右各偏移50*/
        const xPixelData = [50, width - 50];
        /*
        * 用scaleBand()方法建立分段比例尺 xScale
        * 用domain()方法在比例尺中写入图表数据xChartData
        * 用rangeRound()方法在比例尺中写入像素数据，即像素的起始位和结束位xPixelRange
        * */
        let xScale = d3.scaleBand().domain(xChartData).range(xPixelData).padding(0.2);
        // xScale = d3.scaleBand().domain(xChartData).rangeRound(xPixelData).padding(0.1);
        /*基于比例尺xScale，用axisBottom()方法创建刻度朝下的坐标轴生成器 xAxisGenerator*/
        const xAxisGenerator = d3.axisBottom(xScale)

        /*利用坐标轴生成器绘制坐标轴
        *   在svg中append 加入g 对象
        *   用attr() 方法设置transform 属性中的translate位置
        *   用call()方法调用xAxisGenerator轴生成器，生成坐标轴
        *   用selectAll()方法选择所有的text文本
        *   用text()方法将图表数据设置为类目数据
        *   用style()方法设置字体大小
        * */
        svg.append('g')
            .attr('transform', `translate(0 ${height - 50})`)
            .call(xAxisGenerator)
            .selectAll('text')
            .text((d, i) => category[i])
            .style('font-size', '12px')//默认字体大小为10px

        // 数据作为二维的就可以放在一起展示
        const source = [
            //html css js
            oldData.map((item) => {
                return item[1] / 10000
            }),
            newData.map((item) => {
                return item[1] / 10000
            })
        ]
        const maxY = Math.max(...source.flat())

        /*声明y轴在图表坐标系中的数据起点和结束点 yChartRange*/
        const yChartRange = [0, maxY]

        /* 声明y轴在像素坐标系中的数据起点和结束点 yPixelRange */
        // 设置映射后的区间
        const yPixelRange = [height - 50, 50]
        // 线性数据使用scaleLinear
        const yScale = d3.scaleLinear()
            .domain(yChartRange)
            .range(yPixelRange)
        //
        const yAxisGenerator = d3.axisLeft(yScale)
        svg.append('g')
            .attr('transform', 'translate(50,0)')
            .call(yAxisGenerator)
            .style('font-size', '12px')
        // 调色盘
        const color = ['pink', 'darkblue', '#c23531', '#2f4554']
        /*用x轴比例尺xScale的bandwidth()方法获取x轴上一个类目的像素宽xBandW*/
        const sBandW = xScale.bandwidth();

        /*获取系列的数量n*/
        const n = source.length;

        /*用类目宽除以系列数，得到一个类目中每个系列元素的宽，即列宽colW*/
        const colW = sBandW / n;

        /*计算调色盘颜色数量colorLen*/
        const colorLen = color.length


        const seriesObjs = svg.append('g')
            .selectAll()
            .data(source)
            .join('g')
            .attr('transform', (seriesData, seriesInd) => {
                const seriesX = seriesInd * colW
                return `translate(${seriesX} 0)`
            })
            .attr('fill', (seriesData, seriesInd) => {
                return color[seriesInd % colorLen]
            })
        /*  在系列集合中建立柱状体集合rects
        *   用系列集合seriesObjs 的selectAll()方法选择所有的rect元素，用于建立选择集对象
        *   用data()方法将之前绑定在每个系列集合中的数据绑定到柱状体集合中
        *   用join()基于每个系列的数据数据批量创建rect元素
        *   用classed() 方法为其添加item属性
        * */
        const rects = seriesObjs.selectAll('g')
            .data(seriesData => seriesData)
            .join('rect')
            .classed('item', true)
        rects.attr('x', (rectData, rectInd) => xScale(rectInd))
            .attr('width', colW)
            .attr('y', (rectData, rectInd) => yScale(rectData))
            .attr('height', (rectData, rectInd) => yScale(0) - yScale(rectData))
        // const dimensions = ["1900", "2000"];
        // const source2 = source.map((seriesData,seriesInd)=>{
        //     const seriesName=dimensions[seriesInd]
        //     return seriesData.map((rectData,rectInd)=>{
        //         const rectName=category[rectInd]
        //         return {rectData,rectInd,rectName,seriesInd,seriesName}
        //     })
        // })
        // rects.attr('x',({rectData,rectInd})=>xScale(rectInd))
        //     .attr('width',colW)
        //     .attr('y',({rectData,rectInd})=>yScale(rectData))
        //     .attr('height',({rectData,rectInd})=>yScale(0)-yScale(rectData))
        drawLegend()
    }, [])


    return (
        <>
            <svg id="legend" style={{
                width: "100",
                height: "200",
            }}/>
            <svg
                id={"bar"}
                className="svg" style={{
                width: "360",
                height: "360",
                margin: "auto"
            }}/>
        </>
    )
}

