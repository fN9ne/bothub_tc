import { FC } from "react";
import Main from "./pages/Main/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: FC = () => {
	return (
		<>
			<Header />
			<Main />
			<Footer />
		</>
	);
};

export default App;
