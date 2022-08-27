import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${props => props.theme.white.darker};
`

const Functions = styled.section`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(4,1fr);
    font-size: 16px;
    margin-bottom: 15px;
`
const Query = styled.span`
    font-size: 22px;
    margin-bottom: 15px;
`
const Info = styled.div`
    font-size: 12px;
`
const InfoTitle = styled.div`
    font-size: 12px;
    margin-bottom: 15px;
`

const Footer = () => {
    return (
        <FooterSection>
            <Query>질문이 있으신가요? 문의 전화:  010-0000-5946</Query>
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
                <InfoTitle>넷플릭스 대한민국</InfoTitle>
                <h3>넷플릭스서비시스코리아 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호: 080-001-9587</h3>
                <h3>대표: 레지널드 숀 톰프슨</h3>
                <h3>이메일 주소: korea@netflix.com</h3>
                <h3>주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161</h3>
                <h3>사업자등록번호: 165-87-00119</h3>
                <h3>클라우드 호스팅: Amazon Web Services Inc.</h3>
                <h3>공정거래위원회 웹사이트</h3>
            </Info>
        </FooterSection>
    )
}

export default Footer;