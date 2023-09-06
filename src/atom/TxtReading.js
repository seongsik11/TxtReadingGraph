import React, { useState } from 'react';
import styled from 'styled-components';
import GraphPage from "../page/GraphPage";

const StyledFileInput = styled.input`
  display: none; /* 실제 파일 입력 필드를 감추기 */
`;

const UploadButton = styled.label`
  position: absolute;
  top: 42vh;
  left: 90px;
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;


function TxtReading({ onGraphDataChange, handleSendDataToServer }) {
    // TxtReading 컴포넌트에서 읽어온 데이터를 처리하고 데이터 상태 업데이트
    const [fileContent, setFileContent] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const content = e.target.result;
            setFileContent(content);
            // 파일 내용을 그래프 데이터로 변환
            const graphData = processData(content);
            onGraphDataChange(graphData);
        };

        reader.readAsText(file);
    };

    const processData = (content) => {
        const lines = content.split('\n');
        const graphData = {};

        const headers = lines[0].split('\t');
        console.log('Headers:', headers); // 헤더 확인

        // 각 헤더를 속성으로 가지는 빈 배열을 graphData에 설정합니다.
        for (const header of headers) {
            graphData[header] = [];
        }

        for (let i = 1; i < lines.length; i++) {
            if (lines[i]) {
                const values = lines[i].split('\t').map((value) => value.trim());

                // 각 열의 데이터를 숫자로 변환하여 해당 열에 push합니다.
                for (let j = 0; j < headers.length; j++) {
                        graphData[headers[j]].push(parseFloat(values[j]));
                }
            }
        }
        return graphData;
    };




    return (
        <div>
            <StyledFileInput type="file" accept=".txt" id="fileInput" onChange={handleFileUpload} />
            <UploadButton htmlFor="fileInput">Upload File</UploadButton>
        </div>
    );
}

export default TxtReading;
