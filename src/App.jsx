import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import MarqueeText from "./components/MarqueeText";
import ImageSlider from "./components/ImageSlider";
import Syarat from "./components/Syarat";
import Alur from "./components/Alur";
import Pengumuman from "./components/Pengumuman";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import Sambutan from "./pages/Sambutan";
import Kandidat from "./pages/Kandidat";
import QuickCount from "./pages/QuickCount";
import Galeri from "./pages/Galeri";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        <Banner />
        <MarqueeText />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <ImageSlider />
                <main className="flex flex-col md:flex-row gap-6 px-8 py-6 ml-8 mr-12">
                  <div className="flex-1">
                    <Syarat />
                    <Alur />
                    <Timeline />
                  </div>
                  <Pengumuman />
                </main>
              </>
            }
          />
          <Route path="/sambutan" element={<Sambutan />} />
          <Route path="/kandidat" element={<Kandidat />} />
          <Route path="/quickcount" element={<QuickCount />} />
          <Route path="/galeri" element={<Galeri />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
