import React,{Component} from 'react'
import PropTypes from '../../node_modules/prop-types'
import axios from '../../node_modules/axios'
export default class Main extends Component{
    static propTypes = {
        searchName:PropTypes.string
    }
    state = {
        initView : true, /*是否是初始界面:请输入关键字...*/
        loading : false,/*是否显示：loading*/
        users : null,
        errorMsg : null
    }

    //当组件接受到新的属性时回调
    componentWillReceiveProps(nextProps, nextContext) {
        const {searchName} = nextProps // 获取新的参数
        this.setState( //更新一下state，换界面
            {initView:false,
                   loading:true}
        )
        //发请求
        const url='https://api.github.com/search/users?q='+searchName
        axios.get(url)
            .then(response =>{//成功
                const result=response.data
                const users = result.items.map(item=>({name:item.login,url:item.html_url,avatarUrl:item.avatar_url}))
                this.setState({
                    loading:false,users:users
                })
            })
            .catch(error =>{//失败
                this.setState({loading:false,errorMsg:error.msg})

            })
    }


    render(){
        const {initView,loading,users,errorMsg} = this.state
        const {searchName}=this.props
        if(initView){
            return <h2>请输入关键字搜索...{searchName}</h2>
        }
        else
            if(loading){
                return <h2>正在请求中...</h2>
            }
            else
                if(errorMsg){
                    return <h2>{errorMsg}</h2>
            }   else{
                    return (
                        <div className="row">
                            {
                                users.map((user,index)=> (
                                    <div key={index} className="card">
                                        <a href={user.url} target="_blank">
                                            <img src={user.avatarUrl} style={{width: 100}}/>
                                        </a>
                                        <p className="card-text">{user.name}</p>
                                    </div>))
                            }
                        </div>
                    )}

    }
}
