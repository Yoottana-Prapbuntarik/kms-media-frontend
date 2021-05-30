export let queryMyComment = (userId: string | number, userCommentList: any) => {
    try {
        
        let data = userCommentList.filter((item)=> {
            console.log(item)
            item.user_comment.id === userId
        })
        console.log(userId)
        console.log(data)
        if(data.length === 0) {
            return false
        }else{
            return true
        }
    } 
    catch (error) {
        console.log(error)
    }
}
