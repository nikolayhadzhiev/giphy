const uploaded = JSON.parse(localStorage.getItem('uploaded')) || [];

export const addUploaded = (gifId) => {
  if (gifId) {
    uploaded.push(gifId);
    localStorage.setItem('uploaded', JSON.stringify(uploaded));
  }
};

export const getUploaded = () => [...uploaded];
