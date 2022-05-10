import { useState } from "react";
import { Row, Col, ToggleButton } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";
import ERUpdater from "./exchangeRateUpdater";
import { ExchangeRate, Wallet } from "./utils/types";
import WalletCard from "./walletCard";

interface WalletsBodyProps {
    wallets: Wallet[];
    exchangeRates: ExchangeRate[];
    reFetchER: () => void;
}

function WalletsBody(props: WalletsBodyProps) {
    const [checked, setChecked] = useState(false);
    const euroData = props.exchangeRates?.find(exchangeRate => exchangeRate.currency == "EUR")
    const usdData = props.exchangeRates?.find(exchangeRate => exchangeRate.currency == "USD")
    return (
        <div>
            <Row>
                <Col lg="6">
                    {usdData ?
                        <ERUpdater currencyData={usdData} reFetchER={props.reFetchER} />
                        : null}
                </Col>
                <Col lg="6">
                    {euroData ?
                        <ERUpdater currencyData={euroData} reFetchER={props.reFetchER} />
                        : null}
                </Col>
            </Row>
            <hr className="rounded" />
            <Row className="cardRow">
                <Col lg="12" className="favCol">
                <ToggleButton
                    className="mb-2"
                    id="toggle-check"
                    type="checkbox"
                    variant="outline-warning"
                    checked={checked}
                    value="1"
                    style={{maxWidth:"300px"}}
                    onChange={() => setChecked(!checked)}
                >
                    Favourites <AiFillStar/>
                </ToggleButton>
                </Col>

                {props.wallets.map(wallet => {
                    return (
                            <WalletCard wallet={wallet} euroData={euroData || null} usdData={usdData || null} favCheck={checked}/>
                    )
                })}
            </Row>
        </div>
    )
}

export default WalletsBody