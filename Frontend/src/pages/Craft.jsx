import React from "react";

const Craft = () => {
  const images = Array.from({ length: 20 }, (_, i) => `/images/image${i + 1}.jpg`);

  return (
    <div style={{ 
      paddingTop: "80px", 
      display: "grid", 
      gridTemplateColumns: "repeat(5, 1fr)", 
      gap: "10px",
      justifyItems: "center",
    }}>
      {images.map((src, index) => (
        <img 
          key={index} 
          src={src} 
          alt={`Image ${index + 1}`} 
          style={{
            width: "250px",  
            height: "250px",
            objectFit: "cover", 
            borderRadius: "10px", 
          }} 
        />
      ))}
    </div>
  );
};

export default Craft;
