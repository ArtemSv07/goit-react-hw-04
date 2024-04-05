import SearchBar from "../SearchBar/SearchBar";
import { getPictures } from "../../unsplash-api";
import ImageGallery from "../ImageGallery/ImageGallery";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

const App = () => {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [modalData, setModalData] = useState({});

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal(data) {
    setModalData(data);

    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setModalData({});
  }

  const nextPage = () => {
    setLoader(true);
    setPage(page + 1);
  };

  const queryValue = (value) => {
    setImages([]);
    setLoader(true);
    setInputValue(value);
  };

  useEffect(() => {
    const handleSearch = async () => {
      if (inputValue === "") return;
      try {
        const data = await getPictures(inputValue, page);
        setImages((event) => {
          return event.length > 0 ? [...event, ...data] : data;
        });
      } catch (error) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    handleSearch();
  }, [inputValue, page]);

  return (
    <div>
      <SearchBar onSearch={queryValue} />

      {error ? (
        <ErrorMessage />
      ) : (
        <ImageGallery openModal={openModal} imageData={images} />
      )}
      <Loader loader={loader} />
      {images.length !== 0 && <LoadMoreBtn nextPage={nextPage} />}
      {modalIsOpen && (
        <ImageModal
          closeModal={closeModal}
          data={modalData}
          modalIsOpen={modalIsOpen}
        />
      )}
    </div>
  );
};
export default App;
