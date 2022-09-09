import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

export const ExperimentList = () => {
  const navigate = useNavigate();

  return (
    <Container id={"experiment-list"}>
      <TitleBlock>
        <Title>实验列表</Title>
      </TitleBlock>
      <ContentBlock>
        <ContentCard onClick={() => navigate("/study/demo01")}>
          <CardTitleContainer>
            <CardTitle>样例#1</CardTitle>
            <CardSubTitle>
              当前为空
            </CardSubTitle>
          </CardTitleContainer>
          <CardChartContainer>

          </CardChartContainer>
        </ContentCard>
        <ContentCard onClick={() => navigate("/study/demo02")}>
          <CardTitleContainer>
            <CardTitle>样例#2 - 柱状图</CardTitle>
            <CardSubTitle>
              参考清华大学相关课程
            </CardSubTitle>
          </CardTitleContainer>
          <CardChartContainer />
        </ContentCard>
        <ContentCard onClick={() => navigate("/homework/hw1")}>
          <CardTitleContainer>
            <CardTitle>作业#1 -尝试可视化数据</CardTitle>
          </CardTitleContainer>

          <CardChartContainer>
            <CardSubTitle>未找到D3与React之间的最佳实践</CardSubTitle>
          </CardChartContainer>

        </ContentCard>
      </ContentBlock>
    </Container>
  );
};

const Container = styled.div`
  // to be added
  padding-bottom: 2rem;
`;

const TitleBlock = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5rem 0 3.5rem 0;
`;

const Title = styled.div`
  font-size: 4rem;
  font-weight: bold;
`;

const ContentBlock = styled.div`
  margin: 0 10rem;
`;

const ContentCard = styled.div`
  margin: 0 auto 3.5rem auto;
  border: 0.2rem solid #000000;
  border-left: 1rem solid #000000;
  max-width: 100rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;

const CardTitleContainer = styled.div`
  padding: 1rem 2rem;
  height: 12rem;
  width: calc(100% - 20rem);
  overflow: hidden;
`;

const CardTitle = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
`;

const CardSubTitle = styled.div`
  font-size: 2.05rem;
  color: #404040;
`;

const CardChartContainer = styled.div`
  height: 12rem;
  width: 20rem;
  background-color: #e0e0e0;
  font-size: 2rem;
  padding: 1rem;
`;
