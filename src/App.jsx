import { ThemeProvider, CryptoProvider } from "@/adapters/context/index.js";
import { MainLayout } from "@/presentation/layout/MainLayout.jsx";
import { Home } from "./presentation/views/Home.jsx";
import { Charts } from "./presentation/views/Charts.jsx";
import { About } from "./presentation/views/About.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<ThemeProvider>
				<CryptoProvider>
					<MainLayout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/charts" element={<Charts />} />
							<Route path="/about" element={<About />} />
							<Route path="*" element={<Navigate to="/" replace />} />
						</Routes>
					</MainLayout>
				</CryptoProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
