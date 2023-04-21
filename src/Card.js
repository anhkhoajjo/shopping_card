import './Home.css'


function Card() {
    return (
        <div className={"card"}>
            <div className={"cardLogo"}>
                <img src={require("./asset/nike.png")} alt="logo"/>
            </div>
            <div className={"cardTitle"}>
                Khoa
            </div>
            <div className={"cardBody"}>
                aloo lorem ispom
            </div>
        </div>


    );
}

export default Card;
