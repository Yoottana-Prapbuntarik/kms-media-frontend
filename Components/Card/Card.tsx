import { Card } from "react-bootstrap";
import Link from 'next/link'
import './card.scss'
import { useState, useEffect } from "react";
import { getPost, getPostCategory } from "../../apis/Services/getAllArtcleAPIClient";
import { connect } from "react-redux";
import { LikeArtcleScore} from "../../utils/featureLike";
import { useRouter } from "next/router";
let pathIgnore = {
    searchResults: "/search-results"
}
const CardContent = ({ data, presenter }: any) => {
    const router = useRouter()
    const [dataItems, setData] = useState([])
    const  [queryId, setQueryId] = useState(null)
    useEffect(() => {
        if(router.query.id !== undefined) {
            setQueryId(router.query.id)
        }
        setData(data)
    }, [data])

    const likeArticle = (blogId, userLike) => {
        LikeArtcleScore(blogId, userLike).then(() => {
            setTimeout(() => {
                if(queryId != null){
                    getPostCategory(queryId).then(result => {
                        setData(result)
                    })
                }else{
                    getPost().then(result => {
                        setData(result['blog'])
                    })
                }
            }, 100);
        })
    }

    return (
        <div className="card-columns">
            {
                dataItems.map((items, idx) => {
                    return (
                        <Card key={idx}>
                            <Link href={{ pathname: "/detail", query: { content: items.id } }}>
                                <a>
                                    <div className="img-wrapper">
                                        <Card.Img variant="top" src={items.cover} />
                                    </div>
                                </a>
                            </Link>
                            {
                            router.pathname !== pathIgnore.searchResults &&
                            <div className="wrapper-like" onClick={() => likeArticle(items.id, presenter.signinComponentReducer.userProfile.id)} >
                                <div className="like">
                                    <div className="like-inside">
                                        <div className="pb-3">
                                            <img className="w-100" src="/assets/images/logo/heart-icon.png" alt="heart-icon" />
                                        </div>
                                        <div className="text-like  w-100 text-center">
                                            {items.fk_like_blog.length}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                            <Card.Body>
                                <p className="text-warning font-weight-bold mt-5">Trending</p>
                                <h5>{items.title}</h5>
                                <div>
                                    <p>
                                        {items.sub_title}
                                    </p>
                                    <div className="d-flex pb-3">
                                        <div className="d-flex w-50 justify-content-start">{items.own_user.first_name + " " + items.own_user.last_name}</div>
                                        <div className="d-flex w-50 justify-content-end">{items.pub_date.slice(0, 10)}</div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    )
                })
            }
        </div>
    )
}


const mapStateToProps = state => {
    return { presenter: state };
}

export default connect(mapStateToProps)(CardContent)

