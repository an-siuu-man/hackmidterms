export default function PageButton(props) {

    const getButtonType = () => {
        return props.type === 'primary' ? 'border-[#1E90FF] hover:bg-[#1E90FF] hover:text-white ' : 'border-[#FF6b6b] hover:bg-[#FF6b6b] hover:text-white';
    };
    return (
        <button className={`${getButtonType()} font-[Poppins] font-[600] min-w-[200px] max-w-[250px] border-[3px] p-[10px] rounded-[7px] text-[22px] transition duration-[200ms]`} onClick={props.handleClick}>
            {props.text}
        </button>
    );
}