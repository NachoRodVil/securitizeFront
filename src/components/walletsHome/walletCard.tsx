import { ExchangeRate, Wallet } from "./utils/types";
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { FaEdit } from 'react-icons/fa';
import { GiCancel } from 'react-icons/gi';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import LoadingButton from "./common/loadingButton";
import { updateWalletEth, updateWalletFav } from "./utils/utils";

interface WalletCardProps {
    wallet: Wallet;
    euroData: ExchangeRate | null;
    usdData: ExchangeRate | null;
    favCheck: boolean
}

function WalletCard(props: WalletCardProps) {
    const [old, setOld] = useState<boolean>(false)
    const [currency, setCurrency] = useState<"usd" | "euro">("usd")
    const [edit, setEdit] = useState<boolean>(false)
    const [value, setValue] = useState<string>(props.wallet.eth.toString() || "0")
    const [loading, setLoading] = useState<boolean>(false)
    const [fav, setFav] = useState<boolean>(props.wallet.isFav)
    const display = props.favCheck ? fav ? true : false : true

    const checkIfOld = (walletAge: string): boolean => {
        const date = new Date()
        date.setFullYear(date.getFullYear() - 1)
        return new Date(walletAge) < date
    }

    const handleEditSubmit = async () => {
        setLoading(true)
        await updateWalletEth(props.wallet.id, Number(value))
        props.wallet.eth = Number(value)
        setLoading(false)
        setEdit(false)
    }

    const handleFav = () => {
        updateWalletFav(props.wallet.id)
        setFav(!fav)
    }

    useEffect(() => {
        setOld(checkIfOld(props.wallet.createdAt))
    }, [])
    if (display) {
        return (
            <Col lg="6">
                <Card className="cardContainer">
                    <Card.Body>
                        <Row className="cardTitleRow">
                            <Col lg="7">
                                <p className="cardTitle">{props.wallet.owner.toUpperCase()}'S WALLET</p>
                            </Col>
                            <Col lg="3">
                                <Badge className={`cardBadge ${old ? "old" : "new"}`}>{old ? "OLD" : "NEW"}</Badge>
                            </Col>
                            <Col lg="1">
                                {!edit ?
                                    <button className="iconButton"><FaEdit onClick={() => setEdit(true)} /></button>
                                    :
                                    <button className="iconButton cancel"><GiCancel onClick={() => setEdit(false)} /></button>
                                }
                            </Col>
                            <Col lg="1">
                                {!fav ?
                                    <button className="iconButtonStar"><AiOutlineStar onClick={handleFav} /></button>
                                    :
                                    <button className="iconButtonStar"><AiFillStar onClick={handleFav} /></button>
                                }
                            </Col>
                        </Row>
                        <Row className="cardBodyRow">
                            <Col lg="4">
                                {!edit ?
                                    <p className="cardBody">ETH {props.wallet.eth}</p>
                                    :
                                    <><p className="cardBody">ETH
                                        <input
                                            className=""
                                            type="number"
                                            value={value}
                                            onChange={(e) => setValue(e.target.value)}
                                            disabled={loading}
                                        />
                                    </p>
                                        <LoadingButton handleClick={handleEditSubmit} loading={loading} />
                                    </>
                                }
                            </Col>
                            <Col lg="1">
                                <p className="cardBody">=</p>
                            </Col>
                            <Col lg="5">
                                <p className="cardBody">{currency == "usd" ? `USD ${(props.wallet.eth * (props.usdData?.value || 1)).toFixed(2)}` : `EUR ${(props.wallet.eth * (props.euroData?.value || 1)).toFixed(2)}`}</p>
                            </Col>
                            <Col lg="2">
                                <BootstrapSwitchButton
                                    checked={currency == "usd" ? true : false}
                                    onlabel='USD'
                                    offlabel='EUR'
                                    onChange={(checked: boolean) => {
                                        setCurrency(checked ? "usd" : "euro")
                                    }}
                                />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

        )
    } else {
        return (<></>)
    }

}

export default WalletCard