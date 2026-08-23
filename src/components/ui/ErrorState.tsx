interface ErrorStateProps {
    message? : string
}

export function ErrorState({message="Something went Wrong"}: ErrorStateProps){

    return(
        <div role="alert">
        <p>{message}</p>
        </div>
    )
}