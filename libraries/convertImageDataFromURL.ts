export const ConvertImageDataFromURL = (url: string) =>
  fetch(url)
    .then((response) => response.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(blob);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
