import { toPng } from 'html-to-image';

const generateOGImage = async (element) => {
  try {
    const dataUrl = await toPng(element);
    return dataUrl;
  } catch (error) {
    console.error('Could not generate image', error);
    return null;
  }
};

export default generateOGImage;
