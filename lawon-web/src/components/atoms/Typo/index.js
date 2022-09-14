import React from 'react'


function Typo(props){
    var style={
        color: props.styledObj.color,
        fontFamily:props.styledObj.fontFamily,
        fontWeight:props.styledObj.fontWeight,
        fontSize:props.styledObj.fontSize,
        marginTop:props.styledObj.marginTop,
        marginBottom:props.styledObj.marginBottom,
        marginLeft:props.styledObj.marginLeft,
        marginRight:props.styledObj.marginRight,
        paddingTop:props.styledObj.paddingTop,
        paddingBottom:props.styledObj.paddingBottom,
        paddingLeft:props.styledObj.paddingLeft,
        paddingRight:props.styledObj.paddingRight,
        
    }

    return(
      
            <p style={style}>
                {props.styledObj.text}
            </p>
      
    )
}
export default Typo