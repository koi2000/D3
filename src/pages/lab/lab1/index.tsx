import * as d3 from "d3";
import {useEffect, useState} from "react";
import {PieChart} from "./pie-chart";
import {BarChart} from "./bar-chart";
import styled from "@emotion/styled";

export interface census {
    Sex: number,
    Year: number,
    Age: number,
    People: number
}

export interface AggAge {
    Age: String,
    Year: Number,
    Sex: Number,
    Number: number
}

export interface PieDataProps {
    data: AggAge[];
    colorMap: string;
    // dimensions: [number, number];
}

const toAggAge = (rawData: census[]): (AggAge | undefined)[] => {
    var aggAges: (AggAge | undefined)[] = rawData.map((data, index) => {
        if (data.Age <= 4) {
            let agg: AggAge = {
                Age: "幼儿",
                Year: data.Year,
                Sex: data.Sex,
                Number: data.People
            }
            return agg
        } else if (data.Age <= 11) {
            let agg: AggAge = {
                Age: "儿童",
                Year: data.Year,
                Sex: data.Sex,
                Number: data.People
            }
            return agg
        } else if (data.Age <= 18) {
            let agg: AggAge = {
                Age: "少年",
                Year: data.Year,
                Sex: data.Sex,
                Number: data.People
            }
            return agg
        } else if (data.Age <= 35) {
            let agg: AggAge = {
                Age: "青年",
                Year: data.Year,
                Sex: data.Sex,
                Number: data.People
            }
            return agg
        } else if (data.Age <= 59) {
            let agg: AggAge = {
                Age: "中年",
                Year: data.Year,
                Sex: data.Sex,
                Number: data.People
            }
            return agg
        } else if (data.Age >= 60) {
            let agg: AggAge = {
                Age: "老年",
                Year: data.Year,
                Sex: data.Sex,
                Number: data.People
            }
            return agg
        }
    })
    return aggAges;
    // var mp:Map<String, number> =new Map<String, number>();
    //
    // aggAges.forEach((item)=>{
    //     var key:String = item?.Age as String;
    //     if(mp.has(key)){
    //         // @ts-ignore
    //         mp.set(key,mp.get(key) as number + item?.Number as number);
    //     }else{
    //         mp.set(key,item?.Number as number);
    //     }
    // })
    // let res: AggAge[] = [];
    // mp.forEach((value,key)=>{
    //     let agg = {
    //         Age:key,
    //         Number:
    //         Number:value
    //     }
    //     res.push(agg)
    // })
    // return res;
}


export const Lab1 = () => {
    const [data, setData] = useState<census[] | undefined>();
    const [pieData, setPieData] = useState<AggAge[] | undefined>();
    const [pieOldData, setPieOldData] = useState<AggAge[] | undefined>();
    const [pieNewData, setPieNewData] = useState<AggAge[] | undefined>();

    const [sexManOldData, setSexManOldData] = useState<AggAge[] | undefined>();
    const [sexWomenOldData, setSexWomenOldData] = useState<AggAge[] | undefined>();

    const [sexManNewData, setSexManNewData] = useState<AggAge[] | undefined>();
    const [sexWomenNewData, setSexWomenNewData] = useState<AggAge[] | undefined>();

    var pieDatas = [];
    useEffect(() => {
        d3
            .csv("../../data/lab1/census2000.csv", d3.autoType)
            .then((data) => {
                setData(data as census[])
                return data
            }).then((data) => {
            // @ts-ignore
            var aggAges: AggAge[] = toAggAge(data as census[]);

            setPieData(aggAges as AggAge[]);
            pieDatas = aggAges;
            var old = pieDatas?.filter((item) => {
                if (item.Year === 1900) {
                    return item
                }
            })
            setPieOldData(old)
            var news = pieDatas?.filter((item) => {
                if (item.Year === 2000) {
                    return item
                }
            })
            setPieNewData(news)

            var sexManOld = pieDatas?.filter((item) => {
                if (item.Year === 1900 && item.Sex === 1) {
                    return item
                }
            })
            setSexManOldData(sexManOld);
            var sexWomenOld = pieDatas?.filter((item) => {
                if (item.Year === 1900 && item.Sex === 2) {
                    return item
                }
            })
            setSexWomenOldData(sexWomenOld);

            var sexManNew = pieDatas?.filter((item) => {
                if (item.Year === 2000 && item.Sex === 1) {
                    return item
                }
            })
            setSexManNewData(sexManNew);
            var sexWomenNew = pieDatas?.filter((item) => {
                if (item.Year === 2000 && item.Sex === 2) {
                    return item
                }
            })
            setSexWomenNewData(sexWomenNew);
        })
    }, [])


    // @ts-ignore
    return (
        <Container>
            {data ? (
                <>
                    <ChartContainer id={"1"}>
                        {/* @ts-ignore*/}
                        <PieChart data={pieNewData} ids={1} year={pieNewData[0].Year} title={"1900年各年龄段人口比例"}/>
                    </ChartContainer>

                    <ChartContainer id={"2"}>
                        {/* @ts-ignore*/}
                        <PieChart data={pieOldData} ids={2} year={pieOldData[0].Year} title={"2000年各年龄段人口比例"}/>
                    </ChartContainer>

                    <ChartContainer id={"3"}>
                        {/* @ts-ignore*/}
                        <BarChart oldData={pieOldData} newData={pieNewData} type={"age"} title={"1900-2000各年龄段人口对比图"}
                                  xScale={"年龄段"} yScale={"人数（万）"}/>
                    </ChartContainer>


                    <ChartContainer id={"4"}>
                        {/* @ts-ignore*/}
                        <BarChart oldData={sexManOldData} newData={sexWomenOldData} type={"oldSex"}
                                  title={"1900年各年龄段性别对比图"}
                                  xScale={"年龄段"} yScale={"人数（万）"}/>
                    </ChartContainer>

                    <ChartContainer id={"5"}>
                        {/* @ts-ignore*/}
                        <BarChart oldData={sexManNewData} newData={sexWomenNewData} type={"newSex"}
                                  title={"2000年各年龄段性别对比图"}
                                  xScale={"年龄段"} yScale={"人数（万）"}/>
                    </ChartContainer>

                </>) : null
            }
        </Container>
    );
}

const Container = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: -5fr -5fr -5fr;
  grid-template-areas:
    "chart-1 chart-2 chart-none"
    "chart-3 chart-4 chart-5";
  grid-row-gap: 1px;
`;

const ChartContainer = styled.div<{ id: string }>`
  grid-area: chart-${(props) => props.id};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  color: #808080;
`;