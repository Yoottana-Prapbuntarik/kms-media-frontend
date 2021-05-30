import {
    NavDropdown,
    Navbar,
    Nav
} from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Router from "next/router";
import Link from 'next/link';
import './nav.scss';
import { Fragment, useEffect, useState } from "react";
const Navigation = ({ navigationPresenter, signinComponentPresenter, getUserData }: any) => {
    const [isScroll, setIsScroll] = useState(false)
    const [keyword, setKeyword] = useState("")
    const [toggleSearch, setToggleSearch] = useState(false)
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

    const search = () => {
        Router.push({
            pathname: "/search-results",
                query: {
                    keyword: keyword
                    }
                })
        setToggleSearch(false)
        }


  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        Router.push({
            pathname: "/search-results",
                query: {
                    keyword: keyword
                    }
                })
        setToggleSearch(false)
        }
    }
    
    return (
        <Fragment>

            <Navbar className={`nav-custome ${isScroll === true ? 'position-nav-fixed' : 'position-nav-relative'}`} expand="xl">
                <div className="container-fluid text-center">
                    <div className="h-100 d-flex align-items-center w-25">
                        <Link href="/" passHref>
                            <Navbar.Brand >
                                <img src="/assets/images/logo/logo-media.png" alt="Media kmutt"/>
                            </Navbar.Brand>
                        </Link>
                    </div>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="justify-content-between align-items-center w-50 margin-auto-nav-mobile">
                            {
                                navigationPresenter.navigationItems.map((navLinkList, idx: number) => {
                                    return (
                                        // navLinkList.keyTitle !== "Category" ?
                                        <Fragment key={idx}>
                                        {

                                            <div className="d-flex justify-content-around">

                                                <Link href={navLinkList.routePath} key={idx} passHref>
                                                    <a className="nav-link link-navbar  w-100">
                                                        {navLinkList.keyTitle}
                                                    </a>
                                                </Link>
                                            </div>
                                        }

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
                                                <a className="nav-link link-social" onClick={()=> setToggleSearch(!toggleSearch)} key={idx}>
                                                    {

                                                        <img className="img-social" src={navSocial.keyTitle} alt="icon social" /> 
                                                    }
                                                </a>
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
                                            
                                        </> :
                                        <>
                                            <Link href={"/signin"}>
                                                <a className="nav-link link-navbar">
                                                    Sign in
                                                </a>
                                            </Link>
                                               |
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
            <Modal
                show={toggleSearch}
                size="xl"
                onHide={() => setToggleSearch(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    Search 
                </Modal.Header>
                <Modal.Body>
                <div className="d-flex">
                    <input type="text" className="form-control" onChange={(e)=> setKeyword(e.target.value)} onKeyDown={(e) => handleKeyDown(e)}/>
                    <button className="btn" onClick={()=> search()}>Search</button>
                </div>
                </Modal.Body>
            </Modal>
        </Fragment>
    )
}

export default Navigation
