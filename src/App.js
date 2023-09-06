
import './App.css';
import GraphPage from "./page/GraphPage";
import {useState} from "react";
import TxtReading from "./atom/TxtReading";
import styled from "styled-components";
import axios from "axios";
import GraphDisplay from "./page/ResponseGraphPage";

function App() {
    const [graphData, setGraphData] = useState(null);
    const [resData, setResData] = useState(null);
    console.log(graphData)
    console.log(resData)

    const handleGraphDataChange = (data) => {
        setGraphData(data);
    };

    const handleSendDataToServer = () => {
        if (graphData) {
            /* dummy data */

            // const dummyResponse = {
            //     data: {
            //         lgrf: [1.0, 2.3, 5.1, 3.4],
            //         rgrf: [0.8, 1.9, 4.8, 2.9],
            //     },
            // };
            //
            // setResData(dummyResponse.data);

            /* 더미 데이터 대신 서버로 전송할 데이터 준비 */
            const requestData = {
                lhs: graphData.LHS,
                lks: graphData.LKS,
                rhs: graphData.RHS,
                rks: graphData.RKS,
            };

            // Axios를 사용하여 서버에 POST 요청 보내기
            axios.post('', requestData)
                .then((res) => {
                    // 서버 응답을 받았을 때 실행되는 코드
                    setResData(res.data);
                })
                .catch((error) => {
                    // 에러 처리
                    console.error('서버 요청 중 에러 발생:', error);
                });
        }
    };

    return (
        <AppContainer>
            <h1 style={{ margin: "0 auto", paddingLeft: "30px" }}>Txt File Draw Graph</h1>
            <Container>
                <div>
                    <TxtReading onGraphDataChange={handleGraphDataChange} />
                    <SendButton onClick={handleSendDataToServer}>전송</SendButton>
                </div>
                <div>
                    <GraphPage graphData={graphData} />
                    <GraphDisplay responseData={resData} />
                </div>
            </Container>
        </AppContainer>
    );
}

const AppContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SendButton = styled.button`
  position: absolute;
  margin-top: 20px;
  border-radius: 4px;
  background-color: #36c75c;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  padding: 10px 30px;
  top: 45vh;
  left: 100px;
`;

export default App;
