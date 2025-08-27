import { useEffect, useState } from "react";

// Function to extract dominant colors from an image
const extractColors = (imageUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size (smaller for performance)
        canvas.width = 50;
        canvas.height = 50;

        // Draw image to canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Collect colors
        const colors = [];
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          // Skip transparent pixels
          if (a > 128) {
            colors.push({ r, g, b });
          }
        }

        // Find dominant colors
        const dominantColors = findDominantColors(colors, 3);
        resolve(dominantColors);
      } catch (error) {
        reject(error);
      }
    };

    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    img.src = imageUrl;
  });
};

// Function to find dominant colors using k-means clustering
const findDominantColors = (colors, k = 3) => {
  if (colors.length === 0) return [];

  // Initialize centroids randomly
  let centroids = [];
  for (let i = 0; i < k; i++) {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    centroids.push({ ...randomColor });
  }

  // K-means clustering
  for (let iteration = 0; iteration < 10; iteration++) {
    const clusters = Array.from({ length: k }, () => []);

    // Assign colors to nearest centroid
    colors.forEach((color) => {
      let minDistance = Infinity;
      let nearestCentroid = 0;

      centroids.forEach((centroid, index) => {
        const distance = colorDistance(color, centroid);
        if (distance < minDistance) {
          minDistance = distance;
          nearestCentroid = index;
        }
      });

      clusters[nearestCentroid].push(color);
    });

    // Update centroids
    centroids = clusters.map((cluster) => {
      if (cluster.length === 0) {
        return { r: 0, g: 0, b: 0 };
      }

      const avgR = cluster.reduce((sum, c) => sum + c.r, 0) / cluster.length;
      const avgG = cluster.reduce((sum, c) => sum + c.g, 0) / cluster.length;
      const avgB = cluster.reduce((sum, c) => sum + c.b, 0) / cluster.length;

      return { r: Math.round(avgR), g: Math.round(avgG), b: Math.round(avgB) };
    });
  }

  // Sort by cluster size (dominance)
  const clusters = Array.from({ length: k }, () => []);
  colors.forEach((color) => {
    let minDistance = Infinity;
    let nearestCentroid = 0;

    centroids.forEach((centroid, index) => {
      const distance = colorDistance(color, centroid);
      if (distance < minDistance) {
        minDistance = distance;
        nearestCentroid = index;
      }
    });

    clusters[nearestCentroid].push(color);
  });

  // Return sorted dominant colors
  return centroids
    .map((centroid, index) => ({
      ...centroid,
      count: clusters[index].length,
      hex: rgbToHex(centroid.r, centroid.g, centroid.b),
    }))
    .sort((a, b) => b.count - a.count);
};

// Calculate color distance
const colorDistance = (color1, color2) => {
  const dr = color1.r - color2.r;
  const dg = color1.g - color2.g;
  const db = color1.b - color2.b;
  return dr * dr + dg * dg + db * db;
};

// Convert RGB to hex
const rgbToHex = (r, g, b) => {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
  );
};

// Generate theme colors from dominant colors
const generateTheme = (dominantColors) => {
  if (!dominantColors || dominantColors.length === 0) {
    return {
      primary: "#7ead71",
      secondary: "#111826",
      accent: "#fcd068",
      background: "rgba(11, 15, 23, 0.95)",
      surface: "rgba(17, 24, 38, 0.9)",
      text: "#e6eaf2",
      muted: "#a7b0c0",
    };
  }

  const primary = dominantColors[0];
  const secondary = dominantColors[1] || dominantColors[0];

  // Calculate complementary colors
  const primaryHSL = rgbToHsl(primary.r, primary.g, primary.b);
  const secondaryHSL = rgbToHsl(secondary.r, secondary.g, secondary.b);

  // Generate theme colors
  return {
    primary: primary.hex,
    secondary: secondary.hex,
    accent: generateAccentColor(primaryHSL),
    background: `rgba(${primary.r}, ${primary.g}, ${primary.b}, 0.95)`,
    surface: `rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 0.9)`,
    text: isLightColor(primary.r, primary.g, primary.b) ? "#0b0f17" : "#e6eaf2",
    muted: isLightColor(primary.r, primary.g, primary.b)
      ? "#4a5568"
      : "#a7b0c0",
  };
};

// Convert RGB to HSL
const rgbToHsl = (r, g, b) => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s: s * 100, l: l * 100 };
};

// Generate accent color
const generateAccentColor = (hsl) => {
  const accentHue = (hsl.h + 180) % 360; // Complementary hue
  return `hsl(${accentHue}, 70%, 60%)`;
};

// Check if color is light
const isLightColor = (r, g, b) => {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
};

// Custom hook to extract and manage image colors
export const useImageColors = (imageUrl) => {
  const [theme, setTheme] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imageUrl) {
      setTheme(null);
      return;
    }

    setLoading(true);
    setError(null);

    extractColors(imageUrl)
      .then((dominantColors) => {
        const generatedTheme = generateTheme(dominantColors);
        setTheme(generatedTheme);
      })
      .catch((err) => {
        console.error("Failed to extract colors:", err);
        setError(err.message);
        // Fallback to default theme
        setTheme(generateTheme([]));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [imageUrl]);

  return { theme, loading, error };
};
