'use-client';
import ClipLoader from "react-spinners/ClipLoader";

const ovveride = {
	display: 'block',
	margin: '100px auto',
}

const Spinner = () => {
	return (
		<ClipLoader
			color="#3b82f6"
			cssOverride={ovveride}
			size={150}
			aria-label="Loader Spinner"
		/>
	)
}

export default Spinner