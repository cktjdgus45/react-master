import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.white.darker};
    width: 100%;
    height: 40vh;
    padding: 50px 20%;
`

const Functions = styled.section`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4,1fr);
    font-size: 14px;
    margin-bottom: 25px;
    height: auto;
    width: 100%;
`
const Query = styled.div`
    width: 100%;
    height: auto;
    font-size: 15px;
    margin-bottom: 45px;
`
const Info = styled.div`
    font-size: 12px;
    width: 100%;
    margin-bottom: 25px;
    `
const InfoTitle = styled.div`
    width: 100%;
    font-size: 12px;
    margin-bottom: 25px;
`

const Footer = () => {
    return (
        <FooterSection>
            <Query>질문이 있으신가요? 문의 전화: 010-0000-5946</Query>
            <Functions>
                <span>자주 묻는 질문</span>
                <span>고객 센터</span>
                <span>계정</span>
                <span>미디어 센터</span>
                <span>투자 정보(IR)</span>
                <span>입사</span>
                <span> 정보넷플릭스 </span>
                <span>지원 </span>
                <span>디바이스이용</span>
                <span> 약관개인정보쿠키 </span>
                <span> 설정회사 </span>
                <span>    테스트법적</span>
                <span>   고지오직</span>
                <span>  넷플릭스에서</span>
            </Functions>
            <Info>
                <InfoTitle>넷릭스 코리아</InfoTitle>
                <h3>넷릭스코리아 무한회사 통판매업번호: 제2022-화성봉담-0000호 전화번호: 000-000-8564</h3>
                <h3>대표: 봉담 차성현</h3>
                <h3>이메일 주소: cktjdgus45@.com</h3>
                <h3>주소: 경기도 화성시 봉담읍 상리 35-10, 센트로폴리스 B동 26층 우편번호 18316</h3>
                <h3>사업자등록번호: 000-00-00000</h3>
                <h3>클라우드 호스팅: Amazon Web Services Inc.</h3>
                <h3>공정거래위원회 웹사이트</h3>
            </Info>
        </FooterSection>
    )
}

export default Footer;