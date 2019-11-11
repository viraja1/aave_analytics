import React, {Component} from 'react';

import {Card, CardColumns, Button, ListGroup, Navbar} from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion'

import Web3 from "web3";
import LendingPool from "./LendingPool.json"

let web3 = new Web3("https://kovan.infura.io/v3/fb273e470a4d496980fabe3f1dc68466");
const contract = new web3.eth.Contract(LendingPool, '0xB36017F5aafDE1a9462959f0e53866433D373404');

let tokenMapping = {
  "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD": "DAI",
  "0x1c4a937d171752e1313D70fb16Ae2ea02f86303e": "TUSD",
  "0xe22da380ee6B445bb8273C81944ADEB6E8450422": "USDC",
  "0x13512979ADE267AB5100878E2e0f485B568328a4": "USDT",
  "0xD868790F57B39C9B2B51b12de046975f986675f9": "SUSD",
  "0x1BCe8A0757B7315b74bA1C7A731197295ca4747a": "LEND",
  "0x2d12186Fbb9f9a8C28B3FfdD4c42920f8539D738": "BAT",
  "0x804C0B38593796bD44126102C8b5e827Cf389D80": "ETH",
  "0xAD5ce863aE3E4E9394Ab43d4ba0D80f419F61789": "LINK",
  "0x3b92f58feD223E2cB1bCe4c286BD97e42f2A12EA": "WBTC",
  "0xd2eC3a70EF3275459f5c7a1d5930E9024bA3c4f3": "AMPL",
  "0x3F80c39c0b96A0945f9F0E9f55d8A8891c5671A8": "KNC",
  "0x260071C8D61DAf730758f8BD0d6370353956AE0E": "REP",
  "0x61e4CAE3DA7FD189e52a4879C7B8067D7C2Cc0FA": "MKR",
  "0x738Dc6380157429e957d223e6333Dc385c85Fec7": "MANA",
  "0xD0d76886cF8D952ca26177EB7CfDf83bad08C00C": "ZRX",
  "0x8Ac14CE57A87A07A2F13c1797EfEEE8C0F8F571A": "aDAI",
  "0x3BE8B64104de5b809AAd0eC4514C97A58878eE14": "aTUSD",
  "0x20AD264D06f0Cf265054589577c8c2297C26B6C4": "aUSDC",
  "0xD0F559C8ed680e5666Acb7CB068a6964ee05122c": "aUSDT",
  "0x5537e2b41E6a1e6f72e28B93c48D9EA11caa5A94": "aSUSD",
  "0x538e2C4Fc148f5483fDbb4f24A042B76111F3114": "aLEND",
  "0xEAe6283C6A1EB7E29CA9A4B3F049C894DA7216c1": "aBAT",
  "0x436264Ac032f7f271934Fa920dcD655210193090": "aETH",
  "0x7d2a39c2A3a74d7570f487E203230D3aC00cea80": "aLINK",
  "0xf065FD0972a98D9F1c01AB3EE2D4efbbbb5bD1F7": "aWBTC",
  "0xdE460f92901185d24090BcF6cAc3B37308b2b98A": "aAMPL",
  "0x67F548FC6831222b8565eA69589fd7dc56d2C3Ba": "aKNC",
  "0xA46d949aB1fc89c33C5CD8163482Eb84BE0A9a8c": "aREP",
  "0x0697A93267f6c656023F8a5b489435591b849698": "aMKR",
  "0xaAc40ceEf68B662643fB9ec641E11a40b7c90B0a": "aMANA",
  "0x3b9743C458ae58c30069D14e98A2745aD3982480": "aZRX"
};


export default class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      inProgress: false,
      stats: {},
      allTransactions: [],
      users: [],
      liquidity: [],
      deposit: [],
      borrow: [],
      flashLoans: []
    };
  }

  getHumanReadableDate(epoch) {
    let date = new Date(0);
    date.setUTCSeconds(epoch);
    let readableString = date.toUTCString();
    if (readableString === "Invalid Date") {
      return ''
    }
    return readableString;
  }

  render() {
    return (
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/">
            {'Aave Analytics'}
          </Navbar.Brand>
        </Navbar>
        {this.state.inProgress === true && <div style={{margin: "20px"}}>Fetching Analytics .....</div>}
        <CardColumns style={{margin: "20px"}}>
          <Card>
            <Card.Body>
              <Card.Title>Transaction Count</Card.Title>
              <Card.Text>
                {this.state.allTransactions.length}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#2196f3"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>User Count</Card.Title>
              <Card.Text>
                {this.state.users.length}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#4caf50"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Borrow</Card.Title>
              <Card.Text>
                {this.state.stats.Borrow || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#f44336"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Deposit</Card.Title>
              <Card.Text>
                {this.state.stats.Deposit || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#9c27b0"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>FlashLoan</Card.Title>
              <Card.Text>
                {this.state.stats.FlashLoan || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#673ab7"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Redeem Underlying</Card.Title>
              <Card.Text>
                {this.state.stats.RedeemUnderlying || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#3f51b5"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Repay</Card.Title>
              <Card.Text>
                {this.state.stats.Repay || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#ffc107"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Swap</Card.Title>
              <Card.Text>
                {this.state.stats.Swap || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#9e9e9e"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Reserve Collateral Disabled</Card.Title>
              <Card.Text>
                {this.state.stats.ReserveUsedAsCollateralDisabled || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#ff9800"}}>

            </Card.Footer>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Reserve Collateral Enabled</Card.Title>
              <Card.Text>
                {this.state.stats.ReserveUsedAsCollateralEnabled || 0}
              </Card.Text>
            </Card.Body>
            <Card.Footer style={{backgroundColor: "#ff5722"}}>

            </Card.Footer>
          </Card>
        </CardColumns>

        <div style={{margin: "20px"}}>
          {this.state.allTransactions.length > 0 &&
          <div style={{height: "300px", marginBottom: "10px"}} className="transaction-list">
            <b>Transaction Events</b>
            <ListGroup style={{height: "100%", overflow: "scroll", marginTop: "10px"}}>
              {this.state.allTransactions.map((transaction, i, allTransactions) => (
                <ListGroup.Item key={"card-key-" + String(i)} style={{wordWrap: "break-word"}}>
                  <b>Event</b>: {transaction.event}
                  <br/>
                  <b>Timestamp</b>: {this.getHumanReadableDate(transaction.returnValues.timestamp)}
                  <br/>
                  <b>Amount</b>: {(transaction.returnValues._amount / 1e18).toFixed(3)} {tokenMapping[transaction.returnValues[0]]}
                  <br/>
                  <b>Transaction Hash</b>: <a href={"https://kovan.etherscan.io/tx/" + transaction.transactionHash}
                                              target="_blank">{transaction.transactionHash}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          }
          <br/>
          <br/>
          {this.state.liquidity.length > 0 &&
          <div style={{height: "300px"}} className="reserve-list">
            <b>aToken Stats</b>
            <Accordion style={{height: "100%", overflow: "scroll", marginTop: "10px"}}>
              {this.state.liquidity.map((reserve, i, liquidity) => (
                <Card key={"card-key-" + String(i)}>
                  <Accordion.Toggle as={Button} variant="" eventKey={i} data-toggle="collapse">
                    <Card.Header>
                      {tokenMapping[reserve.aTokenAddress]}
                    </Card.Header>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={i}>
                    <Card.Body>
                      <ul>
                        <li><b>Total Liquidity</b>: {(reserve.totalLiquidity / 1e18).toFixed(3)}</li>
                        <li><b>Available Liquidity</b>: {(reserve.availableLiquidity / 1e18).toFixed(3)}</li>
                        <li><b>Total Borrows Fixed</b>: {(reserve.totalBorrowsFixed / 1e18).toFixed(3)}</li>
                        <li><b>Total Borrows Variable</b>: {(reserve.totalBorrowsVariable / 1e18).toFixed(3)}</li>
                        <li><b>Liquidity Rate</b>: {(reserve.liquidityRate / 1e25).toFixed(3)}</li>
                        <li><b>Variable Borrow Rate:</b>: {(reserve.variableBorrowRate / 1e25).toFixed(3)}</li>
                        <li><b>Fixed Borrow Rate</b>: {(reserve.fixedBorrowRate / 1e25).toFixed(3)}</li>
                        <li><b>Average Fixed Borrow Rate</b>: {(reserve.averageFixedBorrowRate / 1e25).toFixed(3)}</li>
                        <li><b>Utilization Rate</b>: {(reserve.utilizationRate / 1e25).toFixed(3)}</li>
                      </ul>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </Accordion>
            <br/>
          </div>
          }
          <br/>
          <br/>
          {this.state.deposit.length > 0 &&
          <div style={{height: "300px", marginBottom: "10px"}} className="transaction-list">
            <b>Top 10 Deposits</b>
            <ListGroup style={{height: "100%", overflow: "scroll", marginTop: "10px"}}>
              {this.state.deposit.map((transaction, i, deposit) => (
                <ListGroup.Item key={"card-key-" + String(i)} style={{wordWrap: "break-word"}}>
                  <b>Event</b>: {transaction.event}
                  <br/>
                  <b>Timestamp</b>: {this.getHumanReadableDate(transaction.returnValues.timestamp)}
                  <br/>
                  <b>Amount</b>: {(transaction.returnValues._amount / 1e18).toFixed(3)} {tokenMapping[transaction.returnValues[0]]}
                  <br/>
                  <b>Transaction Hash</b>: <a href={"https://kovan.etherscan.io/tx/" + transaction.transactionHash}
                                              target="_blank">{transaction.transactionHash}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          }
          <br/>
          <br/>
          {this.state.borrow.length > 0 &&
          <div style={{height: "300px", marginBottom: "10px"}} className="transaction-list">
            <b>Top 10 Borrows</b>
            <ListGroup style={{height: "100%", overflow: "scroll", marginTop: "10px"}}>
              {this.state.borrow.map((transaction, i, borrow) => (
                <ListGroup.Item key={"card-key-" + String(i)} style={{wordWrap: "break-word"}}>
                  <b>Event</b>: {transaction.event}
                  <br/>
                  <b>Timestamp</b>: {this.getHumanReadableDate(transaction.returnValues.timestamp)}
                  <br/>
                  <b>Amount</b>: {(transaction.returnValues._amount / 1e18).toFixed(3)} {tokenMapping[transaction.returnValues[0]]}
                  <br/>
                  <b>Transaction Hash</b>: <a href={"https://kovan.etherscan.io/tx/" + transaction.transactionHash}
                                              target="_blank">{transaction.transactionHash}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          }
          <br/>
          <br/>
          {this.state.flashLoans.length > 0 &&
          <div style={{height: "300px", marginBottom: "10px"}} className="transaction-list">
            <b>Top 10 Flash Loans</b>
            <ListGroup style={{height: "100%", overflow: "scroll", marginTop: "10px"}}>
              {this.state.flashLoans.map((transaction, i, flashLoans) => (
                <ListGroup.Item key={"card-key-" + String(i)} style={{wordWrap: "break-word"}}>
                  <b>Event</b>: {transaction.event}
                  <br/>
                  <b>Timestamp</b>: {this.getHumanReadableDate(transaction.returnValues.timestamp)}
                  <br/>
                  <b>Amount</b>: {(transaction.returnValues._amount / 1e18).toFixed(3)} {tokenMapping[transaction.returnValues[0]]}
                  <br/>
                  <b>Transaction Hash</b>: <a href={"https://kovan.etherscan.io/tx/" + transaction.transactionHash}
                                              target="_blank">{transaction.transactionHash}</a>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
          }

        </div>
      </div>
    );
  }

  async componentWillMount() {
    this.setState({inProgress: true});
    const all_transactions = await contract.getPastEvents({fromBlock: 0, toBlock: 'latest'});
    //console.log(all_transactions);
    let mapping = {};
    let users = [];
    let deposit = [];
    let borrow = [];
    let flashLoans = [];
    for (var i = 0; i < all_transactions.length; i++) {
      if (mapping[all_transactions[i].event]) {
        mapping[all_transactions[i].event] += 1
      } else {
        mapping[all_transactions[i].event] = 1
      }
      if(all_transactions[i].event === 'Deposit'){
        deposit.push(all_transactions[i]);
      }
      else if(all_transactions[i].event === 'Borrow'){
        borrow.push(all_transactions[i]);
      }
      else if(all_transactions[i].event === 'FlashLoan'){
        flashLoans.push(all_transactions[i]);
      }
      users.push(all_transactions[i].returnValues._user);
    }
    deposit = deposit.sort(function(first, second) {
      return second.returnValues._amount - first.returnValues._amount;
    }).slice(0, 10);
    borrow = borrow.sort(function(first, second) {
      return second.returnValues._amount - first.returnValues._amount;
    }).slice(0, 10);
    flashLoans = flashLoans.sort(function(first, second) {
      return second.returnValues._amount - first.returnValues._amount;
    }).slice(0, 10);
    users = [...new Set(users)];
    this.setState({
      stats: mapping,
      allTransactions: all_transactions.reverse(),
      users: users,
      deposit: deposit,
      borrow: borrow,
      flashLoans: flashLoans
    });
    this.setState({inProgress: false});
    //console.log(mapping);
    let reserves = await contract.methods.getReserves().call();
    let liquidity = [];
    for (var i = 0; i < reserves.length; i++) {
      liquidity.push(await contract.methods.getReserveData(reserves[i]).call());
      this.setState({
        liquidity: liquidity
      });
    }
    //console.log(reserves);
    //console.log(liquidity);
  }

  componentDidUpdate(prevProps, prevState) {
    //console.log(prevState, this.state);
  }

}
