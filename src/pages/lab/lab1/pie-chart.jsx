import {AggAge, census, PieDataProps} from "./index";
import {useEffect} from "react";
import * as d3 from "d3";
import $ from 'jquery'
import styled from "@emotion/styled";

export const PieChart = (props) => {
    useEffect(() => {
        // 声明margin，半径的大小，颜色
        var margin = {top: 20, right: 20, bottom: 20, left: 20};
        var width = 340 - margin.right - margin.left;
        var height = 290 - margin.top - margin.bottom;
        var radius = width / 2;
        // 声明颜色
        var color = d3.scaleOrdinal()
            .range(["#BBDEFB", "#98CAF9", "#64B5F6", "#42A5F5", "#2196F3", "#1E88E5", "#1976D2"]);
        // 生成弧度生成器
        var arc = d3.arc()
            .outerRadius(radius - 10)
            .innerRadius(0)

        var labelArc = d3.arc()
            .outerRadius(radius - 50)
            .innerRadius(radius - 50)
        // 声明饼图生成器
        const pie = d3.pie()
            .sort(null)
            .value(d => d[1]);
        // 定义画布
        var svg = d3.select("#pie" + props.ids)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 1.5 + ")");

        var datas = props.data.map((item) => {
            return {Age: item.Age, Number: item.Number}
            //return [item.Age,item.Number]
        })

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

        //console.log(pie(datas))
        var g = svg.selectAll(".arc")
            .data(pie(res))
            .enter().append("g")
            .attr("class", "arc")

        function pieTween(b) {
            b.innerRadius = 0;
            var i = d3.interpolate({startAngle: 0, endAngle: 0}, b);
            return function (t) {
                return arc(i(t));
            };
        }

        g.append("path")
            .attr("d", arc)
            .style("fill", d => color(d.data[0]))
            .transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attrTween("d", pieTween);
        // 添加文字
        g.append("text")
            .transition()
            .ease(d3.easeLinear)
            .duration(2000)
            .attr("transform", function (d) {
                var pos = labelArc.centroid(d);
                pos[0] -= 20;
                return "translate(" + pos + ")";
            })
            .attr("dy", ".35em")
            .text(function (d) {
                return d.data[0];
            }).attr('font-size', '15')
    }, [])

    return (
        <>
            <div style={{
                display: "block",
                width:300,
                height:350
            }}>
                <svg
                    id={"pie" + props.ids}
                    className="svg" style={{
                    width: "360",
                    height: "360",
                    margin: "auto"
                }}/>
                <p style={{
                    position: "relative",
                    fontSize: "14px",
                    height: 40,
                    top: "-80px",
                    left: "80px"
                }}>{props.title}</p>
            </div>
        </>
    )
}

const CenterBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;