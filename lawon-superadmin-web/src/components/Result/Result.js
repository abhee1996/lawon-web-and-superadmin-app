import React,{Component} from 'react'
import { connect } from 'react-redux'
 
class Result extends Component{
    render(){
        return(
            <div>
                <button onClick={this.props.OnClickResult} >Result</button>
                        {this.props.storedResults.map(strResult=>(
                        <li key={strResult.id}onClick={ ()=>this.props.OnClickDelete(strResult.id)}>{strResult.value}</li>
                    ))}
                        
            </div>
        )
    }
}
const mapStoreToProps = state => {
    return {
        storedResults: state.results 

    };
};

const mapDispatchToProps= dispatch =>{
    return{
        OnClickResult : () => dispatch ({type:'STORE_RESULT'}),
        OnClickDelete : (id) => dispatch ({type:'DELETE_RESULT',resultElId:id})
    }
}
export default connect(mapStoreToProps,mapDispatchToProps) (Result)