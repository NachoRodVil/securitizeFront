import { useState } from "react";
import { ExchangeRate } from "./utils/types";
import Button from 'react-bootstrap/Button'
import { updateER } from "./utils/utils";
import LoadingButton from "./common/loadingButton";

interface ERUpdaterProps {
    currencyData: ExchangeRate;
    reFetchER: () => void
}

function ERUpdater(props: ERUpdaterProps) {
    const [value, setValue] = useState<string>(props.currencyData.value.toString() || "0")
    const [loading, setLoading] = useState<boolean>(false)

    const handleClick = async () => {
        setLoading(true)
        await updateER(props.currencyData.id, Number(value))
        setLoading(false)
        props.reFetchER()
    }

    return (
        <div>
            <label>{props.currencyData?.currency}:
                <input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    disabled={loading}
                />
            </label>
            <LoadingButton handleClick={handleClick} loading={loading} />
        </div>
    )
}

export default ERUpdater