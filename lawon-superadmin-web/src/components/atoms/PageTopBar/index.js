import React from 'react'

export default function PageTopBar({title}) {
    const pddBtn = { 
        width: "65px", 
        fontSize: "18px", 
        height: "28px",
        border: "1px solid rgb(254, 180, 29)",borderRadius: "4px",
        background: "linear-gradient(to right, rgb(254, 180, 29) 0%, rgb(255, 206, 106) 100%)",
}
    return (
        <div className="row">
            <div className="col-md-10" style={{fontSize: "40px",paddingBottom: "20px",}}>
                {title}
            </div>
            <div className="col-md-2">
                <button class="create-new-plan-btn" style={pddBtn}>
                  <i class="fa fa-download" aria-hidden="true"></i>
                </button></div>

        </div>
    )
}
