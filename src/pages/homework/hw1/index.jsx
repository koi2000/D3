import * as d3 from "d3";
import {useEffect, useState, useRef} from "react";
import $ from 'jquery'
import styled from "@emotion/styled";
import './style.css';


export const Homework1 = () => {
    const [state, setState] = useState({
        opacity: 0,
        value: 0,
        left: 0,
        top: 0
    })
    useEffect(() => {
        drawHair()
        drawEye()
    }, [])


    var drawEye = () => {
        let eyeValue = [
            {"eyeColor": "Brown", "eyenumber": 220},
            {"eyeColor": "Blue", "eyenumber": 215},
            {"eyeColor": "Hazel", "eyenumber": 93},
            {"eyeColor": "Green", "eyenumber": 64},
        ]
        console.log(eyeValue)
        const eye = d3.select("#eye")

        const width = eye.attr('width')
        const height = eye.attr('height')
        const margin = {top: 60, right: 30, bottom: 60, left: 150};
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = (height - margin.top - margin.bottom) / 2;
        const transx = 150;
        const transy = 100;
        const eyeGroup = eye.append('g').attr('transform', `translate(${transx},${transy})`)
        const xeValue = d => d.eyeColor
        const yeValue = d => d.eyenumber
        const yeScale = d3.scaleLinear();
        const xeScale = d3.scaleBand();

        xeScale.domain(eyeValue.map(xeValue)).range([0, innerWidth]).padding(0.05);
        yeScale.domain([0, d3.max(eyeValue, yeValue) + 10]).range([innerHeight, 0]);
        eyeGroup.selectAll('.bar').data(eyeValue).enter().append('rect')
            .attr("class", "bar")
            .attr('height', d => innerHeight - yeScale(yeValue(d)))
            .attr('width', xeScale.bandwidth())
            .attr('y', d => yeScale(yeValue(d)))
            .attr('x', d => xeScale(xeValue(d)));

        // eyeGroup.selectAll("text")
        //     .data(eyeValue.map(yeValue))
        //     .enter()
        //     .append("text")
        //     .text((d) => d)
        //     .attr("x", (d, i) => i * 30)
        //     .attr("y", (d, i) => innerHeight - (3 * d) - 3)

        const xAxisMethod = d3.axisBottom().scale(xeScale);
        const yAxisMethod = d3.axisLeft().scale(yeScale);
        const xAxisGroup = eyeGroup.append('g').call(xAxisMethod)
        const yAxisGroup = eyeGroup.append('g').call(yAxisMethod)
        xAxisGroup.attr('transform', `translate(${0}, ${innerHeight})`)
        //yAxisGroup.attr('transform', `translate(${0}, ${innerHeight / 2})`)
        xAxisGroup.append("g").call(xAxisMethod).append("text")
            .style('font-weight', 500)
            .style('font-family', 'Arial')
            .attr("x", xeScale.bandwidth() + 100)
            .style('fill', 'black').text("eyeColor")
        yAxisGroup.append("g").call(yAxisMethod).append("text")
            .style('font-weight', 500)
            .style('font-family', 'Arial')
            .attr("x", 0)
            .attr("y", 0)
            .style('fill', 'black').text("number")

    }


    var drawHair = () => {
        // 找到svg标签
        const svg = d3.select('#hair');
        // 读取属性
        const width = svg.attr('width');
        const height = svg.attr('height');
        // 设置边框
        const margin = {top: 60, right: 30, bottom: 60, left: 150};
        //const margin = {top: 0, right: 0, bottom: 0, left: 0};
        // 计算真实的大小
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        // 创建一个组
        const mainGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)
        const xValue = d => d.hairnumber;
        const yValue = d => d.hairColor;
        // 创建线性比例尺
        const xScale = d3.scaleLinear();
        // 创建离散型比例尺
        const yScale = d3.scaleBand();
        // 构造数据
        let hairValue = [
            {"hairColor": "Black", "hairnumber": 108},
            {"hairColor": "Brown", "hairnumber": 286},
            {"hairColor": "Red", "hairnumber": 71},
            {"hairColor": "Blond", "hairnumber": 127},
        ]

        console.log(hairValue);
        // 为比例尺设置定义域和值域
        yScale.domain(hairValue.map(yValue)).range([0, innerHeight / 2]).padding(0.05);
        xScale.domain([0, d3.max(hairValue.map(d => d.hairnumber))]).range([0, innerWidth / 2]);
        // 开始绑定数据
        mainGroup.selectAll('rect').data(hairValue).join('rect')
            .attr('height', yScale.bandwidth())
            .attr('width', d => xScale(xValue(d)))
            .attr('color', 'red')
            .attr('x', 0)
            .attr('y', d => yScale(yValue(d)))
            .attr('value', d => (xValue(d)))

        // var tooltip = svg.append("div")
        //     .attr("class", "tooltip")
        //     .style("opacity", 1.0);

        var div = d3.select("#hair").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)
            .style("color", "red")
        ;

        function getData() {
            console.log("yes")
            console.log($(this))
            alert($(this).attr("value"));
        }

        mainGroup.selectAll('rect')
            .on("click", getData)
            .on("mouseover", e => {
                console.log(e)
                // showTip(e)
                //设置tooltip文字
                var data = e.path[0].__data__.hairnumber;
                console.log(data)
                setState({
                    opacity: 0.8,
                    left: (e.pageX) + "px",
                    top: (e.pageY) + 20 + "px",
                    value: data
                })
            })
            .on("mouseout", e => {
                setState({
                    opacity: 0,
                })
            })


        // 创建
        const xAxisMethod = d3.axisBottom(xScale);
        const yAxisMethod = d3.axisLeft(yScale);
        // 创建一个x轴的组
        const xAxisGroup = mainGroup.append('g').call(xAxisMethod)
        // 创建一个y轴的组
        const yAxisGroup = mainGroup.append('g').call(yAxisMethod);

        xAxisGroup.attr('transform', `translate(${0}, ${innerHeight / 2})`)

        xAxisGroup.append("g").call(xAxisMethod).append("text")
            .style('font-weight', 500)
            .style('font-family', 'Arial')
            .attr("x", d3.max(hairValue.map(d => d.hairnumber)) + 10)
            .attr("y", 0)
            .style('fill', 'black').text("number")
        yAxisGroup.append("g").call(yAxisMethod).append("text")
            .style('font-weight', 500)
            .style('font-family', 'Arial')
            .style('fill', 'black').text("hairColor")
    }

    return (
        <>
            <svg width="800" height="400" id="hair" className="svg"></svg>
            <svg width="800" height="400" id="eye" className="svg"></svg>
            <div className={"detail-window"} style={{
                opacity: state.opacity,
                left: state.left,
                top: state.top
            }}>
                {state.value}
            </div>
        </>
    );

}
const TitleBlock = styled.div`
  width: 100%;
  height: 100vh;
  border-bottom: 0.1rem solid black;
`;
const toolBox = styled.div`
  position: fixed;
  text-align: center;
  width: 60px;
  height: 28px;
  padding: 2px;
  background: lightsteelblue;
  border: 0px;
  border-radius: 8px;
  pointer-events: none;
`;

