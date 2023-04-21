import './Home.css'
import Card from "./Card";


function Home() {
    return (
        <div className={"content"}>
            <div className={"card cardLeft"}>
                <div className={"cardLogo"}>
                    <img src={require("./nike.png")} alt="logo"/>
                </div>
                <div className={"cardTitle"}>
                    Our Products
                </div>
                <div className={"cardBody"}>
                    <div className={"item"}>
                        <div className={"image"}>
                            <img src={require("./item.png")} alt="item"/>
                        </div>
                        <div className={"itemName"}>Nike Air Zoom Pegasus 36</div>
                       <div className={"itemDescription"}>
                           lorem ispum is o num pum
                       </div>
                       <div className={"itemBottom"}>
                           <div className={"itemPrice"}>$187.99</div>
                           <button className={"addButton"} > add to cart</button>
                       </div>
                    </div>
                </div>
            </div>

            <div className={"card cardRight"}>
                <div className={"cardLogo"}>
                    <img src={require("./nike.png")} alt="logo"/>
                </div>
                <div className={"cardTitle"}>
                    Your cart
                </div>
                <div className={"cardBody"}>
                    aloo lorem ispom
                </div>
            </div>
        </div>
    );
}

export default Home;
