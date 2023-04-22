import './Home.css'
import data from './data.json'
import {useEffect, useRef, useState} from "react";
// import ReactCSSTransitionGroup from 'react-transition-group';
import {TransitionGroup, CSSTransition} from 'react-transition-group'


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

    const nodeRef = useRef(null);


    useEffect(() => {
        // handleAddButton()
    }, []);

    console.log("to count num render")
    console.log(waitingShoes)

    function handleAmount() {
        if (waitingShoes) {
            let amount = 0
            for (let i = 0, l = waitingShoes.length; i < l; i++) {
                amount += waitingShoes[i].totalAmount ? waitingShoes[i].totalAmount : 0
            }
            setAmount(amount)
        }
    }

    useEffect(() => {
        console.log("length waiting shoe:")
        console.log("length waiting shoe:", waitingShoes.length)
        if (waitingShoes) {
            let amount = 0
            for (let i = 0, l = waitingShoes.length; i < l; i++) {
                console.log("quantity: ", waitingShoes[i].quantity)
                if (waitingShoes[i].quantity <= 0) {
                    console.log(waitingShoes[i])
                    const deleteItem = waitingShoes[i].id
                    setWaitingShoes(prev => prev.filter(item => item.id !== deleteItem))
                }
                amount += waitingShoes[i].totalAmount ? waitingShoes[i].totalAmount : 0
            }
            setAmount(amount)
        }
        console.log("dang o effect", waitingShoes)

    }, [waitingShoes, rerender]);


    function handleAddButton(itemm) {
        setAddedIdShoes(prev => [...prev, itemm.id])
        const newItem = itemm
        newItem.quantity = 1
        newItem.totalAmount = newItem.price * newItem.quantity
        // console.log(waitingShoes.reduce((prev,cur)=>prev.totalAmount + cur.totalAmount,0))
        // console.log(waitingShoes.reduce((prev,cur)=>prev.totalAmount + cur.totalAmount,0))
        setWaitingShoes(prevState => ([...prevState, newItem]))
    }


    function handleDeleteItem(shoe) {
        console.log("shoe:", shoe)
        console.log("truoc khi xoa")
        console.log(waitingShoes)
        setWaitingShoes(prevState => prevState.filter(item => item !== shoe))
        setAddedIdShoes(prevState => prevState.filter(item => item !== shoe.id))
        console.log("dang xoa")
        console.log(waitingShoes)
        setRerender(prevState => !prevState)
    }


    function handleAddWaitingItem(shoe) {
        setWaitingShoes(prevState => {
            const newItem = prevState[prevState.indexOf(shoe)]
            newItem.quantity += 1
            newItem.totalAmount = newItem.price * newItem.quantity
            return prevState
        })
        setRerender(prevState => !prevState)
    }


    function handleRemoveWaitingItem(shoe) {
        setWaitingShoes(prevState => {
            const newItem = prevState[prevState.indexOf(shoe)]
            newItem.quantity -= 1
            newItem.totalAmount = newItem.price * newItem.quantity
            if (newItem.quantity <= 0) {
                setRerender(prevState => !prevState)//dang test
                handleDeleteItem(shoe)
                console.log("chuan bi xoa nha")
            }
            return prevState
        })
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
                    {shoes.map((shoe, index) => (
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

                    <TransitionGroup>
                        {waitingShoes.map((shoe, index) => (
                            <CSSTransition
                                key={shoe.id}
                                in={!waitingShoes.includes(shoe)}
                                timeout={700}
                                classNames="waitingItem"
                                // unmountOnExit
                                // onEnter={() => setShowButton(false)}
                                // onExited={() => (true)}
                                // appear={true}
                            >
                                {
                                    <div key={index}
                                         className={`waitingItem`}>
                                        <div className={"containerImage"}>
                                            <div className={"circleBackground"}
                                                 style={{backgroundColor: shoe.color}}></div>
                                            <img src={shoe.image} alt={shoe.name}/>
                                        </div>
                                        <div className={"detail"}>
                                            <div className={"name"}>{shoe.name}</div>
                                            <div className={"price"}>{formatter.format(shoe.price)}</div>
                                            <div className={"bottomAction"}>
                                                <div className={"quantity"}>
                                                    <button className={"roundButton buttonEffect"}
                                                            onClick={() => handleRemoveWaitingItem(shoe)}>
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
                                }
                            </CSSTransition>
                        ))}
                    </TransitionGroup>


                </div>
            </div>
        </div>
    );
}

export default Home;
