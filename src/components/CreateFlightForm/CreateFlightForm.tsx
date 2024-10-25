import { useEffect, useState } from "react";
import {
  createFlight,
  createFlightWithPhoto,
  editFlight,
  editFlightWithPhoto,
  getFlightById,
} from "../../api/endpoints";
import { toast } from "react-toastify";
import { Input } from "../global/Input/Input";
import ImageUpload from "../global/ImageUpload/ImageUpload";
import { Link, useParams } from "react-router-dom";
import { ICreateFlightFormProps } from "./createFlightForm.types";
import { ImagePreview } from "../global/ImagePreview/ImagePreview";
import cameraIcon from "../../assets/camera-icon.svg";

function CreateFlightForm({ isEdit }: ICreateFlightFormProps) {
  const id = useParams().id;

  const [inputFlightCode, setInputFlightCode] = useState("");
  const [inputFlightCapacity, setInputFlightCapacity] = useState("");
  const [inputFlightDepartureDate, setInputFlightDepartureDate] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<boolean>(false);
  const [savedImage, setSavedImage] = useState<string>("");
  const [codeExists, setCodeExists] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      getFlightById(id).then((flight) => {
        if (flight) {
          setInputFlightCode(flight.code);
          setInputFlightCapacity(flight.capacity.toString());
          setInputFlightDepartureDate(flight.departureDate);
          if (flight.img) {
            setSavedImage(flight.img);
          }
        }
      });
    }
  }, [isEdit, id]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit && id) {
      if (!selectedImage) {
        editFlight(id, {
          code: inputFlightCode,
          capacity: Number(inputFlightCapacity),
          departureDate: inputFlightDepartureDate,
        }).then((error) => {
          if (error === 102) {
            toast.error("Check your data again");
          }
        });
      } else {
        const formData = new FormData();

        formData.append("code", inputFlightCode);
        formData.append("capacity", inputFlightCapacity);
        formData.append("departureDate", inputFlightDepartureDate);
        formData.append("photo", selectedImage);
        editFlightWithPhoto(id, formData).then((error) => {
          if (error === 102) {
            toast.error("Check your data again");
          }
        });
      }
    } else if (!selectedImage) {
      createFlight({
        code: inputFlightCode,
        capacity: Number(inputFlightCapacity),
        departureDate: inputFlightDepartureDate,
      }).then((error) => {
        if (error === 106) {
          setCodeExists(true);
          toast.error("Flight code already exists");
        }
        if (error === 102) {
          toast.error("Check your data again");
        }
      });
    } else {
      const formData = new FormData();

      formData.append("code", inputFlightCode);
      formData.append("capacity", inputFlightCapacity);
      formData.append("departureDate", inputFlightDepartureDate);
      formData.append("photo", selectedImage);
      createFlightWithPhoto(formData).then((error) => {
        if (error === 106) {
          setCodeExists(true);
          toast.error("Flight code already exists");
        }
        if (error === 102) {
          toast.error("Check your data again");
        }
      });
    }
  };

  const handleChangeFlightCode = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (codeExists) setCodeExists(false);
    setInputFlightCode(event.target.value);
  };

  const handleChangeFlightCapacity = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputFlightCapacity(event.target.value);
  };

  const handleChangeFlightDepartureDate = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputFlightDepartureDate(event.target.value);
  };

  const handleImageSelect = (image: File | null) => {
    setSelectedImage(image);
    setSavedImage("");
  };

  return (
    <div>
      <Link to="/">
        <button>Back</button>
      </Link>
      <h1>Create Flight</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Flight Code: "
          required
          pattern="^[A-Za-z]{6}$"
          type="text"
          maxLength={6}
          value={inputFlightCode}
          onChange={handleChangeFlightCode}
          title="Flight Code should consist of 6 letters"
        />
        <br />
        <Input
          label="Flight Capacity: "
          required
          type="number"
          step={10}
          max={100}
          value={inputFlightCapacity}
          onChange={handleChangeFlightCapacity}
        />
        <br />
        <Input
          label="Flight Departure Date: "
          required
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={inputFlightDepartureDate}
          onChange={handleChangeFlightDepartureDate}
        />
        {isEdit && savedImage && (
          <div>
            {savedImage}
            <button type="button" onClick={() => setPreviewImage(true)}>
              <img src={cameraIcon} alt="camera" />
            </button>
            {previewImage && (
              <ImagePreview
                src={`http://localhost:3000/uploads/${savedImage}`}
                alt="preview"
                handleClose={() => setPreviewImage(false)}
              />
            )}
          </div>
        )}
        <ImageUpload onImageSelect={handleImageSelect} />
        <br />
        <button disabled={codeExists} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreateFlightForm;
