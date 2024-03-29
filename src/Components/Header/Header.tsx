import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from "framer-motion";
import { Link, useMatch, useNavigate } from 'react-router-dom';
import { useScroll, useAnimationControls } from "framer-motion";
import { useForm } from 'react-hook-form';
import AuthService from '../../firebase/auth_service';
import { User } from 'firebase/auth';

interface IForm {
    keyword: string;
}

const Nav = styled(motion.nav)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    height: 70px;
    width: 100%;
    font-size: 14px;
    line-height: 20px;
    padding: 0 4%;
    z-index: 99999;
`;
const Col = styled.div`
    display: flex;
    align-items: center;
`;

const Logo = styled(motion.svg)`
    margin-right: 50px;
    width: 100px;
    height: 31px;
    fill: ${(props) => props.theme.red};
    cursor: pointer;
  path {
    stroke-width: 6px;
  }
`;

const Items = styled.ul`
    display: flex;
    align-items: center;
`;

const Menu = styled.li`
    position: relative;
    align-items: center;
    display: none;
    font-weight: 700;
    height: 100%;
    &::after{
        border-color: #fff transparent transparent;
        border-style: solid;
        border-width: 5px 5px 0;
        content: "";
        height: 0;
        margin-left: 5px;
        width: 0;
    }
    @media ${props => props.theme.device.mobileL} {
        display: flex;
    }
`;

const MenuItemWrapper = styled(motion.div)`
    position: absolute;
    left: -90px;
    top: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
    transition-duration: 150ms;
    background-color: ${props => props.theme.black.veryDark};
`;

const MenuItem = styled.li`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 100px;
    color: ${(props) => props.theme.white.darker};
    a{
        width: 50px;
        display: flex;
        justify-content: center;
    }
    &:hover{
        background: hsla(0,0%,100%,.2);
    }
`;
const Item = styled.li`
    position: relative;
    display: flex;
    margin-right: 20px;
    color: ${(props) => props.theme.white.darker};
    transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  @media ${props => props.theme.device.mobileL} {
    display: none;
  }
`;

const Search = styled.form`
    display: flex;
    align-items: center;
    color: white;
    position: relative;
    cursor: pointer;
    svg {
      height: 25px;
    }
    @media ${props => props.theme.device.tablet} {
        display: none;
    }
`;

const Circle = styled(motion.span)`
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    right: 0;
    left: 0;
    margin: 0 auto;
    bottom:-5px;
    background-color: ${props => props.theme.red};
`

const Input = styled(motion.input)`
    transform-origin: right center;
    position: absolute;
    right: 0px;
    padding: 5px 10px;
    padding-left: 40px;
    z-index: -1;
    color: white;
    font-size: 16px;
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.white.lighter};
`
const ProfileWrapper = styled(motion.div)`
    position: absolute;
    right: 0px;
    top: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 300px;
    transition-duration: 150ms;
    background-color: ${props => props.theme.black.veryDark};
`;

const UserName = styled.h3`
    font-size: 16px;
    font-weight: 500;
    padding: 5px 10px;
    text-align: center;
    color: ${props => props.theme.white.lighter};
    &:hover{
        background: hsla(0,0%,100%,.2);
    }
`;

const AuthButton = styled.h3`
    font-size: 16px;
    font-weight: 500;
    padding: 5px 10px;
    text-align: center;
    color: ${props => props.theme.white.lighter};
    &:hover{
        background: hsla(0,0%,100%,.2);
    }
`
const Profile = styled.div<{ bgPhoto: string }>`
    position: relative;
    width: 35px;
    height: 35px;
    border-radius: 7px;
    background-image: url(${props => props.bgPhoto});
    background-position: center;
    background-size: cover;
    margin-left: 15px;
    &::after{
        position: absolute;
        right: -15px;
        top: 15px;
        border-color: #fff transparent transparent;
        border-style: solid;
        border-width: 5px 5px 0;
        content: "";
        height: 0;
        margin-left: 5px;
        width: 0;
    }
`;

interface IHeaderProps {
    authService: AuthService
}

const opacityVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
}

const Header = ({ authService }: IHeaderProps) => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IForm>();
    const onSubmit = (data: IForm) => {
        navigate(`/search/${data.keyword}`);
    };
    const { scrollY } = useScroll();
    const navAnimation = useAnimationControls();
    const [searchOpen, setSearchOpen] = useState(false);
    const [isLogined, setIsLogined] = useState<User | null>();
    const [isMenuHovered, setMenuHovered] = useState<Boolean>(false);
    const [isProfileHovered, setProfileHovered] = useState<Boolean>(false);
    const homeMatch = useMatch('/');
    const tvMatch = useMatch('tv');
    const introMatch = useMatch('react-master');
    const toggleSearch = () => setSearchOpen(prev => !prev);
    const onLogOut = () => authService.logout();
    const goToLogin = () => navigate('/login');
    useEffect(() => {
        scrollY.onChange(() => {
            if (scrollY.get() < 80) {
                navAnimation.start({
                    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)",
                })
            } else {
                navAnimation.start({
                    backgroundImage: "linear-gradient(180deg,rgba(0,0,0,1) 100%,transparent)",
                })
            }
        })
    }, [scrollY, navAnimation]);
    useEffect(() => {
        authService.onAuthChange(user => {
            setIsLogined(user);
        })
    })
    return (
        <Nav animate={navAnimation} initial={{ backgroundImage: "linear-gradient(180deg,rgba(0,0,0,.7) 10%,transparent)" }}>
            <Col>
                <Link to='.'>
                    <Logo initial="normal" xmlns="http://www.w3.org/2000/svg" width="1024" height="276.742" viewBox="0 0 1024 276.742" fillOpacity="1">
                        <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" fill="#d81f26"></path>
                        <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" fill="#d81f26"></path>
                    </Logo>
                </Link>
                {!introMatch && isLogined ? (
                    <Items>
                        <Menu onMouseEnter={() => setMenuHovered(true)} onMouseLeave={() => setMenuHovered(false)}>
                            메뉴
                            <AnimatePresence>
                                {isMenuHovered && (
                                    <MenuItemWrapper variants={opacityVariants} exit="exit" animate="animate" initial="initial" onMouseEnter={() => setMenuHovered(true)} onMouseLeave={() => setMenuHovered(false)}>
                                        <MenuItem>
                                            <Link to='.'>
                                                홈
                                            </Link>
                                        </MenuItem>
                                        <MenuItem >
                                            <Link to='tv'>
                                                시리즈
                                            </Link>
                                        </MenuItem>
                                    </MenuItemWrapper>
                                )}
                            </AnimatePresence>
                        </Menu>
                        <Item>
                            <Link to='.'>
                                홈 {homeMatch && <Circle layoutId='circle' />}
                            </Link>
                        </Item>
                        <Item>
                            <Link to='tv'>
                                시리즈 {tvMatch && <Circle layoutId='circle' />}
                            </Link>
                        </Item>
                    </Items>
                ) : null}
            </Col>
            {isLogined ? (
                <Col>
                    {!introMatch && (
                        <Search onSubmit={handleSubmit(onSubmit)}>
                            <motion.svg
                                onClick={toggleSearch}
                                animate={{ x: searchOpen ? -210 : 0 }}
                                transition={{ type: 'linear' }}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <motion.path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                ></motion.path>
                            </motion.svg>
                            <Input {...register('keyword', { required: true, minLength: 2 })} animate={{ scaleX: searchOpen ? 1 : 0 }} transition={{ type: 'linear' }} placeholder='제목,사람,장르' />
                        </Search>
                    )}
                    <Profile onMouseEnter={() => setProfileHovered(true)} onMouseLeave={() => setProfileHovered(false)} bgPhoto={isLogined.photoURL ? isLogined.photoURL : 'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABRFZFS8db1R43jhQH8qYonvQ7XOdqfn1JEgczxD7Uz5vCGx-vnN18_sI8xORbinwQJzWgucNziIuHH8mhFA1iR7CGB8A4ms.png?r=eea'}>
                        <AnimatePresence>
                            {isProfileHovered && (
                                <ProfileWrapper variants={opacityVariants} exit="exit" animate="animate" initial="initial" onMouseEnter={() => setProfileHovered(true)} onMouseLeave={() => setProfileHovered(false)}>
                                    <UserName>{isLogined.displayName ? isLogined.displayName : isLogined.email}</UserName>
                                    <AuthButton onClick={onLogOut}>넷플릭스에서 로그아웃</AuthButton>
                                </ProfileWrapper>
                            )}
                        </AnimatePresence>
                    </Profile>
                </Col>
            ) : (
                <AuthButton onClick={goToLogin}>
                    로그인
                </AuthButton>
            )}
        </Nav>
    )
}

export default Header;