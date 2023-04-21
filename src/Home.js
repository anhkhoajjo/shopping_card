import './Home.css'
import data from './data.json'
import {useEffect, useRef, useState} from "react";


function Home() {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    const [shoes, setShoes] = useState(data.shoes);

    const [amount, setAmount] = useState(0);

    const [waitingShoes, setWaitingShoes] = useState([]);

    const [addedIdShoes, setAddedIdShoes] = useState([]);

    const [rerender, setRerender] = useState(true);
    const shoeRef = useRef();


    useEffect(() => {
        // handleAddButton()
    }, []);


    function handleAddButton(itemm) {
        // setWaitingShoes(prevState => ([...prevState,shoeRef.current]))
        //
        // const a = [1,2,3,4];
        // const b = a.map(item1 => item1 === 4 ? 9 : item1)
        setAddedIdShoes(prev => [...prev, itemm.id])
        const newItem = itemm
        newItem.quantity = 1
        setWaitingShoes(prevState => ([...prevState, newItem]))
    }


    function handleDeleteItem(item) {
        setWaitingShoes(prevState => [...prevState.splice(prevState.indexOf(item), 1)])
        setAddedIdShoes(prevState => [...prevState.splice(prevState.indexOf(item.id), 1)])
        console.log(waitingShoes)
        setRerender(prevState => !prevState)

    }


    function handleAddWaitingItem(shoe) {
        setWaitingShoes(prevState => {
            // console.log("begin:", typeof prevState)
            const newItem = prevState[prevState.indexOf(shoe)]
            newItem.quantity += 1
            return prevState
        })
        setRerender(prevState => !prevState)
    }



    function handleRemoveWaitingItem(shoe) {
        setWaitingShoes(prevState => {
            const newItem = prevState[prevState.indexOf(shoe)]
            newItem.quantity -= 1
            return prevState
        })
        // console.log(waitingShoes[waitingShoes.indexOf(shoe)].quantity)

        setRerender(prevState => !prevState)
    }


    return (
        <div className={"content"}>
            <div className={"card cardLeft"}>
                <div className={"cardLogo"}>
                    <img src={require("./asset/nike.png")} alt="logo"/>
                </div>
                <div className={"cardHeader"}>
                    Our Products
                </div>
                <div className={"cardBody"}>
                    {shoes.map((shoe,index) => (
                        <div key={index} className={"item"}>
                            <div className={"itemImage"}
                                 style={{backgroundColor: shoe.color}}>
                                <img src={shoe.image} alt="item"/>
                            </div>
                            <div className={"itemName"}>{shoe.name}</div>
                            <div className={"itemDescription"}>
                                {shoe.description}
                            </div>
                            <div className={"itemBottom"}>
                                <div className={"itemPrice"}>{formatter.format(shoe.price)}</div>
                                {!addedIdShoes.includes(shoe.id) &&
                                    <button id={shoe.id} className={"addButton buttonEffect"}
                                            onClick={() => handleAddButton(shoe)}> add to cart</button>}
                                {addedIdShoes.includes(shoe.id) && <button id={shoe.id} className={"checkedButton"}>
                                    <img src={require("./asset/check.png")} alt=""/>
                                </button>}
                            </div>
                        </div>

                    ))}
                </div>
            </div>

            <div className={"card cardRight"}>
                <div className={"cardLogo"}>
                    <img src={require("./asset/nike.png")} alt="logo"/>
                </div>
                <div className={"cardHeader"}>
                    <div>Your cart</div>
                    <div>{formatter.format(amount)}</div>
                </div>
                <div className={"cardBody fitToTop"}>
                    {waitingShoes.map((shoe,index) => (
                        <div key={index} className={"waitingItem"}>
                            <div className={"containerImage"}>
                                <img src={shoe.image} alt={shoe.name}/>
                            </div>
                            <div className={"detail"}>
                                <div className={"name"}>{shoe.name}</div>
                                <div className={"price"}>{formatter.format(shoe.price)}</div>
                                <div className={"bottomAction"}>
                                    <div className={"quantity"}>
                                        <button className={"roundButton buttonEffect"} onClick={()=>handleRemoveWaitingItem(shoe)}>
                                            <img src={require("./asset/minus.png")} alt=""/>
                                        </button>
                                        <div>{shoe.quantity ?? 1}</div>
                                        <button className={"roundButton buttonEffect"}
                                                onClick={() => handleAddWaitingItem(shoe)}>
                                            <img src={require("./asset/plus.png")} alt=""/>
                                        </button>
                                    </div>

                                    <div className={"delete"}>
                                        <button className={"roundButton buttonEffect"}
                                                onClick={() => handleDeleteItem(shoe)}>
                                            <img src={require("./asset/trash.png")} alt=""/>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
