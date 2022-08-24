import './App.css';
import {useEffect, useState} from "react";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Badge, Input, Button, Row, Col, Table, Card} from "reactstrap"

function App() {
    const [Ticker, setTicker] = useState('KRW-BTC');
    const [OrderBook, setOrderBook] = useState([]);
    const [Call, setCall] = useState([]);
    const [Market, setMarket] = useState([]);

    useEffect(() => {
        const getOrderBook = async (ticker) =>{
            let url = 'https://api.upbit.com/v1/orderbook?markets='+ticker;
            await axios.get(url).then((res) => {
                setOrderBook(res.data[0].orderbook_units);
            })
        }
        const getCall = async (ticker) =>{
            let url = 'https://api.upbit.com/v1/ticker?markets=' + ticker;
            await axios.get(url).then((res) => {
                setCall(res.data);
            })
        }
        const getMarket = async () =>{
            await axios.get('https://api.upbit.com/v1/market/all?isDetails=false').then((res) => {
                for (let i = 0; i < 5; ++i){
                    setMarket(prev => {return [...prev, res.data[i].market]});
                }
            })
        }
        getMarket();
        setInterval(getCall,1000, Ticker);
        setInterval(getOrderBook,1000, Ticker);
    }, [])




    return (
        <div style={{margin : "10px"}}>
            <Row>
                <Col><Input placeholder={"access-key"}/></Col>
                <Col><Input placeholder={"secret-key"}/></Col>
                <Col><Button onClick={() => console.log(Ticker)}>Login</Button></Col>
            </Row>
            <Row md={"2"}>
                <Card style={{margin : "10px", backgroundColor : "rgba(18,97,196,0.08)"}}>
                    <Table borderless>
                        <thead>
                            <th style={{textAlign : "center"}}>Select Ticker</th>
                            <th style={{textAlign : "center"}}>Market</th>
                            <th style={{textAlign : "center"}}>Trade_price</th>
                        </thead>
                        <tbody>
                        {Call.map((tic, idx) => {
                            return(
                                <tr key={idx}>
                                    <td><Input type={'select'} onChange={(e) => setTicker(e.target.value)}>
                                        {Market.map((market, idx) => {
                                            return(
                                            <option key={idx}>{market}</option>
                                            )
                                        })}
                                    </Input></td>
                                    <td style={{textAlign : "center"}}><h3>{tic.market}</h3></td>
                                    <td style={{textAlign : "center"}}><h3>{tic.trade_price}</h3></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </Card>
            </Row>
            <Row>
                <Col md = "6" >
                    <Card style={{backgroundColor : "rgba(18,97,196,0.08)"}}>
                        <Row>
                            <Col>
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    {OrderBook.map((infor, idx) => {
                                        return(
                                            <tr key={idx}>
                                                <td style={{ textAlign: "center"}}>{infor.ask_size}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    {OrderBook.map((infor, idx) => {
                                        return(
                                            <tr key={idx}>
                                                <td style={{ textAlign: "center", color : "#c84a31"  }}>{infor.ask_price}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>

                            </Col>
                        </Row>
                        <Row>
                            <Col>

                            </Col>
                            <Col>
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    {OrderBook.map((infor, idx) => {
                                        return(
                                            <tr key={idx}>
                                                <td style={{ textAlign: "center", color : "#0062df" }}>{infor.bid_price}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col>
                                <Table bordered>
                                    <thead>
                                    </thead>
                                    <tbody>
                                    {OrderBook.map((infor, idx) => {
                                        return(
                                            <tr key={idx}>
                                                <td style={{ textAlign: "center" }}>{infor.bid_size}</td>
                                            </tr>
                                        )
                                    })
                                    }
                                    </tbody>
                                </Table>

                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col md = "6">
                    <Card>

                    </Card>

                </Col>
            </Row>

        </div>
    );
}

export default App;
