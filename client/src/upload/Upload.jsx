import { useRef } from "react";
import { IKContext, IKUpload } from "imagekitio-react";

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const authenticator = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/upload");

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

const Upload = ({ setImg }) => {
  const ikUploadRef = useRef(null);

  const onUploadStart = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setImg((prev) => ({
        ...prev,
        isLoading: true,
        aiData: {
          inlineData: {
            data: reader.result.split(",")[1],
            mimeType: file.type,
          },
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const onUploadProgress = (progress) => {
    console.log("Progress: ", progress);
  };

  const onError = (err) => {
    console.log("Error: ", err);
  };

  const onSuccess = (res) => {
    console.log("Success: ", res);
    setImg((prev) => ({ ...prev, isLoading: false, dbData: res }));
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        fileName="test-upload.png"
        ref={ikUploadRef}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        style={{ display: "none" }}
      />

      <label onClick={() => ikUploadRef.current.click()}>
        <img src="/attachment.png" alt="" />
      </label>
    </IKContext>
  );
};

export default Upload;
