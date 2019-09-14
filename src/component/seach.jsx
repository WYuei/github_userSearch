import React,{Component} from 'react'
import PropTypes from '../../node_modules/prop-types'


export default class Search extends Component{
    constructor(props)
    {
        super(props)
    }
    static propTypes={
        setSearchName:PropTypes.func
    }
    search = () => {
        //得到输入的数据
        const searchName = this.input.value.trim()
        if(searchName){
            this.props.setSearchName(searchName)
        }

    }


    render(){
        return (
            <section className="jumbotron">
                <h3 className="jumbotron-heading">Search Github Users</h3>
                <div>
                    <input type="text" placeholder="enter the name you search" ref={input => this.input=input}/>
                    <button onClick={this.search}>Search</button>
                </div>
            </section>
        )
    }
}
