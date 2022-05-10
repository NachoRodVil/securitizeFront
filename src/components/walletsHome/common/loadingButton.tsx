import Button from 'react-bootstrap/Button'

interface LoadingButtonProps {
    handleClick: () => Promise<void>,
    loading: boolean
}

function LoadingButton(props: LoadingButtonProps) {


    return (
        <>
            <Button
                variant="primary"
                disabled={props.loading}
                onClick={!props.loading ? props.handleClick : undefined}
                size="lg"
                className="submitButton"
            >
                {props.loading ? 'Loading…' : 'Submit'}
            </Button>

        </>
    )

}

export default LoadingButton