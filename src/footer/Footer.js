function Footer(){
    return (
        <div className="container-fluid bg-dark text-light">
             <div className="row">
                <div className="col-md-4 d-flex align-items-center justify-content-start ml-2" style={{'height' : '60px'}}>
                    <div className="m-2">Contact</div>
                    <div className="m-2 ri-2x"><i className="ri-facebook-circle-fill"></i></div>
                    <div className="m-2 ri-2x"><i className="ri-instagram-line"></i></div>
                    <div className="m-2 ri-2x"><i className="ri-mail-send-line"></i></div>
                    <div className="m-2 ri-2x"><i className="ri-phone-line"></i></div>
                </div>

                <div className="col-md-4 d-flex align-items-center justify-content-center ml-2" style={{'height' : '60px'}}>
                    &copy; Copyrights reserved 2023
                </div>
             </div>
        </div>
    )
}

export default Footer