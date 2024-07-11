import { FC } from "react";
import Main from "./pages/Main";
import Header from "./components/Header";

const App: FC = () => {
	return (
		<>
			<Header />
			<Main />
		</>
	);
};

export default App;
