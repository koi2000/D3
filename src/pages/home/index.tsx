import styled from "@emotion/styled";
import {Button} from "antd";
import {ExperimentList} from "../component/exlist";


export const HomePage = () => {

    const redirect = (url: string) => {
        window.location.href = url;
    };

    return (
        <>
            <TitleBlock>
                <CenterBlock>
                    <p>你好，这是koi的可视化实验</p>
                </CenterBlock>
            </TitleBlock>


            <ExperimentList/>
        </>
    );
}

const TitleBlock = styled.div`
  width: 100%;
  height: 100vh;
  border-bottom: 0.1rem solid black;
`;

const CenterBlock = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
