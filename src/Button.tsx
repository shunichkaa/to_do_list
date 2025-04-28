type PropsBtn = {
    title: string
    onClick?: () => void
}

export const Button = ({title}: PropsBtn) => {
    return <button>{title}</button>
}