import React, { useState, useRef } from 'react';
import generateOGImage from './generateOGImage';
import './Post.css';

const Post = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState('');
  const postRef = useRef();

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleGenerateImage = async () => {
    const dataUrl = await generateOGImage(postRef.current);
    if (dataUrl) {
      setOgImageUrl(dataUrl);
    }
  };

  const handleDownloadImage = () => {
    if (ogImageUrl) {
      const link = document.createElement('a');
      link.href = ogImageUrl;
      link.download = 'og-image.png';
      link.click();
    }
  };

  return (
    <div>
      <h1>Create Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <input type="file" onChange={handleImageUpload} />
      <div ref={postRef} className="post">
        <h2>{title}</h2>
        <p>{content}</p>
        {image && <img src={image} alt="Uploaded" />}
        <div className="branding">MyBrand</div>
      </div>
      <button onClick={handleGenerateImage}>Generate OG Image</button>

      {ogImageUrl && (
        <div className="preview">
          <h3>Preview of OG Image:</h3>
          <img src={ogImageUrl} alt="OG Preview" />
          <button onClick={handleDownloadImage}>Download OG Image</button>
        </div>
      )}
    </div>
  );
};

export default Post;
