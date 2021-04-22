import {
    NavDropdown,
    Navbar,
    Nav
} from "react-bootstrap";
import Router from "next/router";
import Link from 'next/link';
import './nav.scss';
import { Fragment, useEffect, useState } from "react";
const Navigation = ({ navigationPresenter, signinComponentPresenter, getUserData }: any) => {
    const [isScroll, setIsScroll] = useState(false)
    useEffect(() => {
        getUserData()
        window.onscroll = () => {
            if (window.pageYOffset === 0) {
                setIsScroll(false)
            } else {
                setIsScroll(true)
            }
        };
    }, [])

    const logout = () => {
        localStorage.removeItem('access-token')
        Router.push('/signin')
    }
    return (
        <Fragment>

            <Navbar className={`nav-custome ${isScroll === true ? 'position-nav-fixed' : 'position-nav-relative'}`} expand="lg">
                <div className="container-fluid text-center">
                    <div className="h-100 d-flex align-items-center w-25">
                        <Link href="/" passHref>
                            <Navbar.Brand >
                                Logo
                            </Navbar.Brand>
                        </Link>
                    </div>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="justify-content-center w-50 margin-auto-nav-mobile">
                            {
                                navigationPresenter.navigationItems.map((navLinkList, idx: number) => {
                                    return (
                                        // navLinkList.keyTitle !== "Category" ?
                                        <Fragment key={idx}>
                                            <div className="d-flex justify-content-around">

                                                <Link href={navLinkList.routePath} key={idx} passHref>
                                                    <a className="nav-link link-navbar  w-140px">
                                                        {navLinkList.keyTitle}
                                                    </a>
                                                </Link>
                                            </div>
                                        </Fragment>
                                        // : 
                                        // <Fragment key={idx}>
                                        //     <NavDropdown title={navLinkList.keyTitle} id="basic-nav-dropdown">
                                        //         {
                                        //             navLinkList.routePath.map((items, index: number) => {
                                        //                 return (
                                        //                     <Link
                                        //                         key={index}
                                        //                         href={{
                                        //                             pathname: `/category/${items.path}`,
                                        //                             query: { name: items.type }
                                        //                         }}
                                        //                         passHref>
                                        //                         <NavDropdown.Item className="my-2">
                                        //                             {items.type}
                                        //                         </NavDropdown.Item>
                                        //                     </Link>
                                        //                 )
                                        //             })
                                        //         }
                                        //     </NavDropdown>
                                        // </Fragment>
                                    )
                                })
                            }
                        </Nav>
                        <Nav className="mx-auto">
                            <div className="d-flex flex-detect-size-nav  justify-content-around align-items-center">
                                {
                                    navigationPresenter.social.map((navSocial, idx: number) => {
                                        return (
                                            <Link href={navSocial.routePath} passHref key={idx}>
                                                <a className="nav-link link-social">
                                                    {

                                                        <img className="img-social" src={navSocial.keyTitle} alt="icon social" />
                                                    }
                                                </a>
                                            </Link>
                                        )
                                    })
                                }
                                {
                                    signinComponentPresenter.userProfile.date_joined !== "" &&
                                        signinComponentPresenter.userProfile.date_joined !== undefined ?
                                        <>
                                            <Link href={
                                                {
                                                    pathname: "/profile",
                                                    query: {
                                                        firstName: signinComponentPresenter.userProfile.first_name,
                                                        lastName: signinComponentPresenter.userProfile.last_name,
                                                        uuid: signinComponentPresenter.userProfile.id
                                                    }
                                                }
                                            }>
                                                <a className="font-weight-bold text-dark user-profile-image">
                                                    <div className="d-flex justify-content-around align-items-center">
                                                        <div className="w-25">
                                                            <div
                                                                className="d-block user-image">
                                                                <img
                                                                    src={signinComponentPresenter.userProfile.image === "" || signinComponentPresenter.userProfile.image === null  ? "/assets/images/default.png": signinComponentPresenter.userProfile.image 
                                                                    }
                                                                    alt={signinComponentPresenter.userProfile.first_name} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            Hello, <span className="text-green">{`${signinComponentPresenter.userProfile.first_name === "" ? "Admin" :
                                                                signinComponentPresenter.userProfile.first_name.toUpperCase()}`}</span>
                                                        </div>
                                                    </div>
                                                </a>
                                            </Link>
                                            <a className="nav-link  link-social w-140px" onClick={() => logout()}>Sign out</a>
                                        </> :
                                        <>
                                            <Link href={"/signin"}>
                                                <a className="nav-link link-navbar">
                                                    Sign in
                                                </a>
                                            </Link>

                                            <Link href={"/signup"}>
                                                <a className="nav-link link-navbar">
                                                    Sign up
                                                </a>
                                            </Link>
                                        </>
                                }
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        </Fragment>
    )
}

export default Navigation
